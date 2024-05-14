;(() => {
  'use strict'
  var e = {
    448: function (e, t, o) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      const n = o(361)
      const s = r(o(753))
      const i = r(o(457))
      const c = s.default('agent-base')
      function isAgent(e) {
        return Boolean(e) && typeof e.addRequest === 'function'
      }
      function isSecureEndpoint() {
        const { stack: e } = new Error()
        if (typeof e !== 'string') return false
        return e
          .split('\n')
          .some(
            (e) =>
              e.indexOf('(https.js:') !== -1 || e.indexOf('node:https:') !== -1
          )
      }
      function createAgent(e, t) {
        return new createAgent.Agent(e, t)
      }
      ;(function (e) {
        class Agent extends n.EventEmitter {
          constructor(e, t) {
            super()
            let o = t
            if (typeof e === 'function') {
              this.callback = e
            } else if (e) {
              o = e
            }
            this.timeout = null
            if (o && typeof o.timeout === 'number') {
              this.timeout = o.timeout
            }
            this.maxFreeSockets = 1
            this.maxSockets = 1
            this.maxTotalSockets = Infinity
            this.sockets = {}
            this.freeSockets = {}
            this.requests = {}
            this.options = {}
          }
          get defaultPort() {
            if (typeof this.explicitDefaultPort === 'number') {
              return this.explicitDefaultPort
            }
            return isSecureEndpoint() ? 443 : 80
          }
          set defaultPort(e) {
            this.explicitDefaultPort = e
          }
          get protocol() {
            if (typeof this.explicitProtocol === 'string') {
              return this.explicitProtocol
            }
            return isSecureEndpoint() ? 'https:' : 'http:'
          }
          set protocol(e) {
            this.explicitProtocol = e
          }
          callback(e, t, o) {
            throw new Error(
              '"agent-base" has no default implementation, you must subclass and override `callback()`'
            )
          }
          addRequest(e, t) {
            const o = Object.assign({}, t)
            if (typeof o.secureEndpoint !== 'boolean') {
              o.secureEndpoint = isSecureEndpoint()
            }
            if (o.host == null) {
              o.host = 'localhost'
            }
            if (o.port == null) {
              o.port = o.secureEndpoint ? 443 : 80
            }
            if (o.protocol == null) {
              o.protocol = o.secureEndpoint ? 'https:' : 'http:'
            }
            if (o.host && o.path) {
              delete o.path
            }
            delete o.agent
            delete o.hostname
            delete o._defaultAgent
            delete o.defaultPort
            delete o.createConnection
            e._last = true
            e.shouldKeepAlive = false
            let r = false
            let n = null
            const s = o.timeout || this.timeout
            const onerror = (t) => {
              if (e._hadError) return
              e.emit('error', t)
              e._hadError = true
            }
            const ontimeout = () => {
              n = null
              r = true
              const e = new Error(
                `A "socket" was not created for HTTP request before ${s}ms`
              )
              e.code = 'ETIMEOUT'
              onerror(e)
            }
            const callbackError = (e) => {
              if (r) return
              if (n !== null) {
                clearTimeout(n)
                n = null
              }
              onerror(e)
            }
            const onsocket = (t) => {
              if (r) return
              if (n != null) {
                clearTimeout(n)
                n = null
              }
              if (isAgent(t)) {
                c(
                  'Callback returned another Agent instance %o',
                  t.constructor.name
                )
                t.addRequest(e, o)
                return
              }
              if (t) {
                t.once('free', () => {
                  this.freeSocket(t, o)
                })
                e.onSocket(t)
                return
              }
              const s = new Error(
                `no Duplex stream was returned to agent-base for \`${e.method} ${e.path}\``
              )
              onerror(s)
            }
            if (typeof this.callback !== 'function') {
              onerror(new Error('`callback` is not defined'))
              return
            }
            if (!this.promisifiedCallback) {
              if (this.callback.length >= 3) {
                c('Converting legacy callback function to promise')
                this.promisifiedCallback = i.default(this.callback)
              } else {
                this.promisifiedCallback = this.callback
              }
            }
            if (typeof s === 'number' && s > 0) {
              n = setTimeout(ontimeout, s)
            }
            if ('port' in o && typeof o.port !== 'number') {
              o.port = Number(o.port)
            }
            try {
              c(
                'Resolving socket for %o request: %o',
                o.protocol,
                `${e.method} ${e.path}`
              )
              Promise.resolve(this.promisifiedCallback(e, o)).then(
                onsocket,
                callbackError
              )
            } catch (e) {
              Promise.reject(e).catch(callbackError)
            }
          }
          freeSocket(e, t) {
            c('Freeing socket %o %o', e.constructor.name, t)
            e.destroy()
          }
          destroy() {
            c('Destroying agent %o', this.constructor.name)
          }
        }
        e.Agent = Agent
        e.prototype = e.Agent.prototype
      })(createAgent || (createAgent = {}))
      e.exports = createAgent
    },
    457: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      function promisify(e) {
        return function (t, o) {
          return new Promise((r, n) => {
            e.call(this, t, o, (e, t) => {
              if (e) {
                n(e)
              } else {
                r(t)
              }
            })
          })
        }
      }
      t['default'] = promisify
    },
    44: function (e, t, o) {
      var r =
        (this && this.__awaiter) ||
        function (e, t, o, r) {
          function adopt(e) {
            return e instanceof o
              ? e
              : new o(function (t) {
                  t(e)
                })
          }
          return new (o || (o = Promise))(function (o, n) {
            function fulfilled(e) {
              try {
                step(r.next(e))
              } catch (e) {
                n(e)
              }
            }
            function rejected(e) {
              try {
                step(r['throw'](e))
              } catch (e) {
                n(e)
              }
            }
            function step(e) {
              e.done ? o(e.value) : adopt(e.value).then(fulfilled, rejected)
            }
            step((r = r.apply(e, t || [])).next())
          })
        }
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(t, '__esModule', { value: true })
      const s = n(o(808))
      const i = n(o(404))
      const c = n(o(310))
      const u = n(o(491))
      const a = n(o(753))
      const l = o(448)
      const f = n(o(357))
      const p = a.default('https-proxy-agent:agent')
      class HttpsProxyAgent extends l.Agent {
        constructor(e) {
          let t
          if (typeof e === 'string') {
            t = c.default.parse(e)
          } else {
            t = e
          }
          if (!t) {
            throw new Error(
              'an HTTP(S) proxy server `host` and `port` must be specified!'
            )
          }
          p('creating new HttpsProxyAgent instance: %o', t)
          super(t)
          const o = Object.assign({}, t)
          this.secureProxy = t.secureProxy || isHTTPS(o.protocol)
          o.host = o.hostname || o.host
          if (typeof o.port === 'string') {
            o.port = parseInt(o.port, 10)
          }
          if (!o.port && o.host) {
            o.port = this.secureProxy ? 443 : 80
          }
          if (this.secureProxy && !('ALPNProtocols' in o)) {
            o.ALPNProtocols = ['http 1.1']
          }
          if (o.host && o.path) {
            delete o.path
            delete o.pathname
          }
          this.proxy = o
        }
        callback(e, t) {
          return r(this, void 0, void 0, function* () {
            const { proxy: o, secureProxy: r } = this
            let n
            if (r) {
              p('Creating `tls.Socket`: %o', o)
              n = i.default.connect(o)
            } else {
              p('Creating `net.Socket`: %o', o)
              n = s.default.connect(o)
            }
            const c = Object.assign({}, o.headers)
            const a = `${t.host}:${t.port}`
            let l = `CONNECT ${a} HTTP/1.1\r\n`
            if (o.auth) {
              c['Proxy-Authorization'] = `Basic ${Buffer.from(o.auth).toString(
                'base64'
              )}`
            }
            let { host: d, port: h, secureEndpoint: m } = t
            if (!isDefaultPort(h, m)) {
              d += `:${h}`
            }
            c.Host = d
            c.Connection = 'close'
            for (const e of Object.keys(c)) {
              l += `${e}: ${c[e]}\r\n`
            }
            const y = f.default(n)
            n.write(`${l}\r\n`)
            const { statusCode: g, buffered: x } = yield y
            if (g === 200) {
              e.once('socket', resume)
              if (t.secureEndpoint) {
                p('Upgrading socket connection to TLS')
                const e = t.servername || t.host
                return i.default.connect(
                  Object.assign(
                    Object.assign(
                      {},
                      omit(t, 'host', 'hostname', 'path', 'port')
                    ),
                    { socket: n, servername: e }
                  )
                )
              }
              return n
            }
            n.destroy()
            const _ = new s.default.Socket({ writable: false })
            _.readable = true
            e.once('socket', (e) => {
              p('replaying proxy buffer for failed request')
              u.default(e.listenerCount('data') > 0)
              e.push(x)
              e.push(null)
            })
            return _
          })
        }
      }
      t['default'] = HttpsProxyAgent
      function resume(e) {
        e.resume()
      }
      function isDefaultPort(e, t) {
        return Boolean((!t && e === 80) || (t && e === 443))
      }
      function isHTTPS(e) {
        return typeof e === 'string' ? /^https:?$/i.test(e) : false
      }
      function omit(e, ...t) {
        const o = {}
        let r
        for (r in e) {
          if (!t.includes(r)) {
            o[r] = e[r]
          }
        }
        return o
      }
    },
    157: function (e, t, o) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      const n = r(o(44))
      function createHttpsProxyAgent(e) {
        return new n.default(e)
      }
      ;(function (e) {
        e.HttpsProxyAgent = n.default
        e.prototype = n.default.prototype
      })(createHttpsProxyAgent || (createHttpsProxyAgent = {}))
      e.exports = createHttpsProxyAgent
    },
    357: function (e, t, o) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e }
        }
      Object.defineProperty(t, '__esModule', { value: true })
      const n = r(o(753))
      const s = n.default('https-proxy-agent:parse-proxy-response')
      function parseProxyResponse(e) {
        return new Promise((t, o) => {
          let r = 0
          const n = []
          function read() {
            const t = e.read()
            if (t) ondata(t)
            else e.once('readable', read)
          }
          function cleanup() {
            e.removeListener('end', onend)
            e.removeListener('error', onerror)
            e.removeListener('close', onclose)
            e.removeListener('readable', read)
          }
          function onclose(e) {
            s('onclose had error %o', e)
          }
          function onend() {
            s('onend')
          }
          function onerror(e) {
            cleanup()
            s('onerror %o', e)
            o(e)
          }
          function ondata(e) {
            n.push(e)
            r += e.length
            const o = Buffer.concat(n, r)
            const i = o.indexOf('\r\n\r\n')
            if (i === -1) {
              s('have not received end of HTTP headers yet...')
              read()
              return
            }
            const c = o.toString('ascii', 0, o.indexOf('\r\n'))
            const u = +c.split(' ')[1]
            s('got proxy server response: %o', c)
            t({ statusCode: u, buffered: o })
          }
          e.on('error', onerror)
          e.on('close', onclose)
          e.on('end', onend)
          read()
        })
      }
      t['default'] = parseProxyResponse
    },
    753: (e) => {
      e.exports = require('../debug')
    },
    491: (e) => {
      e.exports = require('assert')
    },
    361: (e) => {
      e.exports = require('events')
    },
    808: (e) => {
      e.exports = require('net')
    },
    404: (e) => {
      e.exports = require('tls')
    },
    310: (e) => {
      e.exports = require('url')
    },
  }
  var t = {}
  function __nccwpck_require__(o) {
    var r = t[o]
    if (r !== undefined) {
      return r.exports
    }
    var n = (t[o] = { exports: {} })
    var s = true
    try {
      e[o].call(n.exports, n, n.exports, __nccwpck_require__)
      s = false
    } finally {
      if (s) delete t[o]
    }
    return n.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var o = __nccwpck_require__(157)
  module.exports = o
})()