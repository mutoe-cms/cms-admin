#!/bin/bash

set -e

swaggerUrl=http://localhost:8080/docs-json

yarn sta -p $swaggerUrl -o src/services -n api.ts --axios --module-name-first-tag
