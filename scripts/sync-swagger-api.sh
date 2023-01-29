#!/bin/bash

set -e

swaggerUrl=http://localhost:8080/docs-json

pnpm sta -p $swaggerUrl -o src/services -n api.ts --axios --module-name-first-tag
