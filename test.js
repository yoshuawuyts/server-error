const noop = require('noop2')
const test = require('tape')
const bole = require('bole')

const serverError = require('./')

const log = bole('test')
bole.output({ level: 'error', stream: process.stdout })

test('server-error', function (t) {
  t.test('create new error instance', function (t) {
    t.plan(2)
    t.throws(serverError.bind(null), /function/, 'throws')
    t.throws(serverError.bind(null, noop, 123), /object/, 'throws')
  })

  t.test('serverError', function (t) {
    t.plan(1)
    const error = serverError(log)
    const msg = 'something went wrong'
    const err = error.server(msg)
    t.deepEqual(err, {
      type: 'server',
      message: 'something went wrong',
      docs: null,
      statusCode: 500,
      name: 'ServerError',
      fullType: 'server'
    })
  })

  t.test('clientError', function (t) {
    t.plan(1)
    const error = serverError(log)
    const msg = {
      message: 'something went wrong',
      docs: 'http://api.foo.io'
    }
    const err = error.client(msg)
    t.deepEqual(err, {
      type: 'client',
      message: 'something went wrong',
      docs: 'http://api.foo.io',
      statusCode: 400,
      name: 'ClientError',
      fullType: 'client'
    })
  })

  t.test('wrappedError', function (t) {
    t.plan(2)
    const error = serverError(log)
    const msg = new Error('something went wrong')
    const err = error.wrap(msg)
    t.equal(err.message, 'Internal server error', 'correct message')
    t.deepEqual(err, {
      type: 'server',
      statusCode: 500,
      name: 'ServerError',
      fullType: 'server'
    })
  })
})
