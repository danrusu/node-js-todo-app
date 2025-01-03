#!/usr/bin/env bash

npm run test:set:data

npm start & # start server in background

npm run wait-for-server

npm run test:api:postman

npm run kill-server