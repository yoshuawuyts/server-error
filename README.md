# server-error [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Create an error and send it to a logger.

## Usage
```js
const serverError = require('server-error')
const bole = require('bole')

const log = bole('my-package')
const error = serverError(log)

error.client('oh no!')
// {
//   type: 'client',
//   statusCode: 400,
//   message: 'oh no!',
//   url: null
// }

error.client({ message: 'not found', statusCode: 404 })
// {
//   type: 'client',
//   statusCode: 404,
//   message: 'not found',
//   url: null
// }

error.server({ message: 'something went wrong', url: 'http://api.foo.io' })
// {
//   type: 'server',
//   statusCode: 500,
//   message: 'something went wrong',
//   url: 'http://api.foo.io'
// }

error.wrap(new Error('something critical went wrong'))
// {
//   type: 'server',
//   statusCode: 500,
//   message: 'Internal Server Error'
// }
```

## API
### error = serverError(log, opts?)
Create a new error object that logs to a logger.

### error.client(message)
Create a new client error that defaults to statusCode 400. Takes either a
string or object. Uses `log.warn`.

### error.server(message)
Create a new server error that defaults to statusCode 500. Takes either a
string or object. Uses `log.error`.

### error.wrap(error)
Wrap an existing error into an error that can be returned to the client. Useful
to handle unexpected state without leaking information to the outside world.
Uses statusCode 500 and `log.error`.

## Installation
```sh
$ npm install server-error
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/server-error.svg?style=flat-square
[3]: https://npmjs.org/package/server-error
[4]: https://img.shields.io/travis/yoshuawuyts/server-error/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/server-error
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/server-error/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/server-error
[8]: http://img.shields.io/npm/dm/server-error.svg?style=flat-square
[9]: https://npmjs.org/package/server-error
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
