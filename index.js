const typedError = require('error/typed')
const assert = require('assert')

const clientError = typedError({
  type: 'client',
  message: 'client error',
  docs: null,
  statusCode: 400
})

const serverError = typedError({
  type: 'server',
  message: 'server error',
  docs: null,
  statusCode: 500
})

module.exports = createBoleError

// Create an error and log to bole
// null -> null
function createBoleError (log, opts) {
  opts = opts || {}

  assert.equal(typeof log, 'function', 'log should be a function')
  assert.equal(typeof opts, 'object', 'opts should be an object')

  return {
    client: createClientError,
    server: createServerError,
    wrap: wrapError
  }

  function createClientError (vals) {
    const err = (typeof vals === 'string')
      ? clientError({ message: vals })
      : clientError(vals)
    log.warn(err.message)
    return err
  }

  function createServerError (vals) {
    const err = (typeof vals === 'string')
      ? serverError({ message: vals })
      : serverError(vals)
    log.error(err)
    return err
  }

  function wrapError (err) {
    log.error(err)
    const msg = 'Internal server error'
    const error = new Error(msg)
    error.type = 'server'
    error.statusCode = 500
    error.fullType = 'server'
    error.message = msg
    error.name = 'ServerError'
    return error
  }
}
