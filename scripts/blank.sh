#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

docker-compose up -d lemons.db
cat $DIR/schema/shop.sql | docker exec -i lemons.db mysql -u root -pbranch