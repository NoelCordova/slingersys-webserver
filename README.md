# sllingersys - web server

## To do...

Link to Trello...

## Response structure

### Success

* ok: Prop for error
* code: Response code
* message: Response message
* data: Response content

```
{
  ok: true,
  code: 200,
  message: "Success",
  data: [] || {}
}
```

### Error

* ok: Prop for error
* code: Response code
* message: Error description

```
{
  ok: false,
  code: 400,
  message: "Error"
}
```

## .env file structure

**DB_NAME**: Name of the local database

**DB_USERS**: Name of the collection of users

**DB_CONFIG**: Name of the collection of configuration

**CRYPT_ROUNDS**: Variable for bcrypt

**TOKEN_SECRET_KEY**: JWT secret sign key

**TOKEN_EXPIRES**: JWT expiration time

**ROLE_USER**: Value for user role in DB

**ROLE_ADMIN**: Value for admin role in DB