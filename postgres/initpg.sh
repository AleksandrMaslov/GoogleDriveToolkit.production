#!/bin/bash
set -e

echo "user: $POSTGRES_USER"
echo "password: $POSTGRES_PASSWORD"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE "$POSTGRES_DB";
EOSQL
