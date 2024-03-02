## Authentication

| method | endpoint             | headers | body  | params | query | status | Headers | body    | description                    |
| ------ | -------------------- | ------- | ----- | ------ | ----- | ------ | ------- | ------- | ------------------------------ |
| POST   | `/auth/signup`       | token   | {...} | -      | -     | 201    | -       | {...}   | Sign up for a new account      |
| POST   | `/auth/login`        | -       | -     | -      | -     | 200    | -       | [{...}] | Login with an existing account |
| GET    | `/auth/github`       | -       | -     | -      | -     | 302    | -       | -       | Redirect to github sign in     |
| POST   | `/auth/github`       | -       | {...} | -      | -     | 200    | -       | -       | Sign in with github            |
| GET    | `/auth/google`       | -       | -     | -      | -     | 302    | -       | -       | Redirect to google sign in     |
| POST   | `/auth/google`       | -       | {...} | -      | -     | 200    | -       | -       | sign in with google            |
| POST   | `/auth/captcha`      | -       | {...} | -      | -     | 200    | -       | {...}   | Verify google captcha          |
| POST   | `/auth/verify/email` | -       | {...} | -      | -     | 200    | -       | {...}   | Verify user email              |
| POST   | `/auth/verify/token` | token   | -     | -      | -     | 200    | -       | {...}   | Verify user keeps logged in    |

---

<br />

## User

| method | endpoint        | headers | body | params | query | status | Headers | body  | description             |
| ------ | --------------- | ------- | ---- | ------ | ----- | ------ | ------- | ----- | ----------------------- |
| GET    | `/user/profile` | token   | -    | -      | -     | 201    | -       | {...} | Get user information    |
| PUT    | `/user/profile` | token   | -    | -      | -     | 200    | -       | {...} | Update user information |

---

<br />

## Tutorials

| method | endpoint               | headers | body  | params | query | status | Headers | body    | description                   |
| ------ | ---------------------- | ------- | ----- | ------ | ----- | ------ | ------- | ------- | ----------------------------- |
| GET    | `/tutorials`           | -       | -     | -      | -     | 200    | -       | [{...}] | Get all tutorials             |
| POST   | `/tutorials`           | token   | {...} | -      | -     | 201    | -       | {...}   | Create a new tutorial         |
| GET    | `/tutorials/:slug`     | -       | -     | `slug` | -     | 200    | -       | {...}   | get a tutorial by slug        |
| PUT    | `/tutorials/:slug`     | token   | {...} | `slug` | -     | 200    | -       | {...}   | update a tutorial by slug     |
| DELETE | `/tutorials/:slug`     | token   | -     | `slug` | -     | 201    | -       | -       | delete a tutorial by slug     |
| GET    | `/tutorials/tags`      | -       | -     | -      | -     | 200    | -       | [{...}] | get all tutorials unique tags |
| GET    | `/tutorials/tags/:tag` | -       | -     | `tag`  | -     | 200    | -       | [{...}] | get unique tags based on tag  |

---

<br />
