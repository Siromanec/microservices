#!/usr/bin/env bash
function scale_logging() {
    N=$1
    BASE_PORT=$2


    LOGGING_SERVICE_PORTS=""

    for i in $(seq $N); do
#      echo "Creating logging service..."
      export LOGGING_USE_HAZELCAST=1
      export LOGGING_SERVICE_PORT="$((BASE_PORT + i - 1))"
      LOGGING_SERVICE_PORTS+="$LOGGING_SERVICE_PORT "
      docker compose up        \
        --scale logging="$i"   \
        --scale hazelcast="$i" \
        --scale management-center=0 \
        --scale facade=0 \
        --scale messages=0 \
        --detach --no-recreate
    done;

    echo "$LOGGING_SERVICE_PORTS"
}
function scale_messages() {
    N=$1
    BASE_PORT=$2
    NLOGGERS=$3


    MESSAGES_SERVICE_PORTS=""

    for i in $(seq $N); do
#      echo "Creating messages service..."
      export MESSAGES_SERVICE_PORT="$((BASE_PORT + i - 1))"
      MESSAGES_SERVICE_PORTS+="$MESSAGES_SERVICE_PORT "
      docker compose up        \
        --scale logging="$NLOGGERS"   \
        --scale hazelcast="$NLOGGERS" \
        --scale management-center=0 \
        --scale facade=0 \
        --scale messages="$i" \
        --detach --no-recreate
    done;

    echo "$MESSAGES_SERVICE_PORTS"
}
docker compose build
NLOGGERS=3
NMESSAGES=2
LOGGING_SERVICE_PORTS="$(scale_logging $NLOGGERS "8080")"
MESSAGES_SERVICE_PORTS="$(scale_messages $NMESSAGES "8000" $NLOGGERS)"
#echo
export LOGGING_SERVICE_PORTS
export MESSAGES_SERVICE_PORTS
docker compose up        \
  --scale logging="$NLOGGERS"   \
  --scale hazelcast="$NLOGGERS" \
  --scale messages="$NMESSAGES" \
  --scale facade=1 \
  --detach --no-recreate

echo "'docker compose stop' to stop"




