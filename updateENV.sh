#!/usr/bin/env bash

echo "Exporting ENV variables..."

IFS='
'
export $(egrep -v '^#' .env | xargs -0)
IFS=
