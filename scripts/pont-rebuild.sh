#!/bin/bash

set -e

rm -rf src/services/api-lock.json
node ./node_modules/.bin/pont
node ./node_modules/.bin/eslint 'src/services/**/*.ts?(x)' --fix
