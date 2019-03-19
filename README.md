# sllingersys - web server

## To do...

* [x] Login and signup
* [x] Deployment
* [ ] DB on server
* [ ] Token validation
* [ ] Protected routes
* [ ] Login only with token
* [ ] Trello

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

**CRYPT_ROUNDS**: Variable for bcrypt

**TOKEN_SECRET_KEY**: JWT secret sign key

**TOKEN_EXPIRES**: JWT expiration time