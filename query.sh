#!/usr/bin/env bash
for i in $(seq 1 10); do
  curl -i\
   -X POST\
    -H "Content-Type: application/json"\
    --data "{\"message\":\"msg${i}\"}"\
     http://localhost:3000/facade
done
