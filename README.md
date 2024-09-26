## 1. Installation

```bash

# Install the dependencies
$ npm install

# startup database
$ docker compose up -d

# Push the schema database
$ npx prisma db push

# Generate type schema
$ npx prisma db generate

```

## 2. Configure Environment Variables

Create a .env file in the root directory of the project and add the necessary environment variables

In your .env file, set the jwtSecretKey parameter. You can generate a secure value for jwtToken using the following command:

```bash
openssl rand -base64 32
```

This command will generate a random base64-encoded string that you can use as your secret key. Make sure to copy and paste this generated string into your .env file.

set the PORT parameter

```bash
PORT=3456
```

set the DATABASE_URL parameter

```bash
DATABASE_URL="postgresql://{username}:{password}@localhost:5432/{database_name}?schema=public" 
##  DEFAULT: "postgresql://thanapat:admin@localhost:5432/boardDB?schema=public"
```

## 3.Run Application 

```bash
$ npm start
## OR
$ npm start:dev

```