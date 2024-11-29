#!/bin/bash
export PGPASSWORD="qwerty"
psql -U leni -d app -f create.sql


unset PGPASSWORD