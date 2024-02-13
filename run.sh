#!/usr/bin/env bash
function scale_logging() {
    N=$1
    BASE_PORT=$2


    LOGGING_SERVICE_PORTS=""
    export LOGGING_SERVICE_PORT="$BASE_PORT"

    for i in $(seq $N); do
#      echo "Creating logging service..."
      export LOGGING_USE_HAZELCAST=1

      LOGGING_SERVICE_PORTS+="$LOGGING_SERVICE_PORT "
      docker compose up        \
        --scale logging="$i"   \
        --scale hazelcast="$i" \
        --scale management-center=0 \
        --scale facade=0 \
        --scale messages=0 \
        --detach --no-recreate

      export LOGGING_SERVICE_PORT="$((BASE_PORT + i))"

    done;

    echo "$LOGGING_SERVICE_PORTS"
}
docker compose build
NLOGGERS=3
export LOGGING_SERVICE_PORTS=$(scale_logging $NLOGGERS "6666")
docker compose up        \
  --scale logging="$NLOGGERS"   \
  --scale hazelcast="$NLOGGERS" \
  --scale management-center=1 \
  --scale facade=1 \
  --scale messages=1 \
  --detach --no-recreate
echo "press Enter to stop"
read -r
docker compose stop




