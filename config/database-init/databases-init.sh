#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo "Creating user and database '$database'..."
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER "$database";
	    CREATE DATABASE "$database";
	    GRANT ALL PRIVILEGES ON DATABASE "$database" TO "$database";
EOSQL
}

# Initialize IAM database
if [ -n "$DATABASE_IAM" ]; then
  create_user_and_database "$DATABASE_IAM"
	echo "IAM database created."
fi

# Initialize order database
if [ -n "$DATABASE_ORDER" ]; then
  create_user_and_database "$DATABASE_ORDER"
fi

# Initialize delivery database
if [ -n "$DATABASE_DELIVERY" ]; then
  create_user_and_database "$DATABASE_DELIVERY"
fi

echo "Done."
