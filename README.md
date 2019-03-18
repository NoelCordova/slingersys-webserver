# sllingersys - web server

## To do...

* [x] Login and signup
* [x] Deployment
* [ ] DB on server
* [ ] Token validation
* [ ] Protected routes
* [ ] ???

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