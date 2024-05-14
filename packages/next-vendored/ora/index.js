;(() => {
  var e = {
    535: (e, t, r) => {
      'use strict'
      e = r.nmd(e)
      const n = r(54)
      const wrapAnsi16 = (e, t) =>
        function () {
          const r = e.apply(n, arguments)
          return `[${r + t}m`
        }
      const wrapAnsi256 = (e, t) =>
        function () {
          const r = e.apply(n, arguments)
          return `[${38 + t};5;${r}m`
        }
      const wrapAnsi16m = (e, t) =>
        function () {
          const r = e.apply(n, arguments)
          return `[${38 + t};2;${r[0]};${r[1]};${r[2]}m`
        }
      function assembleStyles() {
        const e = new Map()
        const t = {
          modifier: {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29],
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            gray: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39],
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49],
          },
        }
        t.color.grey = t.color.gray
        for (const r of Object.keys(t)) {
          const n = t[r]
          for (const r of Object.keys(n)) {
            const s = n[r]
            t[r] = { open: `[${s[0]}m`, close: `[${s[1]}m` }
            n[r] = t[r]
            e.set(s[0], s[1])
          }
          Object.defineProperty(t, r, { value: n, enumerable: false })
          Object.defineProperty(t, 'codes', { value: e, enumerable: false })
        }
        const ansi2ansi = (e) => e
        const rgb2rgb = (e, t, r) => [e, t, r]
        t.color.close = '[39m'
        t.bgColor.close = '[49m'
        t.color.ansi = { ansi: wrapAnsi16(ansi2ansi, 0) }
        t.color.ansi256 = { ansi256: wrapAnsi256(ansi2ansi, 0) }
        t.color.ansi16m = { rgb: wrapAnsi16m(rgb2rgb, 0) }
        t.bgColor.ansi = { ansi: wrapAnsi16(ansi2ansi, 10) }
        t.bgColor.ansi256 = { ansi256: wrapAnsi256(ansi2ansi, 10) }
        t.bgColor.ansi16m = { rgb: wrapAnsi16m(rgb2rgb, 10) }
        for (let e of Object.keys(n)) {
          if (typeof n[e] !== 'object') {
            continue
          }
          const r = n[e]
          if (e === 'ansi16') {
            e = 'ansi'
          }
          if ('ansi16' in r) {
            t.color.ansi[e] = wrapAnsi16(r.ansi16, 0)
            t.bgColor.ansi[e] = wrapAnsi16(r.ansi16, 10)
          }
          if ('ansi256' in r) {
            t.color.ansi256[e] = wrapAnsi256(r.ansi256, 0)
            t.bgColor.ansi256[e] = wrapAnsi256(r.ansi256, 10)
          }
          if ('rgb' in r) {
            t.color.ansi16m[e] = wrapAnsi16m(r.rgb, 0)
            t.bgColor.ansi16m[e] = wrapAnsi16m(r.rgb, 10)
          }
        }
        return t
      }
      Object.defineProperty(e, 'exports', {
        enumerable: true,
        get: assembleStyles,
      })
    },
    14: (e, t, r) => {
      'use strict'
      e = r.nmd(e)
      const wrapAnsi16 =
        (e, t) =>
        (...r) => {
          const n = e(...r)
          return `[${n + t}m`
        }
      const wrapAnsi256 =
        (e, t) =>
        (...r) => {
          const n = e(...r)
          return `[${38 + t};5;${n}m`
        }
      const wrapAnsi16m =
        (e, t) =>
        (...r) => {
          const n = e(...r)
          return `[${38 + t};2;${n[0]};${n[1]};${n[2]}m`
        }
      const ansi2ansi = (e) => e
      const rgb2rgb = (e, t, r) => [e, t, r]
      const setLazyProperty = (e, t, r) => {
        Object.defineProperty(e, t, {
          get: () => {
            const n = r()
            Object.defineProperty(e, t, {
              value: n,
              enumerable: true,
              configurable: true,
            })
            return n
          },
          enumerable: true,
          configurable: true,
        })
      }
      let n
      const makeDynamicStyles = (e, t, s, o) => {
        if (n === undefined) {
          n = r(226)
        }
        const i = o ? 10 : 0
        const a = {}
        for (const [r, o] of Object.entries(n)) {
          const n = r === 'ansi16' ? 'ansi' : r
          if (r === t) {
            a[n] = e(s, i)
          } else if (typeof o === 'object') {
            a[n] = e(o[t], i)
          }
        }
        return a
      }
      function assembleStyles() {
        const e = new Map()
        const t = {
          modifier: {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29],
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39],
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49],
          },
        }
        t.color.gray = t.color.blackBright
        t.bgColor.bgGray = t.bgColor.bgBlackBright
        t.color.grey = t.color.blackBright
        t.bgColor.bgGrey = t.bgColor.bgBlackBright
        for (const [r, n] of Object.entries(t)) {
          for (const [r, s] of Object.entries(n)) {
            t[r] = { open: `[${s[0]}m`, close: `[${s[1]}m` }
            n[r] = t[r]
            e.set(s[0], s[1])
          }
          Object.defineProperty(t, r, { value: n, enumerable: false })
        }
        Object.defineProperty(t, 'codes', { value: e, enumerable: false })
        t.color.close = '[39m'
        t.bgColor.close = '[49m'
        setLazyProperty(t.color, 'ansi', () =>
          makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false)
        )
        setLazyProperty(t.color, 'ansi256', () =>
          makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false)
        )
        setLazyProperty(t.color, 'ansi16m', () =>
          makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false)
        )
        setLazyProperty(t.bgColor, 'ansi', () =>
          makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true)
        )
        setLazyProperty(t.bgColor, 'ansi256', () =>
          makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true)
        )
        setLazyProperty(t.bgColor, 'ansi16m', () =>
          makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true)
        )
        return t
      }
      Object.defineProperty(e, 'exports', {
        enumerable: true,
        get: assembleStyles,
      })
    },
    148: (e, t, r) => {
      'use strict'
      const n = r(379)
      const s = r(535)
      const o = r(220).stdout
      const i = r(299)
      const a =
        process.platform === 'win32' &&
        !(process.env.TERM || '').toLowerCase().startsWith('xterm')
      const l = ['ansi', 'ansi', 'ansi256', 'ansi16m']
      const u = new Set(['gray'])
      const f = Object.create(null)
      function applyOptions(e, t) {
        t = t || {}
        const r = o ? o.level : 0
        e.level = t.level === undefined ? r : t.level
        e.enabled = 'enabled' in t ? t.enabled : e.level > 0
      }
      function Chalk(e) {
        if (!this || !(this instanceof Chalk) || this.template) {
          const t = {}
          applyOptions(t, e)
          t.template = function () {
            const e = [].slice.call(arguments)
            return chalkTag.apply(null, [t.template].concat(e))
          }
          Object.setPrototypeOf(t, Chalk.prototype)
          Object.setPrototypeOf(t.template, t)
          t.template.constructor = Chalk
          return t.template
        }
        applyOptions(this, e)
      }
      if (a) {
        s.blue.open = '[94m'
      }
      for (const e of Object.keys(s)) {
        s[e].closeRe = new RegExp(n(s[e].close), 'g')
        f[e] = {
          get() {
            const t = s[e]
            return build.call(
              this,
              this._styles ? this._styles.concat(t) : [t],
              this._empty,
              e
            )
          },
        }
      }
      f.visible = {
        get() {
          return build.call(this, this._styles || [], true, 'visible')
        },
      }
      s.color.closeRe = new RegExp(n(s.color.close), 'g')
      for (const e of Object.keys(s.color.ansi)) {
        if (u.has(e)) {
          continue
        }
        f[e] = {
          get() {
            const t = this.level
            return function () {
              const r = s.color[l[t]][e].apply(null, arguments)
              const n = {
                open: r,
                close: s.color.close,
                closeRe: s.color.closeRe,
              }
              return build.call(
                this,
                this._styles ? this._styles.concat(n) : [n],
                this._empty,
                e
              )
            }
          },
        }
      }
      s.bgColor.closeRe = new RegExp(n(s.bgColor.close), 'g')
      for (const e of Object.keys(s.bgColor.ansi)) {
        if (u.has(e)) {
          continue
        }
        const t = 'bg' + e[0].toUpperCase() + e.slice(1)
        f[t] = {
          get() {
            const t = this.level
            return function () {
              const r = s.bgColor[l[t]][e].apply(null, arguments)
              const n = {
                open: r,
                close: s.bgColor.close,
                closeRe: s.bgColor.closeRe,
              }
              return build.call(
                this,
                this._styles ? this._styles.concat(n) : [n],
                this._empty,
                e
              )
            }
          },
        }
      }
      const h = Object.defineProperties(() => {}, f)
      function build(e, t, r) {
        const builder = function () {
          return applyStyle.apply(builder, arguments)
        }
        builder._styles = e
        builder._empty = t
        const n = this
        Object.defineProperty(builder, 'level', {
          enumerable: true,
          get() {
            return n.level
          },
          set(e) {
            n.level = e
          },
        })
        Object.defineProperty(builder, 'enabled', {
          enumerable: true,
          get() {
            return n.enabled
          },
          set(e) {
            n.enabled = e
          },
        })
        builder.hasGrey = this.hasGrey || r === 'gray' || r === 'grey'
        builder.__proto__ = h
        return builder
      }
      function applyStyle() {
        const e = arguments
        const t = e.length
        let r = String(arguments[0])
        if (t === 0) {
          return ''
        }
        if (t > 1) {
          for (let n = 1; n < t; n++) {
            r += ' ' + e[n]
          }
        }
        if (!this.enabled || this.level <= 0 || !r) {
          return this._empty ? '' : r
        }
        const n = s.dim.open
        if (a && this.hasGrey) {
          s.dim.open = ''
        }
        for (const e of this._styles.slice().reverse()) {
          r = e.open + r.replace(e.closeRe, e.open) + e.close
          r = r.replace(/\r?\n/g, `${e.close}$&${e.open}`)
        }
        s.dim.open = n
        return r
      }
      function chalkTag(e, t) {
        if (!Array.isArray(t)) {
          return [].slice.call(arguments, 1).join(' ')
        }
        const r = [].slice.call(arguments, 2)
        const n = [t.raw[0]]
        for (let e = 1; e < t.length; e++) {
          n.push(String(r[e - 1]).replace(/[{}\\]/g, '\\$&'))
          n.push(String(t.raw[e]))
        }
        return i(e, n.join(''))
      }
      Object.defineProperties(Chalk.prototype, f)
      e.exports = Chalk()
      e.exports.supportsColor = o
      e.exports['default'] = e.exports
    },
    299: (e) => {
      'use strict'
      const t =
        /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi
      const r = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g
      const n = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/
      const s = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi
      const o = new Map([
        ['n', '\n'],
        ['r', '\r'],
        ['t', '\t'],
        ['b', '\b'],
        ['f', '\f'],
        ['v', '\v'],
        ['0', '\0'],
        ['\\', '\\'],
        ['e', ''],
        ['a', ''],
      ])
      function unescape(e) {
        if (
          (e[0] === 'u' && e.length === 5) ||
          (e[0] === 'x' && e.length === 3)
        ) {
          return String.fromCharCode(parseInt(e.slice(1), 16))
        }
        return o.get(e) || e
      }
      function parseArguments(e, t) {
        const r = []
        const o = t.trim().split(/\s*,\s*/g)
        let i
        for (const t of o) {
          if (!isNaN(t)) {
            r.push(Number(t))
          } else if ((i = t.match(n))) {
            r.push(i[2].replace(s, (e, t, r) => (t ? unescape(t) : r)))
          } else {
            throw new Error(
              `Invalid Chalk template style argument: ${t} (in style '${e}')`
            )
          }
        }
        return r
      }
      function parseStyle(e) {
        r.lastIndex = 0
        const t = []
        let n
        while ((n = r.exec(e)) !== null) {
          const e = n[1]
          if (n[2]) {
            const r = parseArguments(e, n[2])
            t.push([e].concat(r))
          } else {
            t.push([e])
          }
        }
        return t
      }
      function buildStyle(e, t) {
        const r = {}
        for (const e of t) {
          for (const t of e.styles) {
            r[t[0]] = e.inverse ? null : t.slice(1)
          }
        }
        let n = e
        for (const e of Object.keys(r)) {
          if (Array.isArray(r[e])) {
            if (!(e in n)) {
              throw new Error(`Unknown Chalk style: ${e}`)
            }
            if (r[e].length > 0) {
              n = n[e].apply(n, r[e])
            } else {
              n = n[e]
            }
          }
        }
        return n
      }
      e.exports = (e, r) => {
        const n = []
        const s = []
        let o = []
        r.replace(t, (t, r, i, a, l, u) => {
          if (r) {
            o.push(unescape(r))
          } else if (a) {
            const t = o.join('')
            o = []
            s.push(n.length === 0 ? t : buildStyle(e, n)(t))
            n.push({ inverse: i, styles: parseStyle(a) })
          } else if (l) {
            if (n.length === 0) {
              throw new Error('Found extraneous } in Chalk template literal')
            }
            s.push(buildStyle(e, n)(o.join('')))
            o = []
            n.pop()
          } else {
            o.push(u)
          }
        })
        s.push(o.join(''))
        if (n.length > 0) {
          const e = `Chalk template literal is missing ${
            n.length
          } closing bracket${n.length === 1 ? '' : 's'} (\`}\`)`
          throw new Error(e)
        }
        return s.join('')
      }
    },
    385: (e, t, r) => {
      'use strict'
      const n = r(14)
      const { stdout: s, stderr: o } = r(793)
      const { stringReplaceAll: i, stringEncaseCRLFWithFirstIndex: a } = r(218)
      const l = ['ansi', 'ansi', 'ansi256', 'ansi16m']
      const u = Object.create(null)
      const applyOptions = (e, t = {}) => {
        if (t.level > 3 || t.level < 0) {
          throw new Error('The `level` option should be an integer from 0 to 3')
        }
        const r = s ? s.level : 0
        e.level = t.level === undefined ? r : t.level
      }
      class ChalkClass {
        constructor(e) {
          return chalkFactory(e)
        }
      }
      const chalkFactory = (e) => {
        const t = {}
        applyOptions(t, e)
        t.template = (...e) => chalkTag(t.template, ...e)
        Object.setPrototypeOf(t, Chalk.prototype)
        Object.setPrototypeOf(t.template, t)
        t.template.constructor = () => {
          throw new Error(
            '`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.'
          )
        }
        t.template.Instance = ChalkClass
        return t.template
      }
      function Chalk(e) {
        return chalkFactory(e)
      }
      for (const [e, t] of Object.entries(n)) {
        u[e] = {
          get() {
            const r = createBuilder(
              this,
              createStyler(t.open, t.close, this._styler),
              this._isEmpty
            )
            Object.defineProperty(this, e, { value: r })
            return r
          },
        }
      }
      u.visible = {
        get() {
          const e = createBuilder(this, this._styler, true)
          Object.defineProperty(this, 'visible', { value: e })
          return e
        },
      }
      const f = [
        'rgb',
        'hex',
        'keyword',
        'hsl',
        'hsv',
        'hwb',
        'ansi',
        'ansi256',
      ]
      for (const e of f) {
        u[e] = {
          get() {
            const { level: t } = this
            return function (...r) {
              const s = createStyler(
                n.color[l[t]][e](...r),
                n.color.close,
                this._styler
              )
              return createBuilder(this, s, this._isEmpty)
            }
          },
        }
      }
      for (const e of f) {
        const t = 'bg' + e[0].toUpperCase() + e.slice(1)
        u[t] = {
          get() {
            const { level: t } = this
            return function (...r) {
              const s = createStyler(
                n.bgColor[l[t]][e](...r),
                n.bgColor.close,
                this._styler
              )
              return createBuilder(this, s, this._isEmpty)
            }
          },
        }
      }
      const h = Object.defineProperties(() => {}, {
        ...u,
        level: {
          enumerable: true,
          get() {
            return this._generator.level
          },
          set(e) {
            this._generator.level = e
          },
        },
      })
      const createStyler = (e, t, r) => {
        let n
        let s
        if (r === undefined) {
          n = e
          s = t
        } else {
          n = r.openAll + e
          s = t + r.closeAll
        }
        return { open: e, close: t, openAll: n, closeAll: s, parent: r }
      }
      const createBuilder = (e, t, r) => {
        const builder = (...e) =>
          applyStyle(builder, e.length === 1 ? '' + e[0] : e.join(' '))
        builder.__proto__ = h
        builder._generator = e
        builder._styler = t
        builder._isEmpty = r
        return builder
      }
      const applyStyle = (e, t) => {
        if (e.level <= 0 || !t) {
          return e._isEmpty ? '' : t
        }
        let r = e._styler
        if (r === undefined) {
          return t
        }
        const { openAll: n, closeAll: s } = r
        if (t.indexOf('') !== -1) {
          while (r !== undefined) {
            t = i(t, r.close, r.open)
            r = r.parent
          }
        }
        const o = t.indexOf('\n')
        if (o !== -1) {
          t = a(t, s, n, o)
        }
        return n + t + s
      }
      let p
      const chalkTag = (e, ...t) => {
        const [n] = t
        if (!Array.isArray(n)) {
          return t.join(' ')
        }
        const s = t.slice(1)
        const o = [n.raw[0]]
        for (let e = 1; e < n.length; e++) {
          o.push(String(s[e - 1]).replace(/[{}\\]/g, '\\$&'), String(n.raw[e]))
        }
        if (p === undefined) {
          p = r(781)
        }
        return p(e, o.join(''))
      }
      Object.defineProperties(Chalk.prototype, u)
      const g = Chalk()
      g.supportsColor = s
      g.stderr = Chalk({ level: o ? o.level : 0 })
      g.stderr.supportsColor = o
      g.Level = {
        None: 0,
        Basic: 1,
        Ansi256: 2,
        TrueColor: 3,
        0: 'None',
        1: 'Basic',
        2: 'Ansi256',
        3: 'TrueColor',
      }
      e.exports = g
    },
    781: (e) => {
      'use strict'
      const t =
        /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi
      const r = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g
      const n = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/
      const s = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi
      const o = new Map([
        ['n', '\n'],
        ['r', '\r'],
        ['t', '\t'],
        ['b', '\b'],
        ['f', '\f'],
        ['v', '\v'],
        ['0', '\0'],
        ['\\', '\\'],
        ['e', ''],
        ['a', ''],
      ])
      function unescape(e) {
        const t = e[0] === 'u'
        const r = e[1] === '{'
        if ((t && !r && e.length === 5) || (e[0] === 'x' && e.length === 3)) {
          return String.fromCharCode(parseInt(e.slice(1), 16))
        }
        if (t && r) {
          return String.fromCodePoint(parseInt(e.slice(2, -1), 16))
        }
        return o.get(e) || e
      }
      function parseArguments(e, t) {
        const r = []
        const o = t.trim().split(/\s*,\s*/g)
        let i
        for (const t of o) {
          const o = Number(t)
          if (!Number.isNaN(o)) {
            r.push(o)
          } else if ((i = t.match(n))) {
            r.push(i[2].replace(s, (e, t, r) => (t ? unescape(t) : r)))
          } else {
            throw new Error(
              `Invalid Chalk template style argument: ${t} (in style '${e}')`
            )
          }
        }
        return r
      }
      function parseStyle(e) {
        r.lastIndex = 0
        const t = []
        let n
        while ((n = r.exec(e)) !== null) {
          const e = n[1]
          if (n[2]) {
            const r = parseArguments(e, n[2])
            t.push([e].concat(r))
          } else {
            t.push([e])
          }
        }
        return t
      }
      function buildStyle(e, t) {
        const r = {}
        for (const e of t) {
          for (const t of e.styles) {
            r[t[0]] = e.inverse ? null : t.slice(1)
          }
        }
        let n = e
        for (const [e, t] of Object.entries(r)) {
          if (!Array.isArray(t)) {
            continue
          }
          if (!(e in n)) {
            throw new Error(`Unknown Chalk style: ${e}`)
          }
          n = t.length > 0 ? n[e](...t) : n[e]
        }
        return n
      }
      e.exports = (e, r) => {
        const n = []
        const s = []
        let o = []
        r.replace(t, (t, r, i, a, l, u) => {
          if (r) {
            o.push(unescape(r))
          } else if (a) {
            const t = o.join('')
            o = []
            s.push(n.length === 0 ? t : buildStyle(e, n)(t))
            n.push({ inverse: i, styles: parseStyle(a) })
          } else if (l) {
            if (n.length === 0) {
              throw new Error('Found extraneous } in Chalk template literal')
            }
            s.push(buildStyle(e, n)(o.join('')))
            o = []
            n.pop()
          } else {
            o.push(u)
          }
        })
        s.push(o.join(''))
        if (n.length > 0) {
          const e = `Chalk template literal is missing ${
            n.length
          } closing bracket${n.length === 1 ? '' : 's'} (\`}\`)`
          throw new Error(e)
        }
        return s.join('')
      }
    },
    218: (e) => {
      'use strict'
      const stringReplaceAll = (e, t, r) => {
        let n = e.indexOf(t)
        if (n === -1) {
          return e
        }
        const s = t.length
        let o = 0
        let i = ''
        do {
          i += e.substr(o, n - o) + t + r
          o = n + s
          n = e.indexOf(t, o)
        } while (n !== -1)
        i += e.substr(o)
        return i
      }
      const stringEncaseCRLFWithFirstIndex = (e, t, r, n) => {
        let s = 0
        let o = ''
        do {
          const i = e[n - 1] === '\r'
          o += e.substr(s, (i ? n - 1 : n) - s) + t + (i ? '\r\n' : '\n') + r
          s = n + 1
          n = e.indexOf('\n', s)
        } while (n !== -1)
        o += e.substr(s)
        return o
      }
      e.exports = {
        stringReplaceAll: stringReplaceAll,
        stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex,
      }
    },
    581: (e, t, r) => {
      'use strict'
      const n = r(154)
      let s = false
      t.show = (e = process.stderr) => {
        if (!e.isTTY) {
          return
        }
        s = false
        e.write('[?25h')
      }
      t.hide = (e = process.stderr) => {
        if (!e.isTTY) {
          return
        }
        n()
        s = true
        e.write('[?25l')
      }
      t.toggle = (e, r) => {
        if (e !== undefined) {
          s = e
        }
        if (s) {
          t.show(r)
        } else {
          t.hide(r)
        }
      }
    },
    494: (e, t, r) => {
      'use strict'
      const n = Object.assign({}, r(32))
      const s = Object.keys(n)
      Object.defineProperty(n, 'random', {
        get() {
          const e = Math.floor(Math.random() * s.length)
          const t = s[e]
          return n[t]
        },
      })
      e.exports = n
    },
    578: (e) => {
      var t = (function () {
        'use strict'
        function clone(e, t, r, n) {
          var s
          if (typeof t === 'object') {
            r = t.depth
            n = t.prototype
            s = t.filter
            t = t.circular
          }
          var o = []
          var i = []
          var a = typeof Buffer != 'undefined'
          if (typeof t == 'undefined') t = true
          if (typeof r == 'undefined') r = Infinity
          function _clone(e, r) {
            if (e === null) return null
            if (r == 0) return e
            var s
            var l
            if (typeof e != 'object') {
              return e
            }
            if (clone.__isArray(e)) {
              s = []
            } else if (clone.__isRegExp(e)) {
              s = new RegExp(e.source, __getRegExpFlags(e))
              if (e.lastIndex) s.lastIndex = e.lastIndex
            } else if (clone.__isDate(e)) {
              s = new Date(e.getTime())
            } else if (a && Buffer.isBuffer(e)) {
              if (Buffer.allocUnsafe) {
                s = Buffer.allocUnsafe(e.length)
              } else {
                s = new Buffer(e.length)
              }
              e.copy(s)
              return s
            } else {
              if (typeof n == 'undefined') {
                l = Object.getPrototypeOf(e)
                s = Object.create(l)
              } else {
                s = Object.create(n)
                l = n
              }
            }
            if (t) {
              var u = o.indexOf(e)
              if (u != -1) {
                return i[u]
              }
              o.push(e)
              i.push(s)
            }
            for (var f in e) {
              var h
              if (l) {
                h = Object.getOwnPropertyDescriptor(l, f)
              }
              if (h && h.set == null) {
                continue
              }
              s[f] = _clone(e[f], r - 1)
            }
            return s
          }
          return _clone(e, r)
        }
        clone.clonePrototype = function clonePrototype(e) {
          if (e === null) return null
          var c = function () {}
          c.prototype = e
          return new c()
        }
        function __objToStr(e) {
          return Object.prototype.toString.call(e)
        }
        clone.__objToStr = __objToStr
        function __isDate(e) {
          return typeof e === 'object' && __objToStr(e) === '[object Date]'
        }
        clone.__isDate = __isDate
        function __isArray(e) {
          return typeof e === 'object' && __objToStr(e) === '[object Array]'
        }
        clone.__isArray = __isArray
        function __isRegExp(e) {
          return typeof e === 'object' && __objToStr(e) === '[object RegExp]'
        }
        clone.__isRegExp = __isRegExp
        function __getRegExpFlags(e) {
          var t = ''
          if (e.global) t += 'g'
          if (e.ignoreCase) t += 'i'
          if (e.multiline) t += 'm'
          return t
        }
        clone.__getRegExpFlags = __getRegExpFlags
        return clone
      })()
      if (true && e.exports) {
        e.exports = t
      }
    },
    117: (e, t, r) => {
      var n = r(251)
      var s = {}
      for (var o in n) {
        if (n.hasOwnProperty(o)) {
          s[n[o]] = o
        }
      }
      var i = (e.exports = {
        rgb: { channels: 3, labels: 'rgb' },
        hsl: { channels: 3, labels: 'hsl' },
        hsv: { channels: 3, labels: 'hsv' },
        hwb: { channels: 3, labels: 'hwb' },
        cmyk: { channels: 4, labels: 'cmyk' },
        xyz: { channels: 3, labels: 'xyz' },
        lab: { channels: 3, labels: 'lab' },
        lch: { channels: 3, labels: 'lch' },
        hex: { channels: 1, labels: ['hex'] },
        keyword: { channels: 1, labels: ['keyword'] },
        ansi16: { channels: 1, labels: ['ansi16'] },
        ansi256: { channels: 1, labels: ['ansi256'] },
        hcg: { channels: 3, labels: ['h', 'c', 'g'] },
        apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
        gray: { channels: 1, labels: ['gray'] },
      })
      for (var a in i) {
        if (i.hasOwnProperty(a)) {
          if (!('channels' in i[a])) {
            throw new Error('missing channels property: ' + a)
          }
          if (!('labels' in i[a])) {
            throw new Error('missing channel labels property: ' + a)
          }
          if (i[a].labels.length !== i[a].channels) {
            throw new Error('channel and label counts mismatch: ' + a)
          }
          var l = i[a].channels
          var u = i[a].labels
          delete i[a].channels
          delete i[a].labels
          Object.defineProperty(i[a], 'channels', { value: l })
          Object.defineProperty(i[a], 'labels', { value: u })
        }
      }
      i.rgb.hsl = function (e) {
        var t = e[0] / 255
        var r = e[1] / 255
        var n = e[2] / 255
        var s = Math.min(t, r, n)
        var o = Math.max(t, r, n)
        var i = o - s
        var a
        var l
        var u
        if (o === s) {
          a = 0
        } else if (t === o) {
          a = (r - n) / i
        } else if (r === o) {
          a = 2 + (n - t) / i
        } else if (n === o) {
          a = 4 + (t - r) / i
        }
        a = Math.min(a * 60, 360)
        if (a < 0) {
          a += 360
        }
        u = (s + o) / 2
        if (o === s) {
          l = 0
        } else if (u <= 0.5) {
          l = i / (o + s)
        } else {
          l = i / (2 - o - s)
        }
        return [a, l * 100, u * 100]
      }
      i.rgb.hsv = function (e) {
        var t
        var r
        var n
        var s
        var o
        var i = e[0] / 255
        var a = e[1] / 255
        var l = e[2] / 255
        var u = Math.max(i, a, l)
        var f = u - Math.min(i, a, l)
        var diffc = function (e) {
          return (u - e) / 6 / f + 1 / 2
        }
        if (f === 0) {
          s = o = 0
        } else {
          o = f / u
          t = diffc(i)
          r = diffc(a)
          n = diffc(l)
          if (i === u) {
            s = n - r
          } else if (a === u) {
            s = 1 / 3 + t - n
          } else if (l === u) {
            s = 2 / 3 + r - t
          }
          if (s < 0) {
            s += 1
          } else if (s > 1) {
            s -= 1
          }
        }
        return [s * 360, o * 100, u * 100]
      }
      i.rgb.hwb = function (e) {
        var t = e[0]
        var r = e[1]
        var n = e[2]
        var s = i.rgb.hsl(e)[0]
        var o = (1 / 255) * Math.min(t, Math.min(r, n))
        n = 1 - (1 / 255) * Math.max(t, Math.max(r, n))
        return [s, o * 100, n * 100]
      }
      i.rgb.cmyk = function (e) {
        var t = e[0] / 255
        var r = e[1] / 255
        var n = e[2] / 255
        var s
        var o
        var i
        var a
        a = Math.min(1 - t, 1 - r, 1 - n)
        s = (1 - t - a) / (1 - a) || 0
        o = (1 - r - a) / (1 - a) || 0
        i = (1 - n - a) / (1 - a) || 0
        return [s * 100, o * 100, i * 100, a * 100]
      }
      function comparativeDistance(e, t) {
        return (
          Math.pow(e[0] - t[0], 2) +
          Math.pow(e[1] - t[1], 2) +
          Math.pow(e[2] - t[2], 2)
        )
      }
      i.rgb.keyword = function (e) {
        var t = s[e]
        if (t) {
          return t
        }
        var r = Infinity
        var o
        for (var i in n) {
          if (n.hasOwnProperty(i)) {
            var a = n[i]
            var l = comparativeDistance(e, a)
            if (l < r) {
              r = l
              o = i
            }
          }
        }
        return o
      }
      i.keyword.rgb = function (e) {
        return n[e]
      }
      i.rgb.xyz = function (e) {
        var t = e[0] / 255
        var r = e[1] / 255
        var n = e[2] / 255
        t = t > 0.04045 ? Math.pow((t + 0.055) / 1.055, 2.4) : t / 12.92
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
        n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92
        var s = t * 0.4124 + r * 0.3576 + n * 0.1805
        var o = t * 0.2126 + r * 0.7152 + n * 0.0722
        var i = t * 0.0193 + r * 0.1192 + n * 0.9505
        return [s * 100, o * 100, i * 100]
      }
      i.rgb.lab = function (e) {
        var t = i.rgb.xyz(e)
        var r = t[0]
        var n = t[1]
        var s = t[2]
        var o
        var a
        var l
        r /= 95.047
        n /= 100
        s /= 108.883
        r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116
        n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116
        s = s > 0.008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116
        o = 116 * n - 16
        a = 500 * (r - n)
        l = 200 * (n - s)
        return [o, a, l]
      }
      i.hsl.rgb = function (e) {
        var t = e[0] / 360
        var r = e[1] / 100
        var n = e[2] / 100
        var s
        var o
        var i
        var a
        var l
        if (r === 0) {
          l = n * 255
          return [l, l, l]
        }
        if (n < 0.5) {
          o = n * (1 + r)
        } else {
          o = n + r - n * r
        }
        s = 2 * n - o
        a = [0, 0, 0]
        for (var u = 0; u < 3; u++) {
          i = t + (1 / 3) * -(u - 1)
          if (i < 0) {
            i++
          }
          if (i > 1) {
            i--
          }
          if (6 * i < 1) {
            l = s + (o - s) * 6 * i
          } else if (2 * i < 1) {
            l = o
          } else if (3 * i < 2) {
            l = s + (o - s) * (2 / 3 - i) * 6
          } else {
            l = s
          }
          a[u] = l * 255
        }
        return a
      }
      i.hsl.hsv = function (e) {
        var t = e[0]
        var r = e[1] / 100
        var n = e[2] / 100
        var s = r
        var o = Math.max(n, 0.01)
        var i
        var a
        n *= 2
        r *= n <= 1 ? n : 2 - n
        s *= o <= 1 ? o : 2 - o
        a = (n + r) / 2
        i = n === 0 ? (2 * s) / (o + s) : (2 * r) / (n + r)
        return [t, i * 100, a * 100]
      }
      i.hsv.rgb = function (e) {
        var t = e[0] / 60
        var r = e[1] / 100
        var n = e[2] / 100
        var s = Math.floor(t) % 6
        var o = t - Math.floor(t)
        var i = 255 * n * (1 - r)
        var a = 255 * n * (1 - r * o)
        var l = 255 * n * (1 - r * (1 - o))
        n *= 255
        switch (s) {
          case 0:
            return [n, l, i]
          case 1:
            return [a, n, i]
          case 2:
            return [i, n, l]
          case 3:
            return [i, a, n]
          case 4:
            return [l, i, n]
          case 5:
            return [n, i, a]
        }
      }
      i.hsv.hsl = function (e) {
        var t = e[0]
        var r = e[1] / 100
        var n = e[2] / 100
        var s = Math.max(n, 0.01)
        var o
        var i
        var a
        a = (2 - r) * n
        o = (2 - r) * s
        i = r * s
        i /= o <= 1 ? o : 2 - o
        i = i || 0
        a /= 2
        return [t, i * 100, a * 100]
      }
      i.hwb.rgb = function (e) {
        var t = e[0] / 360
        var r = e[1] / 100
        var n = e[2] / 100
        var s = r + n
        var o
        var i
        var a
        var l
        if (s > 1) {
          r /= s
          n /= s
        }
        o = Math.floor(6 * t)
        i = 1 - n
        a = 6 * t - o
        if ((o & 1) !== 0) {
          a = 1 - a
        }
        l = r + a * (i - r)
        var u
        var f
        var h
        switch (o) {
          default:
          case 6:
          case 0:
            u = i
            f = l
            h = r
            break
          case 1:
            u = l
            f = i
            h = r
            break
          case 2:
            u = r
            f = i
            h = l
            break
          case 3:
            u = r
            f = l
            h = i
            break
          case 4:
            u = l
            f = r
            h = i
            break
          case 5:
            u = i
            f = r
            h = l
            break
        }
        return [u * 255, f * 255, h * 255]
      }
      i.cmyk.rgb = function (e) {
        var t = e[0] / 100
        var r = e[1] / 100
        var n = e[2] / 100
        var s = e[3] / 100
        var o
        var i
        var a
        o = 1 - Math.min(1, t * (1 - s) + s)
        i = 1 - Math.min(1, r * (1 - s) + s)
        a = 1 - Math.min(1, n * (1 - s) + s)
        return [o * 255, i * 255, a * 255]
      }
      i.xyz.rgb = function (e) {
        var t = e[0] / 100
        var r = e[1] / 100
        var n = e[2] / 100
        var s
        var o
        var i
        s = t * 3.2406 + r * -1.5372 + n * -0.4986
        o = t * -0.9689 + r * 1.8758 + n * 0.0415
        i = t * 0.0557 + r * -0.204 + n * 1.057
        s = s > 0.0031308 ? 1.055 * Math.pow(s, 1 / 2.4) - 0.055 : s * 12.92
        o = o > 0.0031308 ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : o * 12.92
        i = i > 0.0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - 0.055 : i * 12.92
        s = Math.min(Math.max(0, s), 1)
        o = Math.min(Math.max(0, o), 1)
        i = Math.min(Math.max(0, i), 1)
        return [s * 255, o * 255, i * 255]
      }
      i.xyz.lab = function (e) {
        var t = e[0]
        var r = e[1]
        var n = e[2]
        var s
        var o
        var i
        t /= 95.047
        r /= 100
        n /= 108.883
        t = t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116
        r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116
        n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116
        s = 116 * r - 16
        o = 500 * (t - r)
        i = 200 * (r - n)
        return [s, o, i]
      }
      i.lab.xyz = function (e) {
        var t = e[0]
        var r = e[1]
        var n = e[2]
        var s
        var o
        var i
        o = (t + 16) / 116
        s = r / 500 + o
        i = o - n / 200
        var a = Math.pow(o, 3)
        var l = Math.pow(s, 3)
        var u = Math.pow(i, 3)
        o = a > 0.008856 ? a : (o - 16 / 116) / 7.787
        s = l > 0.008856 ? l : (s - 16 / 116) / 7.787
        i = u > 0.008856 ? u : (i - 16 / 116) / 7.787
        s *= 95.047
        o *= 100
        i *= 108.883
        return [s, o, i]
      }
      i.lab.lch = function (e) {
        var t = e[0]
        var r = e[1]
        var n = e[2]
        var s
        var o
        var i
        s = Math.atan2(n, r)
        o = (s * 360) / 2 / Math.PI
        if (o < 0) {
          o += 360
        }
        i = Math.sqrt(r * r + n * n)
        return [t, i, o]
      }
      i.lch.lab = function (e) {
        var t = e[0]
        var r = e[1]
        var n = e[2]
        var s
        var o
        var i
        i = (n / 360) * 2 * Math.PI
        s = r * Math.cos(i)
        o = r * Math.sin(i)
        return [t, s, o]
      }
      i.rgb.ansi16 = function (e) {
        var t = e[0]
        var r = e[1]
        var n = e[2]
        var s = 1 in arguments ? arguments[1] : i.rgb.hsv(e)[2]
        s = Math.round(s / 50)
        if (s === 0) {
          return 30
        }
        var o =
          30 +
          ((Math.round(n / 255) << 2) |
            (Math.round(r / 255) << 1) |
            Math.round(t / 255))
        if (s === 2) {
          o += 60
        }
        return o
      }
      i.hsv.ansi16 = function (e) {
        return i.rgb.ansi16(i.hsv.rgb(e), e[2])
      }
      i.rgb.ansi256 = function (e) {
        var t = e[0]
        var r = e[1]
        var n = e[2]
        if (t === r && r === n) {
          if (t < 8) {
            return 16
          }
          if (t > 248) {
            return 231
          }
          return Math.round(((t - 8) / 247) * 24) + 232
        }
        var s =
          16 +
          36 * Math.round((t / 255) * 5) +
          6 * Math.round((r / 255) * 5) +
          Math.round((n / 255) * 5)
        return s
      }
      i.ansi16.rgb = function (e) {
        var t = e % 10
        if (t === 0 || t === 7) {
          if (e > 50) {
            t += 3.5
          }
          t = (t / 10.5) * 255
          return [t, t, t]
        }
        var r = (~~(e > 50) + 1) * 0.5
        var n = (t & 1) * r * 255
        var s = ((t >> 1) & 1) * r * 255
        var o = ((t >> 2) & 1) * r * 255
        return [n, s, o]
      }
      i.ansi256.rgb = function (e) {
        if (e >= 232) {
          var t = (e - 232) * 10 + 8
          return [t, t, t]
        }
        e -= 16
        var r
        var n = (Math.floor(e / 36) / 5) * 255
        var s = (Math.floor((r = e % 36) / 6) / 5) * 255
        var o = ((r % 6) / 5) * 255
        return [n, s, o]
      }
      i.rgb.hex = function (e) {
        var t =
          ((Math.round(e[0]) & 255) << 16) +
          ((Math.round(e[1]) & 255) << 8) +
          (Math.round(e[2]) & 255)
        var r = t.toString(16).toUpperCase()
        return '000000'.substring(r.length) + r
      }
      i.hex.rgb = function (e) {
        var t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i)
        if (!t) {
          return [0, 0, 0]
        }
        var r = t[0]
        if (t[0].length === 3) {
          r = r
            .split('')
            .map(function (e) {
              return e + e
            })
            .join('')
        }
        var n = parseInt(r, 16)
        var s = (n >> 16) & 255
        var o = (n >> 8) & 255
        var i = n & 255
        return [s, o, i]
      }
      i.rgb.hcg = function (e) {
        var t = e[0] / 255
        var r = e[1] / 255
        var n = e[2] / 255
        var s = Math.max(Math.max(t, r), n)
        var o = Math.min(Math.min(t, r), n)
        var i = s - o
        var a
        var l
        if (i < 1) {
          a = o / (1 - i)
        } else {
          a = 0
        }
        if (i <= 0) {
          l = 0
        } else if (s === t) {
          l = ((r - n) / i) % 6
        } else if (s === r) {
          l = 2 + (n - t) / i
        } else {
          l = 4 + (t - r) / i + 4
        }
        l /= 6
        l %= 1
        return [l * 360, i * 100, a * 100]
      }
      i.hsl.hcg = function (e) {
        var t = e[1] / 100
        var r = e[2] / 100
        var n = 1
        var s = 0
        if (r < 0.5) {
          n = 2 * t * r
        } else {
          n = 2 * t * (1 - r)
        }
        if (n < 1) {
          s = (r - 0.5 * n) / (1 - n)
        }
        return [e[0], n * 100, s * 100]
      }
      i.hsv.hcg = function (e) {
        var t = e[1] / 100
        var r = e[2] / 100
        var n = t * r
        var s = 0
        if (n < 1) {
          s = (r - n) / (1 - n)
        }
        return [e[0], n * 100, s * 100]
      }
      i.hcg.rgb = function (e) {
        var t = e[0] / 360
        var r = e[1] / 100
        var n = e[2] / 100
        if (r === 0) {
          return [n * 255, n * 255, n * 255]
        }
        var s = [0, 0, 0]
        var o = (t % 1) * 6
        var i = o % 1
        var a = 1 - i
        var l = 0
        switch (Math.floor(o)) {
          case 0:
            s[0] = 1
            s[1] = i
            s[2] = 0
            break
          case 1:
            s[0] = a
            s[1] = 1
            s[2] = 0
            break
          case 2:
            s[0] = 0
            s[1] = 1
            s[2] = i
            break
          case 3:
            s[0] = 0
            s[1] = a
            s[2] = 1
            break
          case 4:
            s[0] = i
            s[1] = 0
            s[2] = 1
            break
          default:
            s[0] = 1
            s[1] = 0
            s[2] = a
        }
        l = (1 - r) * n
        return [
          (r * s[0] + l) * 255,
          (r * s[1] + l) * 255,
          (r * s[2] + l) * 255,
        ]
      }
      i.hcg.hsv = function (e) {
        var t = e[1] / 100
        var r = e[2] / 100
        var n = t + r * (1 - t)
        var s = 0
        if (n > 0) {
          s = t / n
        }
        return [e[0], s * 100, n * 100]
      }
      i.hcg.hsl = function (e) {
        var t = e[1] / 100
        var r = e[2] / 100
        var n = r * (1 - t) + 0.5 * t
        var s = 0
        if (n > 0 && n < 0.5) {
          s = t / (2 * n)
        } else if (n >= 0.5 && n < 1) {
          s = t / (2 * (1 - n))
        }
        return [e[0], s * 100, n * 100]
      }
      i.hcg.hwb = function (e) {
        var t = e[1] / 100
        var r = e[2] / 100
        var n = t + r * (1 - t)
        return [e[0], (n - t) * 100, (1 - n) * 100]
      }
      i.hwb.hcg = function (e) {
        var t = e[1] / 100
        var r = e[2] / 100
        var n = 1 - r
        var s = n - t
        var o = 0
        if (s < 1) {
          o = (n - s) / (1 - s)
        }
        return [e[0], s * 100, o * 100]
      }
      i.apple.rgb = function (e) {
        return [
          (e[0] / 65535) * 255,
          (e[1] / 65535) * 255,
          (e[2] / 65535) * 255,
        ]
      }
      i.rgb.apple = function (e) {
        return [
          (e[0] / 255) * 65535,
          (e[1] / 255) * 65535,
          (e[2] / 255) * 65535,
        ]
      }
      i.gray.rgb = function (e) {
        return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255]
      }
      i.gray.hsl = i.gray.hsv = function (e) {
        return [0, 0, e[0]]
      }
      i.gray.hwb = function (e) {
        return [0, 100, e[0]]
      }
      i.gray.cmyk = function (e) {
        return [0, 0, 0, e[0]]
      }
      i.gray.lab = function (e) {
        return [e[0], 0, 0]
      }
      i.gray.hex = function (e) {
        var t = Math.round((e[0] / 100) * 255) & 255
        var r = (t << 16) + (t << 8) + t
        var n = r.toString(16).toUpperCase()
        return '000000'.substring(n.length) + n
      }
      i.rgb.gray = function (e) {
        var t = (e[0] + e[1] + e[2]) / 3
        return [(t / 255) * 100]
      }
    },
    54: (e, t, r) => {
      var n = r(117)
      var s = r(528)
      var o = {}
      var i = Object.keys(n)
      function wrapRaw(e) {
        var wrappedFn = function (t) {
          if (t === undefined || t === null) {
            return t
          }
          if (arguments.length > 1) {
            t = Array.prototype.slice.call(arguments)
          }
          return e(t)
        }
        if ('conversion' in e) {
          wrappedFn.conversion = e.conversion
        }
        return wrappedFn
      }
      function wrapRounded(e) {
        var wrappedFn = function (t) {
          if (t === undefined || t === null) {
            return t
          }
          if (arguments.length > 1) {
            t = Array.prototype.slice.call(arguments)
          }
          var r = e(t)
          if (typeof r === 'object') {
            for (var n = r.length, s = 0; s < n; s++) {
              r[s] = Math.round(r[s])
            }
          }
          return r
        }
        if ('conversion' in e) {
          wrappedFn.conversion = e.conversion
        }
        return wrappedFn
      }
      i.forEach(function (e) {
        o[e] = {}
        Object.defineProperty(o[e], 'channels', { value: n[e].channels })
        Object.defineProperty(o[e], 'labels', { value: n[e].labels })
        var t = s(e)
        var r = Object.keys(t)
        r.forEach(function (r) {
          var n = t[r]
          o[e][r] = wrapRounded(n)
          o[e][r].raw = wrapRaw(n)
        })
      })
      e.exports = o
    },
    528: (e, t, r) => {
      var n = r(117)
      function buildGraph() {
        var e = {}
        var t = Object.keys(n)
        for (var r = t.length, s = 0; s < r; s++) {
          e[t[s]] = { distance: -1, parent: null }
        }
        return e
      }
      function deriveBFS(e) {
        var t = buildGraph()
        var r = [e]
        t[e].distance = 0
        while (r.length) {
          var s = r.pop()
          var o = Object.keys(n[s])
          for (var i = o.length, a = 0; a < i; a++) {
            var l = o[a]
            var u = t[l]
            if (u.distance === -1) {
              u.distance = t[s].distance + 1
              u.parent = s
              r.unshift(l)
            }
          }
        }
        return t
      }
      function link(e, t) {
        return function (r) {
          return t(e(r))
        }
      }
      function wrapConversion(e, t) {
        var r = [t[e].parent, e]
        var s = n[t[e].parent][e]
        var o = t[e].parent
        while (t[o].parent) {
          r.unshift(t[o].parent)
          s = link(n[t[o].parent][o], s)
          o = t[o].parent
        }
        s.conversion = r
        return s
      }
      e.exports = function (e) {
        var t = deriveBFS(e)
        var r = {}
        var n = Object.keys(t)
        for (var s = n.length, o = 0; o < s; o++) {
          var i = n[o]
          var a = t[i]
          if (a.parent === null) {
            continue
          }
          r[i] = wrapConversion(i, t)
        }
        return r
      }
    },
    113: (e, t, r) => {
      const n = r(993)
      const s = {}
      for (const e of Object.keys(n)) {
        s[n[e]] = e
      }
      const o = {
        rgb: { channels: 3, labels: 'rgb' },
        hsl: { channels: 3, labels: 'hsl' },
        hsv: { channels: 3, labels: 'hsv' },
        hwb: { channels: 3, labels: 'hwb' },
        cmyk: { channels: 4, labels: 'cmyk' },
        xyz: { channels: 3, labels: 'xyz' },
        lab: { channels: 3, labels: 'lab' },
        lch: { channels: 3, labels: 'lch' },
        hex: { channels: 1, labels: ['hex'] },
        keyword: { channels: 1, labels: ['keyword'] },
        ansi16: { channels: 1, labels: ['ansi16'] },
        ansi256: { channels: 1, labels: ['ansi256'] },
        hcg: { channels: 3, labels: ['h', 'c', 'g'] },
        apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
        gray: { channels: 1, labels: ['gray'] },
      }
      e.exports = o
      for (const e of Object.keys(o)) {
        if (!('channels' in o[e])) {
          throw new Error('missing channels property: ' + e)
        }
        if (!('labels' in o[e])) {
          throw new Error('missing channel labels property: ' + e)
        }
        if (o[e].labels.length !== o[e].channels) {
          throw new Error('channel and label counts mismatch: ' + e)
        }
        const { channels: t, labels: r } = o[e]
        delete o[e].channels
        delete o[e].labels
        Object.defineProperty(o[e], 'channels', { value: t })
        Object.defineProperty(o[e], 'labels', { value: r })
      }
      o.rgb.hsl = function (e) {
        const t = e[0] / 255
        const r = e[1] / 255
        const n = e[2] / 255
        const s = Math.min(t, r, n)
        const o = Math.max(t, r, n)
        const i = o - s
        let a
        let l
        if (o === s) {
          a = 0
        } else if (t === o) {
          a = (r - n) / i
        } else if (r === o) {
          a = 2 + (n - t) / i
        } else if (n === o) {
          a = 4 + (t - r) / i
        }
        a = Math.min(a * 60, 360)
        if (a < 0) {
          a += 360
        }
        const u = (s + o) / 2
        if (o === s) {
          l = 0
        } else if (u <= 0.5) {
          l = i / (o + s)
        } else {
          l = i / (2 - o - s)
        }
        return [a, l * 100, u * 100]
      }
      o.rgb.hsv = function (e) {
        let t
        let r
        let n
        let s
        let o
        const i = e[0] / 255
        const a = e[1] / 255
        const l = e[2] / 255
        const u = Math.max(i, a, l)
        const f = u - Math.min(i, a, l)
        const diffc = function (e) {
          return (u - e) / 6 / f + 1 / 2
        }
        if (f === 0) {
          s = 0
          o = 0
        } else {
          o = f / u
          t = diffc(i)
          r = diffc(a)
          n = diffc(l)
          if (i === u) {
            s = n - r
          } else if (a === u) {
            s = 1 / 3 + t - n
          } else if (l === u) {
            s = 2 / 3 + r - t
          }
          if (s < 0) {
            s += 1
          } else if (s > 1) {
            s -= 1
          }
        }
        return [s * 360, o * 100, u * 100]
      }
      o.rgb.hwb = function (e) {
        const t = e[0]
        const r = e[1]
        let n = e[2]
        const s = o.rgb.hsl(e)[0]
        const i = (1 / 255) * Math.min(t, Math.min(r, n))
        n = 1 - (1 / 255) * Math.max(t, Math.max(r, n))
        return [s, i * 100, n * 100]
      }
      o.rgb.cmyk = function (e) {
        const t = e[0] / 255
        const r = e[1] / 255
        const n = e[2] / 255
        const s = Math.min(1 - t, 1 - r, 1 - n)
        const o = (1 - t - s) / (1 - s) || 0
        const i = (1 - r - s) / (1 - s) || 0
        const a = (1 - n - s) / (1 - s) || 0
        return [o * 100, i * 100, a * 100, s * 100]
      }
      function comparativeDistance(e, t) {
        return (e[0] - t[0]) ** 2 + (e[1] - t[1]) ** 2 + (e[2] - t[2]) ** 2
      }
      o.rgb.keyword = function (e) {
        const t = s[e]
        if (t) {
          return t
        }
        let r = Infinity
        let o
        for (const t of Object.keys(n)) {
          const s = n[t]
          const i = comparativeDistance(e, s)
          if (i < r) {
            r = i
            o = t
          }
        }
        return o
      }
      o.keyword.rgb = function (e) {
        return n[e]
      }
      o.rgb.xyz = function (e) {
        let t = e[0] / 255
        let r = e[1] / 255
        let n = e[2] / 255
        t = t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92
        r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92
        n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92
        const s = t * 0.4124 + r * 0.3576 + n * 0.1805
        const o = t * 0.2126 + r * 0.7152 + n * 0.0722
        const i = t * 0.0193 + r * 0.1192 + n * 0.9505
        return [s * 100, o * 100, i * 100]
      }
      o.rgb.lab = function (e) {
        const t = o.rgb.xyz(e)
        let r = t[0]
        let n = t[1]
        let s = t[2]
        r /= 95.047
        n /= 100
        s /= 108.883
        r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116
        n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116
        s = s > 0.008856 ? s ** (1 / 3) : 7.787 * s + 16 / 116
        const i = 116 * n - 16
        const a = 500 * (r - n)
        const l = 200 * (n - s)
        return [i, a, l]
      }
      o.hsl.rgb = function (e) {
        const t = e[0] / 360
        const r = e[1] / 100
        const n = e[2] / 100
        let s
        let o
        let i
        if (r === 0) {
          i = n * 255
          return [i, i, i]
        }
        if (n < 0.5) {
          s = n * (1 + r)
        } else {
          s = n + r - n * r
        }
        const a = 2 * n - s
        const l = [0, 0, 0]
        for (let e = 0; e < 3; e++) {
          o = t + (1 / 3) * -(e - 1)
          if (o < 0) {
            o++
          }
          if (o > 1) {
            o--
          }
          if (6 * o < 1) {
            i = a + (s - a) * 6 * o
          } else if (2 * o < 1) {
            i = s
          } else if (3 * o < 2) {
            i = a + (s - a) * (2 / 3 - o) * 6
          } else {
            i = a
          }
          l[e] = i * 255
        }
        return l
      }
      o.hsl.hsv = function (e) {
        const t = e[0]
        let r = e[1] / 100
        let n = e[2] / 100
        let s = r
        const o = Math.max(n, 0.01)
        n *= 2
        r *= n <= 1 ? n : 2 - n
        s *= o <= 1 ? o : 2 - o
        const i = (n + r) / 2
        const a = n === 0 ? (2 * s) / (o + s) : (2 * r) / (n + r)
        return [t, a * 100, i * 100]
      }
      o.hsv.rgb = function (e) {
        const t = e[0] / 60
        const r = e[1] / 100
        let n = e[2] / 100
        const s = Math.floor(t) % 6
        const o = t - Math.floor(t)
        const i = 255 * n * (1 - r)
        const a = 255 * n * (1 - r * o)
        const l = 255 * n * (1 - r * (1 - o))
        n *= 255
        switch (s) {
          case 0:
            return [n, l, i]
          case 1:
            return [a, n, i]
          case 2:
            return [i, n, l]
          case 3:
            return [i, a, n]
          case 4:
            return [l, i, n]
          case 5:
            return [n, i, a]
        }
      }
      o.hsv.hsl = function (e) {
        const t = e[0]
        const r = e[1] / 100
        const n = e[2] / 100
        const s = Math.max(n, 0.01)
        let o
        let i
        i = (2 - r) * n
        const a = (2 - r) * s
        o = r * s
        o /= a <= 1 ? a : 2 - a
        o = o || 0
        i /= 2
        return [t, o * 100, i * 100]
      }
      o.hwb.rgb = function (e) {
        const t = e[0] / 360
        let r = e[1] / 100
        let n = e[2] / 100
        const s = r + n
        let o
        if (s > 1) {
          r /= s
          n /= s
        }
        const i = Math.floor(6 * t)
        const a = 1 - n
        o = 6 * t - i
        if ((i & 1) !== 0) {
          o = 1 - o
        }
        const l = r + o * (a - r)
        let u
        let f
        let h
        switch (i) {
          default:
          case 6:
          case 0:
            u = a
            f = l
            h = r
            break
          case 1:
            u = l
            f = a
            h = r
            break
          case 2:
            u = r
            f = a
            h = l
            break
          case 3:
            u = r
            f = l
            h = a
            break
          case 4:
            u = l
            f = r
            h = a
            break
          case 5:
            u = a
            f = r
            h = l
            break
        }
        return [u * 255, f * 255, h * 255]
      }
      o.cmyk.rgb = function (e) {
        const t = e[0] / 100
        const r = e[1] / 100
        const n = e[2] / 100
        const s = e[3] / 100
        const o = 1 - Math.min(1, t * (1 - s) + s)
        const i = 1 - Math.min(1, r * (1 - s) + s)
        const a = 1 - Math.min(1, n * (1 - s) + s)
        return [o * 255, i * 255, a * 255]
      }
      o.xyz.rgb = function (e) {
        const t = e[0] / 100
        const r = e[1] / 100
        const n = e[2] / 100
        let s
        let o
        let i
        s = t * 3.2406 + r * -1.5372 + n * -0.4986
        o = t * -0.9689 + r * 1.8758 + n * 0.0415
        i = t * 0.0557 + r * -0.204 + n * 1.057
        s = s > 0.0031308 ? 1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92
        o = o > 0.0031308 ? 1.055 * o ** (1 / 2.4) - 0.055 : o * 12.92
        i = i > 0.0031308 ? 1.055 * i ** (1 / 2.4) - 0.055 : i * 12.92
        s = Math.min(Math.max(0, s), 1)
        o = Math.min(Math.max(0, o), 1)
        i = Math.min(Math.max(0, i), 1)
        return [s * 255, o * 255, i * 255]
      }
      o.xyz.lab = function (e) {
        let t = e[0]
        let r = e[1]
        let n = e[2]
        t /= 95.047
        r /= 100
        n /= 108.883
        t = t > 0.008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116
        r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116
        n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116
        const s = 116 * r - 16
        const o = 500 * (t - r)
        const i = 200 * (r - n)
        return [s, o, i]
      }
      o.lab.xyz = function (e) {
        const t = e[0]
        const r = e[1]
        const n = e[2]
        let s
        let o
        let i
        o = (t + 16) / 116
        s = r / 500 + o
        i = o - n / 200
        const a = o ** 3
        const l = s ** 3
        const u = i ** 3
        o = a > 0.008856 ? a : (o - 16 / 116) / 7.787
        s = l > 0.008856 ? l : (s - 16 / 116) / 7.787
        i = u > 0.008856 ? u : (i - 16 / 116) / 7.787
        s *= 95.047
        o *= 100
        i *= 108.883
        return [s, o, i]
      }
      o.lab.lch = function (e) {
        const t = e[0]
        const r = e[1]
        const n = e[2]
        let s
        const o = Math.atan2(n, r)
        s = (o * 360) / 2 / Math.PI
        if (s < 0) {
          s += 360
        }
        const i = Math.sqrt(r * r + n * n)
        return [t, i, s]
      }
      o.lch.lab = function (e) {
        const t = e[0]
        const r = e[1]
        const n = e[2]
        const s = (n / 360) * 2 * Math.PI
        const o = r * Math.cos(s)
        const i = r * Math.sin(s)
        return [t, o, i]
      }
      o.rgb.ansi16 = function (e, t = null) {
        const [r, n, s] = e
        let i = t === null ? o.rgb.hsv(e)[2] : t
        i = Math.round(i / 50)
        if (i === 0) {
          return 30
        }
        let a =
          30 +
          ((Math.round(s / 255) << 2) |
            (Math.round(n / 255) << 1) |
            Math.round(r / 255))
        if (i === 2) {
          a += 60
        }
        return a
      }
      o.hsv.ansi16 = function (e) {
        return o.rgb.ansi16(o.hsv.rgb(e), e[2])
      }
      o.rgb.ansi256 = function (e) {
        const t = e[0]
        const r = e[1]
        const n = e[2]
        if (t === r && r === n) {
          if (t < 8) {
            return 16
          }
          if (t > 248) {
            return 231
          }
          return Math.round(((t - 8) / 247) * 24) + 232
        }
        const s =
          16 +
          36 * Math.round((t / 255) * 5) +
          6 * Math.round((r / 255) * 5) +
          Math.round((n / 255) * 5)
        return s
      }
      o.ansi16.rgb = function (e) {
        let t = e % 10
        if (t === 0 || t === 7) {
          if (e > 50) {
            t += 3.5
          }
          t = (t / 10.5) * 255
          return [t, t, t]
        }
        const r = (~~(e > 50) + 1) * 0.5
        const n = (t & 1) * r * 255
        const s = ((t >> 1) & 1) * r * 255
        const o = ((t >> 2) & 1) * r * 255
        return [n, s, o]
      }
      o.ansi256.rgb = function (e) {
        if (e >= 232) {
          const t = (e - 232) * 10 + 8
          return [t, t, t]
        }
        e -= 16
        let t
        const r = (Math.floor(e / 36) / 5) * 255
        const n = (Math.floor((t = e % 36) / 6) / 5) * 255
        const s = ((t % 6) / 5) * 255
        return [r, n, s]
      }
      o.rgb.hex = function (e) {
        const t =
          ((Math.round(e[0]) & 255) << 16) +
          ((Math.round(e[1]) & 255) << 8) +
          (Math.round(e[2]) & 255)
        const r = t.toString(16).toUpperCase()
        return '000000'.substring(r.length) + r
      }
      o.hex.rgb = function (e) {
        const t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i)
        if (!t) {
          return [0, 0, 0]
        }
        let r = t[0]
        if (t[0].length === 3) {
          r = r
            .split('')
            .map((e) => e + e)
            .join('')
        }
        const n = parseInt(r, 16)
        const s = (n >> 16) & 255
        const o = (n >> 8) & 255
        const i = n & 255
        return [s, o, i]
      }
      o.rgb.hcg = function (e) {
        const t = e[0] / 255
        const r = e[1] / 255
        const n = e[2] / 255
        const s = Math.max(Math.max(t, r), n)
        const o = Math.min(Math.min(t, r), n)
        const i = s - o
        let a
        let l
        if (i < 1) {
          a = o / (1 - i)
        } else {
          a = 0
        }
        if (i <= 0) {
          l = 0
        } else if (s === t) {
          l = ((r - n) / i) % 6
        } else if (s === r) {
          l = 2 + (n - t) / i
        } else {
          l = 4 + (t - r) / i
        }
        l /= 6
        l %= 1
        return [l * 360, i * 100, a * 100]
      }
      o.hsl.hcg = function (e) {
        const t = e[1] / 100
        const r = e[2] / 100
        const n = r < 0.5 ? 2 * t * r : 2 * t * (1 - r)
        let s = 0
        if (n < 1) {
          s = (r - 0.5 * n) / (1 - n)
        }
        return [e[0], n * 100, s * 100]
      }
      o.hsv.hcg = function (e) {
        const t = e[1] / 100
        const r = e[2] / 100
        const n = t * r
        let s = 0
        if (n < 1) {
          s = (r - n) / (1 - n)
        }
        return [e[0], n * 100, s * 100]
      }
      o.hcg.rgb = function (e) {
        const t = e[0] / 360
        const r = e[1] / 100
        const n = e[2] / 100
        if (r === 0) {
          return [n * 255, n * 255, n * 255]
        }
        const s = [0, 0, 0]
        const o = (t % 1) * 6
        const i = o % 1
        const a = 1 - i
        let l = 0
        switch (Math.floor(o)) {
          case 0:
            s[0] = 1
            s[1] = i
            s[2] = 0
            break
          case 1:
            s[0] = a
            s[1] = 1
            s[2] = 0
            break
          case 2:
            s[0] = 0
            s[1] = 1
            s[2] = i
            break
          case 3:
            s[0] = 0
            s[1] = a
            s[2] = 1
            break
          case 4:
            s[0] = i
            s[1] = 0
            s[2] = 1
            break
          default:
            s[0] = 1
            s[1] = 0
            s[2] = a
        }
        l = (1 - r) * n
        return [
          (r * s[0] + l) * 255,
          (r * s[1] + l) * 255,
          (r * s[2] + l) * 255,
        ]
      }
      o.hcg.hsv = function (e) {
        const t = e[1] / 100
        const r = e[2] / 100
        const n = t + r * (1 - t)
        let s = 0
        if (n > 0) {
          s = t / n
        }
        return [e[0], s * 100, n * 100]
      }
      o.hcg.hsl = function (e) {
        const t = e[1] / 100
        const r = e[2] / 100
        const n = r * (1 - t) + 0.5 * t
        let s = 0
        if (n > 0 && n < 0.5) {
          s = t / (2 * n)
        } else if (n >= 0.5 && n < 1) {
          s = t / (2 * (1 - n))
        }
        return [e[0], s * 100, n * 100]
      }
      o.hcg.hwb = function (e) {
        const t = e[1] / 100
        const r = e[2] / 100
        const n = t + r * (1 - t)
        return [e[0], (n - t) * 100, (1 - n) * 100]
      }
      o.hwb.hcg = function (e) {
        const t = e[1] / 100
        const r = e[2] / 100
        const n = 1 - r
        const s = n - t
        let o = 0
        if (s < 1) {
          o = (n - s) / (1 - s)
        }
        return [e[0], s * 100, o * 100]
      }
      o.apple.rgb = function (e) {
        return [
          (e[0] / 65535) * 255,
          (e[1] / 65535) * 255,
          (e[2] / 65535) * 255,
        ]
      }
      o.rgb.apple = function (e) {
        return [
          (e[0] / 255) * 65535,
          (e[1] / 255) * 65535,
          (e[2] / 255) * 65535,
        ]
      }
      o.gray.rgb = function (e) {
        return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255]
      }
      o.gray.hsl = function (e) {
        return [0, 0, e[0]]
      }
      o.gray.hsv = o.gray.hsl
      o.gray.hwb = function (e) {
        return [0, 100, e[0]]
      }
      o.gray.cmyk = function (e) {
        return [0, 0, 0, e[0]]
      }
      o.gray.lab = function (e) {
        return [e[0], 0, 0]
      }
      o.gray.hex = function (e) {
        const t = Math.round((e[0] / 100) * 255) & 255
        const r = (t << 16) + (t << 8) + t
        const n = r.toString(16).toUpperCase()
        return '000000'.substring(n.length) + n
      }
      o.rgb.gray = function (e) {
        const t = (e[0] + e[1] + e[2]) / 3
        return [(t / 255) * 100]
      }
    },
    226: (e, t, r) => {
      const n = r(113)
      const s = r(971)
      const o = {}
      const i = Object.keys(n)
      function wrapRaw(e) {
        const wrappedFn = function (...t) {
          const r = t[0]
          if (r === undefined || r === null) {
            return r
          }
          if (r.length > 1) {
            t = r
          }
          return e(t)
        }
        if ('conversion' in e) {
          wrappedFn.conversion = e.conversion
        }
        return wrappedFn
      }
      function wrapRounded(e) {
        const wrappedFn = function (...t) {
          const r = t[0]
          if (r === undefined || r === null) {
            return r
          }
          if (r.length > 1) {
            t = r
          }
          const n = e(t)
          if (typeof n === 'object') {
            for (let e = n.length, t = 0; t < e; t++) {
              n[t] = Math.round(n[t])
            }
          }
          return n
        }
        if ('conversion' in e) {
          wrappedFn.conversion = e.conversion
        }
        return wrappedFn
      }
      i.forEach((e) => {
        o[e] = {}
        Object.defineProperty(o[e], 'channels', { value: n[e].channels })
        Object.defineProperty(o[e], 'labels', { value: n[e].labels })
        const t = s(e)
        const r = Object.keys(t)
        r.forEach((r) => {
          const n = t[r]
          o[e][r] = wrapRounded(n)
          o[e][r].raw = wrapRaw(n)
        })
      })
      e.exports = o
    },
    971: (e, t, r) => {
      const n = r(113)
      function buildGraph() {
        const e = {}
        const t = Object.keys(n)
        for (let r = t.length, n = 0; n < r; n++) {
          e[t[n]] = { distance: -1, parent: null }
        }
        return e
      }
      function deriveBFS(e) {
        const t = buildGraph()
        const r = [e]
        t[e].distance = 0
        while (r.length) {
          const e = r.pop()
          const s = Object.keys(n[e])
          for (let n = s.length, o = 0; o < n; o++) {
            const n = s[o]
            const i = t[n]
            if (i.distance === -1) {
              i.distance = t[e].distance + 1
              i.parent = e
              r.unshift(n)
            }
          }
        }
        return t
      }
      function link(e, t) {
        return function (r) {
          return t(e(r))
        }
      }
      function wrapConversion(e, t) {
        const r = [t[e].parent, e]
        let s = n[t[e].parent][e]
        let o = t[e].parent
        while (t[o].parent) {
          r.unshift(t[o].parent)
          s = link(n[t[o].parent][o], s)
          o = t[o].parent
        }
        s.conversion = r
        return s
      }
      e.exports = function (e) {
        const t = deriveBFS(e)
        const r = {}
        const n = Object.keys(t)
        for (let e = n.length, s = 0; s < e; s++) {
          const e = n[s]
          const o = t[e]
          if (o.parent === null) {
            continue
          }
          r[e] = wrapConversion(e, t)
        }
        return r
      }
    },
    251: (e) => {
      'use strict'
      e.exports = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      }
    },
    993: (e) => {
      'use strict'
      e.exports = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      }
    },
    987: (e, t, r) => {
      var n = r(578)
      e.exports = function (e, t) {
        e = e || {}
        Object.keys(t).forEach(function (r) {
          if (typeof e[r] === 'undefined') {
            e[r] = n(t[r])
          }
        })
        return e
      }
    },
    379: (e) => {
      'use strict'
      var t = /[|\\{}()[\]^$+*?.]/g
      e.exports = function (e) {
        if (typeof e !== 'string') {
          throw new TypeError('Expected a string')
        }
        return e.replace(t, '\\$&')
      }
    },
    343: (e) => {
      'use strict'
      e.exports = (e, t) => {
        t = t || process.argv
        const r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--'
        const n = t.indexOf(r + e)
        const s = t.indexOf('--')
        return n !== -1 && (s === -1 ? true : n < s)
      }
    },
    914: (e) => {
      'use strict'
      e.exports = (e, t = process.argv) => {
        const r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--'
        const n = t.indexOf(r + e)
        const s = t.indexOf('--')
        return n !== -1 && (s === -1 || n < s)
      }
    },
    934: (e) => {
      'use strict'
      e.exports = ({ stream: e = process.stdout } = {}) =>
        Boolean(
          e && e.isTTY && process.env.TERM !== 'dumb' && !('CI' in process.env)
        )
    },
    663: (e, t, r) => {
      'use strict'
      const n = r(148)
      const s =
        process.platform !== 'win32' ||
        process.env.CI ||
        process.env.TERM === 'xterm-256color'
      const o = {
        info: n.blue('ℹ'),
        success: n.green('✔'),
        warning: n.yellow('⚠'),
        error: n.red('✖'),
      }
      const i = {
        info: n.blue('i'),
        success: n.green('√'),
        warning: n.yellow('‼'),
        error: n.red('×'),
      }
      e.exports = s ? o : i
    },
    469: (e) => {
      'use strict'
      const mimicFn = (e, t) => {
        for (const r of Reflect.ownKeys(t)) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
        }
        return e
      }
      e.exports = mimicFn
      e.exports['default'] = mimicFn
    },
    502: (e, t, r) => {
      var n = r(955)
      e.exports = MuteStream
      function MuteStream(e) {
        n.apply(this)
        e = e || {}
        this.writable = this.readable = true
        this.muted = false
        this.on('pipe', this._onpipe)
        this.replace = e.replace
        this._prompt = e.prompt || null
        this._hadControl = false
      }
      MuteStream.prototype = Object.create(n.prototype)
      Object.defineProperty(MuteStream.prototype, 'constructor', {
        value: MuteStream,
        enumerable: false,
      })
      MuteStream.prototype.mute = function () {
        this.muted = true
      }
      MuteStream.prototype.unmute = function () {
        this.muted = false
      }
      Object.defineProperty(MuteStream.prototype, '_onpipe', {
        value: onPipe,
        enumerable: false,
        writable: true,
        configurable: true,
      })
      function onPipe(e) {
        this._src = e
      }
      Object.defineProperty(MuteStream.prototype, 'isTTY', {
        get: getIsTTY,
        set: setIsTTY,
        enumerable: true,
        configurable: true,
      })
      function getIsTTY() {
        return this._dest
          ? this._dest.isTTY
          : this._src
          ? this._src.isTTY
          : false
      }
      function setIsTTY(e) {
        Object.defineProperty(this, 'isTTY', {
          value: e,
          enumerable: true,
          writable: true,
          configurable: true,
        })
      }
      Object.defineProperty(MuteStream.prototype, 'rows', {
        get: function () {
          return this._dest
            ? this._dest.rows
            : this._src
            ? this._src.rows
            : undefined
        },
        enumerable: true,
        configurable: true,
      })
      Object.defineProperty(MuteStream.prototype, 'columns', {
        get: function () {
          return this._dest
            ? this._dest.columns
            : this._src
            ? this._src.columns
            : undefined
        },
        enumerable: true,
        configurable: true,
      })
      MuteStream.prototype.pipe = function (e, t) {
        this._dest = e
        return n.prototype.pipe.call(this, e, t)
      }
      MuteStream.prototype.pause = function () {
        if (this._src) return this._src.pause()
      }
      MuteStream.prototype.resume = function () {
        if (this._src) return this._src.resume()
      }
      MuteStream.prototype.write = function (e) {
        if (this.muted) {
          if (!this.replace) return true
          if (e.match(/^\u001b/)) {
            if (e.indexOf(this._prompt) === 0) {
              e = e.substr(this._prompt.length)
              e = e.replace(/./g, this.replace)
              e = this._prompt + e
            }
            this._hadControl = true
            return this.emit('data', e)
          } else {
            if (
              this._prompt &&
              this._hadControl &&
              e.indexOf(this._prompt) === 0
            ) {
              this._hadControl = false
              this.emit('data', this._prompt)
              e = e.substr(this._prompt.length)
            }
            e = e.toString().replace(/./g, this.replace)
          }
        }
        this.emit('data', e)
      }
      MuteStream.prototype.end = function (e) {
        if (this.muted) {
          if (e && this.replace) {
            e = e.toString().replace(/./g, this.replace)
          } else {
            e = null
          }
        }
        if (e) this.emit('data', e)
        this.emit('end')
      }
      function proxy(e) {
        return function () {
          var t = this._dest
          var r = this._src
          if (t && t[e]) t[e].apply(t, arguments)
          if (r && r[e]) r[e].apply(r, arguments)
        }
      }
      MuteStream.prototype.destroy = proxy('destroy')
      MuteStream.prototype.destroySoon = proxy('destroySoon')
      MuteStream.prototype.close = proxy('close')
    },
    430: (e, t, r) => {
      'use strict'
      const n = r(469)
      const s = new WeakMap()
      const onetime = (e, t = {}) => {
        if (typeof e !== 'function') {
          throw new TypeError('Expected a function')
        }
        let r
        let o = 0
        const i = e.displayName || e.name || '<anonymous>'
        const onetime = function (...n) {
          s.set(onetime, ++o)
          if (o === 1) {
            r = e.apply(this, n)
            e = null
          } else if (t.throw === true) {
            throw new Error(`Function \`${i}\` can only be called once`)
          }
          return r
        }
        n(onetime, e)
        s.set(onetime, o)
        return onetime
      }
      e.exports = onetime
      e.exports['default'] = onetime
      e.exports.callCount = (e) => {
        if (!s.has(e)) {
          throw new Error(
            `The given function \`${e.name}\` is not wrapped by the \`onetime\` package`
          )
        }
        return s.get(e)
      }
    },
    327: (e, t, r) => {
      'use strict'
      const n = r(521)
      const s = r(385)
      const o = r(581)
      const i = r(494)
      const a = r(663)
      const l = r(286)
      const u = r(457)
      const f = r(934)
      const h = r(502)
      const p = Symbol('text')
      const g = Symbol('prefixText')
      const d = 3
      class StdinDiscarder {
        constructor() {
          this.requests = 0
          this.mutedStream = new h()
          this.mutedStream.pipe(process.stdout)
          this.mutedStream.mute()
          const e = this
          this.ourEmit = function (t, r, ...n) {
            const { stdin: s } = process
            if (e.requests > 0 || s.emit === e.ourEmit) {
              if (t === 'keypress') {
                return
              }
              if (t === 'data' && r.includes(d)) {
                process.emit('SIGINT')
              }
              Reflect.apply(e.oldEmit, this, [t, r, ...n])
            } else {
              Reflect.apply(process.stdin.emit, this, [t, r, ...n])
            }
          }
        }
        start() {
          this.requests++
          if (this.requests === 1) {
            this.realStart()
          }
        }
        stop() {
          if (this.requests <= 0) {
            throw new Error('`stop` called more times than `start`')
          }
          this.requests--
          if (this.requests === 0) {
            this.realStop()
          }
        }
        realStart() {
          if (process.platform === 'win32') {
            return
          }
          this.rl = n.createInterface({
            input: process.stdin,
            output: this.mutedStream,
          })
          this.rl.on('SIGINT', () => {
            if (process.listenerCount('SIGINT') === 0) {
              process.emit('SIGINT')
            } else {
              this.rl.close()
              process.kill(process.pid, 'SIGINT')
            }
          })
        }
        realStop() {
          if (process.platform === 'win32') {
            return
          }
          this.rl.close()
          this.rl = undefined
        }
      }
      const v = new StdinDiscarder()
      class Ora {
        constructor(e) {
          if (typeof e === 'string') {
            e = { text: e }
          }
          this.options = {
            text: '',
            color: 'cyan',
            stream: process.stderr,
            discardStdin: true,
            ...e,
          }
          this.spinner = this.options.spinner
          this.color = this.options.color
          this.hideCursor = this.options.hideCursor !== false
          this.interval = this.options.interval || this.spinner.interval || 100
          this.stream = this.options.stream
          this.id = undefined
          this.isEnabled =
            typeof this.options.isEnabled === 'boolean'
              ? this.options.isEnabled
              : f({ stream: this.stream })
          this.text = this.options.text
          this.prefixText = this.options.prefixText
          this.linesToClear = 0
          this.indent = this.options.indent
          this.discardStdin = this.options.discardStdin
          this.isDiscardingStdin = false
        }
        get indent() {
          return this._indent
        }
        set indent(e = 0) {
          if (!(e >= 0 && Number.isInteger(e))) {
            throw new Error(
              'The `indent` option must be an integer from 0 and up'
            )
          }
          this._indent = e
        }
        _updateInterval(e) {
          if (e !== undefined) {
            this.interval = e
          }
        }
        get spinner() {
          return this._spinner
        }
        set spinner(e) {
          this.frameIndex = 0
          if (typeof e === 'object') {
            if (e.frames === undefined) {
              throw new Error('The given spinner must have a `frames` property')
            }
            this._spinner = e
          } else if (process.platform === 'win32') {
            this._spinner = i.line
          } else if (e === undefined) {
            this._spinner = i.dots
          } else if (i[e]) {
            this._spinner = i[e]
          } else {
            throw new Error(
              `There is no built-in spinner named '${e}'. See https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json for a full list.`
            )
          }
          this._updateInterval(this._spinner.interval)
        }
        get text() {
          return this[p]
        }
        get prefixText() {
          return this[g]
        }
        get isSpinning() {
          return this.id !== undefined
        }
        updateLineCount() {
          const e = this.stream.columns || 80
          const t = typeof this[g] === 'string' ? this[g] + '-' : ''
          this.lineCount = l(t + '--' + this[p])
            .split('\n')
            .reduce((t, r) => t + Math.max(1, Math.ceil(u(r) / e)), 0)
        }
        set text(e) {
          this[p] = e
          this.updateLineCount()
        }
        set prefixText(e) {
          this[g] = e
          this.updateLineCount()
        }
        frame() {
          const { frames: e } = this.spinner
          let t = e[this.frameIndex]
          if (this.color) {
            t = s[this.color](t)
          }
          this.frameIndex = ++this.frameIndex % e.length
          const r =
            typeof this.prefixText === 'string' && this.prefixText !== ''
              ? this.prefixText + ' '
              : ''
          const n = typeof this.text === 'string' ? ' ' + this.text : ''
          return r + t + n
        }
        clear() {
          if (!this.isEnabled || !this.stream.isTTY) {
            return this
          }
          for (let e = 0; e < this.linesToClear; e++) {
            if (e > 0) {
              this.stream.moveCursor(0, -1)
            }
            this.stream.clearLine()
            this.stream.cursorTo(this.indent)
          }
          this.linesToClear = 0
          return this
        }
        render() {
          this.clear()
          this.stream.write(this.frame())
          this.linesToClear = this.lineCount
          return this
        }
        start(e) {
          if (e) {
            this.text = e
          }
          if (!this.isEnabled) {
            if (this.text) {
              this.stream.write(`- ${this.text}\n`)
            }
            return this
          }
          if (this.isSpinning) {
            return this
          }
          if (this.hideCursor) {
            o.hide(this.stream)
          }
          if (this.discardStdin && process.stdin.isTTY) {
            this.isDiscardingStdin = true
            v.start()
          }
          this.render()
          this.id = setInterval(this.render.bind(this), this.interval)
          return this
        }
        stop() {
          if (!this.isEnabled) {
            return this
          }
          clearInterval(this.id)
          this.id = undefined
          this.frameIndex = 0
          this.clear()
          if (this.hideCursor) {
            o.show(this.stream)
          }
          if (
            this.discardStdin &&
            process.stdin.isTTY &&
            this.isDiscardingStdin
          ) {
            v.stop()
            this.isDiscardingStdin = false
          }
          return this
        }
        succeed(e) {
          return this.stopAndPersist({ symbol: a.success, text: e })
        }
        fail(e) {
          return this.stopAndPersist({ symbol: a.error, text: e })
        }
        warn(e) {
          return this.stopAndPersist({ symbol: a.warning, text: e })
        }
        info(e) {
          return this.stopAndPersist({ symbol: a.info, text: e })
        }
        stopAndPersist(e = {}) {
          const t = e.prefixText || this.prefixText
          const r = typeof t === 'string' && t !== '' ? t + ' ' : ''
          const n = e.text || this.text
          const s = typeof n === 'string' ? ' ' + n : ''
          this.stop()
          this.stream.write(`${r}${e.symbol || ' '}${s}\n`)
          return this
        }
      }
      const oraFactory = function (e) {
        return new Ora(e)
      }
      e.exports = oraFactory
      e.exports.promise = (e, t) => {
        if (typeof e.then !== 'function') {
          throw new TypeError('Parameter `action` must be a Promise')
        }
        const r = new Ora(t)
        r.start()
        ;(async () => {
          try {
            await e
            r.succeed()
          } catch (e) {
            r.fail()
          }
        })()
        return r
      }
    },
    154: (e, t, r) => {
      'use strict'
      const n = r(430)
      const s = r(234)
      e.exports = n(() => {
        s(
          () => {
            process.stderr.write('[?25h')
          },
          { alwaysLast: true }
        )
      })
    },
    234: (e, t, r) => {
      var n = global.process
      const processOk = function (e) {
        return (
          e &&
          typeof e === 'object' &&
          typeof e.removeListener === 'function' &&
          typeof e.emit === 'function' &&
          typeof e.reallyExit === 'function' &&
          typeof e.listeners === 'function' &&
          typeof e.kill === 'function' &&
          typeof e.pid === 'number' &&
          typeof e.on === 'function'
        )
      }
      if (!processOk(n)) {
        e.exports = function () {
          return function () {}
        }
      } else {
        var s = r(491)
        var o = r(986)
        var i = /^win/i.test(n.platform)
        var a = r(361)
        if (typeof a !== 'function') {
          a = a.EventEmitter
        }
        var l
        if (n.__signal_exit_emitter__) {
          l = n.__signal_exit_emitter__
        } else {
          l = n.__signal_exit_emitter__ = new a()
          l.count = 0
          l.emitted = {}
        }
        if (!l.infinite) {
          l.setMaxListeners(Infinity)
          l.infinite = true
        }
        e.exports = function (e, t) {
          if (!processOk(global.process)) {
            return function () {}
          }
          s.equal(
            typeof e,
            'function',
            'a callback must be provided for exit handler'
          )
          if (p === false) {
            g()
          }
          var r = 'exit'
          if (t && t.alwaysLast) {
            r = 'afterexit'
          }
          var remove = function () {
            l.removeListener(r, e)
            if (
              l.listeners('exit').length === 0 &&
              l.listeners('afterexit').length === 0
            ) {
              u()
            }
          }
          l.on(r, e)
          return remove
        }
        var u = function unload() {
          if (!p || !processOk(global.process)) {
            return
          }
          p = false
          o.forEach(function (e) {
            try {
              n.removeListener(e, h[e])
            } catch (e) {}
          })
          n.emit = b
          n.reallyExit = d
          l.count -= 1
        }
        e.exports.unload = u
        var f = function emit(e, t, r) {
          if (l.emitted[e]) {
            return
          }
          l.emitted[e] = true
          l.emit(e, t, r)
        }
        var h = {}
        o.forEach(function (e) {
          h[e] = function listener() {
            if (!processOk(global.process)) {
              return
            }
            var t = n.listeners(e)
            if (t.length === l.count) {
              u()
              f('exit', null, e)
              f('afterexit', null, e)
              if (i && e === 'SIGHUP') {
                e = 'SIGINT'
              }
              n.kill(n.pid, e)
            }
          }
        })
        e.exports.signals = function () {
          return o
        }
        var p = false
        var g = function load() {
          if (p || !processOk(global.process)) {
            return
          }
          p = true
          l.count += 1
          o = o.filter(function (e) {
            try {
              n.on(e, h[e])
              return true
            } catch (e) {
              return false
            }
          })
          n.emit = m
          n.reallyExit = v
        }
        e.exports.load = g
        var d = n.reallyExit
        var v = function processReallyExit(e) {
          if (!processOk(global.process)) {
            return
          }
          n.exitCode = e || 0
          f('exit', n.exitCode, null)
          f('afterexit', n.exitCode, null)
          d.call(n, n.exitCode)
        }
        var b = n.emit
        var m = function processEmit(e, t) {
          if (e === 'exit' && processOk(global.process)) {
            if (t !== undefined) {
              n.exitCode = t
            }
            var r = b.apply(this, arguments)
            f('exit', n.exitCode, null)
            f('afterexit', n.exitCode, null)
            return r
          } else {
            return b.apply(this, arguments)
          }
        }
      }
    },
    986: (e) => {
      e.exports = ['SIGABRT', 'SIGALRM', 'SIGHUP', 'SIGINT', 'SIGTERM']
      if (process.platform !== 'win32') {
        e.exports.push(
          'SIGVTALRM',
          'SIGXCPU',
          'SIGXFSZ',
          'SIGUSR2',
          'SIGTRAP',
          'SIGSYS',
          'SIGQUIT',
          'SIGIOT'
        )
      }
      if (process.platform === 'linux') {
        e.exports.push('SIGIO', 'SIGPOLL', 'SIGPWR', 'SIGSTKFLT', 'SIGUNUSED')
      }
    },
    220: (e, t, r) => {
      'use strict'
      const n = r(37)
      const s = r(343)
      const o = process.env
      let i
      if (s('no-color') || s('no-colors') || s('color=false')) {
        i = false
      } else if (
        s('color') ||
        s('colors') ||
        s('color=true') ||
        s('color=always')
      ) {
        i = true
      }
      if ('FORCE_COLOR' in o) {
        i = o.FORCE_COLOR.length === 0 || parseInt(o.FORCE_COLOR, 10) !== 0
      }
      function translateLevel(e) {
        if (e === 0) {
          return false
        }
        return { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 }
      }
      function supportsColor(e) {
        if (i === false) {
          return 0
        }
        if (s('color=16m') || s('color=full') || s('color=truecolor')) {
          return 3
        }
        if (s('color=256')) {
          return 2
        }
        if (e && !e.isTTY && i !== true) {
          return 0
        }
        const t = i ? 1 : 0
        if (process.platform === 'win32') {
          const e = n.release().split('.')
          if (
            Number(process.versions.node.split('.')[0]) >= 8 &&
            Number(e[0]) >= 10 &&
            Number(e[2]) >= 10586
          ) {
            return Number(e[2]) >= 14931 ? 3 : 2
          }
          return 1
        }
        if ('CI' in o) {
          if (
            ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(
              (e) => e in o
            ) ||
            o.CI_NAME === 'codeship'
          ) {
            return 1
          }
          return t
        }
        if ('TEAMCITY_VERSION' in o) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)
            ? 1
            : 0
        }
        if (o.COLORTERM === 'truecolor') {
          return 3
        }
        if ('TERM_PROGRAM' in o) {
          const e = parseInt((o.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
          switch (o.TERM_PROGRAM) {
            case 'iTerm.app':
              return e >= 3 ? 3 : 2
            case 'Apple_Terminal':
              return 2
          }
        }
        if (/-256(color)?$/i.test(o.TERM)) {
          return 2
        }
        if (
          /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
            o.TERM
          )
        ) {
          return 1
        }
        if ('COLORTERM' in o) {
          return 1
        }
        if (o.TERM === 'dumb') {
          return t
        }
        return t
      }
      function getSupportLevel(e) {
        const t = supportsColor(e)
        return translateLevel(t)
      }
      e.exports = {
        supportsColor: getSupportLevel,
        stdout: getSupportLevel(process.stdout),
        stderr: getSupportLevel(process.stderr),
      }
    },
    793: (e, t, r) => {
      'use strict'
      const n = r(37)
      const s = r(224)
      const o = r(914)
      const { env: i } = process
      let a
      if (
        o('no-color') ||
        o('no-colors') ||
        o('color=false') ||
        o('color=never')
      ) {
        a = 0
      } else if (
        o('color') ||
        o('colors') ||
        o('color=true') ||
        o('color=always')
      ) {
        a = 1
      }
      if ('FORCE_COLOR' in i) {
        if (i.FORCE_COLOR === 'true') {
          a = 1
        } else if (i.FORCE_COLOR === 'false') {
          a = 0
        } else {
          a =
            i.FORCE_COLOR.length === 0
              ? 1
              : Math.min(parseInt(i.FORCE_COLOR, 10), 3)
        }
      }
      function translateLevel(e) {
        if (e === 0) {
          return false
        }
        return { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 }
      }
      function supportsColor(e, t) {
        if (a === 0) {
          return 0
        }
        if (o('color=16m') || o('color=full') || o('color=truecolor')) {
          return 3
        }
        if (o('color=256')) {
          return 2
        }
        if (e && !t && a === undefined) {
          return 0
        }
        const r = a || 0
        if (i.TERM === 'dumb') {
          return r
        }
        if (process.platform === 'win32') {
          const e = n.release().split('.')
          if (Number(e[0]) >= 10 && Number(e[2]) >= 10586) {
            return Number(e[2]) >= 14931 ? 3 : 2
          }
          return 1
        }
        if ('CI' in i) {
          if (
            [
              'TRAVIS',
              'CIRCLECI',
              'APPVEYOR',
              'GITLAB_CI',
              'GITHUB_ACTIONS',
              'BUILDKITE',
            ].some((e) => e in i) ||
            i.CI_NAME === 'codeship'
          ) {
            return 1
          }
          return r
        }
        if ('TEAMCITY_VERSION' in i) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION)
            ? 1
            : 0
        }
        if (i.COLORTERM === 'truecolor') {
          return 3
        }
        if ('TERM_PROGRAM' in i) {
          const e = parseInt((i.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
          switch (i.TERM_PROGRAM) {
            case 'iTerm.app':
              return e >= 3 ? 3 : 2
            case 'Apple_Terminal':
              return 2
          }
        }
        if (/-256(color)?$/i.test(i.TERM)) {
          return 2
        }
        if (
          /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
            i.TERM
          )
        ) {
          return 1
        }
        if ('COLORTERM' in i) {
          return 1
        }
        return r
      }
      function getSupportLevel(e) {
        const t = supportsColor(e, e && e.isTTY)
        return translateLevel(t)
      }
      e.exports = {
        supportsColor: getSupportLevel,
        stdout: translateLevel(supportsColor(true, s.isatty(1))),
        stderr: translateLevel(supportsColor(true, s.isatty(2))),
      }
    },
    567: (e) => {
      e.exports = [
        [768, 879],
        [1155, 1158],
        [1160, 1161],
        [1425, 1469],
        [1471, 1471],
        [1473, 1474],
        [1476, 1477],
        [1479, 1479],
        [1536, 1539],
        [1552, 1557],
        [1611, 1630],
        [1648, 1648],
        [1750, 1764],
        [1767, 1768],
        [1770, 1773],
        [1807, 1807],
        [1809, 1809],
        [1840, 1866],
        [1958, 1968],
        [2027, 2035],
        [2305, 2306],
        [2364, 2364],
        [2369, 2376],
        [2381, 2381],
        [2385, 2388],
        [2402, 2403],
        [2433, 2433],
        [2492, 2492],
        [2497, 2500],
        [2509, 2509],
        [2530, 2531],
        [2561, 2562],
        [2620, 2620],
        [2625, 2626],
        [2631, 2632],
        [2635, 2637],
        [2672, 2673],
        [2689, 2690],
        [2748, 2748],
        [2753, 2757],
        [2759, 2760],
        [2765, 2765],
        [2786, 2787],
        [2817, 2817],
        [2876, 2876],
        [2879, 2879],
        [2881, 2883],
        [2893, 2893],
        [2902, 2902],
        [2946, 2946],
        [3008, 3008],
        [3021, 3021],
        [3134, 3136],
        [3142, 3144],
        [3146, 3149],
        [3157, 3158],
        [3260, 3260],
        [3263, 3263],
        [3270, 3270],
        [3276, 3277],
        [3298, 3299],
        [3393, 3395],
        [3405, 3405],
        [3530, 3530],
        [3538, 3540],
        [3542, 3542],
        [3633, 3633],
        [3636, 3642],
        [3655, 3662],
        [3761, 3761],
        [3764, 3769],
        [3771, 3772],
        [3784, 3789],
        [3864, 3865],
        [3893, 3893],
        [3895, 3895],
        [3897, 3897],
        [3953, 3966],
        [3968, 3972],
        [3974, 3975],
        [3984, 3991],
        [3993, 4028],
        [4038, 4038],
        [4141, 4144],
        [4146, 4146],
        [4150, 4151],
        [4153, 4153],
        [4184, 4185],
        [4448, 4607],
        [4959, 4959],
        [5906, 5908],
        [5938, 5940],
        [5970, 5971],
        [6002, 6003],
        [6068, 6069],
        [6071, 6077],
        [6086, 6086],
        [6089, 6099],
        [6109, 6109],
        [6155, 6157],
        [6313, 6313],
        [6432, 6434],
        [6439, 6440],
        [6450, 6450],
        [6457, 6459],
        [6679, 6680],
        [6912, 6915],
        [6964, 6964],
        [6966, 6970],
        [6972, 6972],
        [6978, 6978],
        [7019, 7027],
        [7616, 7626],
        [7678, 7679],
        [8203, 8207],
        [8234, 8238],
        [8288, 8291],
        [8298, 8303],
        [8400, 8431],
        [12330, 12335],
        [12441, 12442],
        [43014, 43014],
        [43019, 43019],
        [43045, 43046],
        [64286, 64286],
        [65024, 65039],
        [65056, 65059],
        [65279, 65279],
        [65529, 65531],
        [68097, 68099],
        [68101, 68102],
        [68108, 68111],
        [68152, 68154],
        [68159, 68159],
        [119143, 119145],
        [119155, 119170],
        [119173, 119179],
        [119210, 119213],
        [119362, 119364],
        [917505, 917505],
        [917536, 917631],
        [917760, 917999],
      ]
    },
    457: (e, t, r) => {
      'use strict'
      var n = r(987)
      var s = r(567)
      var o = { nul: 0, control: 0 }
      e.exports = function wcwidth(e) {
        return wcswidth(e, o)
      }
      e.exports.config = function (e) {
        e = n(e || {}, o)
        return function wcwidth(t) {
          return wcswidth(t, e)
        }
      }
      function wcswidth(e, t) {
        if (typeof e !== 'string') return wcwidth(e, t)
        var r = 0
        for (var n = 0; n < e.length; n++) {
          var s = wcwidth(e.charCodeAt(n), t)
          if (s < 0) return -1
          r += s
        }
        return r
      }
      function wcwidth(e, t) {
        if (e === 0) return t.nul
        if (e < 32 || (e >= 127 && e < 160)) return t.control
        if (bisearch(e)) return 0
        return (
          1 +
          (e >= 4352 &&
            (e <= 4447 ||
              e == 9001 ||
              e == 9002 ||
              (e >= 11904 && e <= 42191 && e != 12351) ||
              (e >= 44032 && e <= 55203) ||
              (e >= 63744 && e <= 64255) ||
              (e >= 65040 && e <= 65049) ||
              (e >= 65072 && e <= 65135) ||
              (e >= 65280 && e <= 65376) ||
              (e >= 65504 && e <= 65510) ||
              (e >= 131072 && e <= 196605) ||
              (e >= 196608 && e <= 262141)))
        )
      }
      function bisearch(e) {
        var t = 0
        var r = s.length - 1
        var n
        if (e < s[0][0] || e > s[r][1]) return false
        while (r >= t) {
          n = Math.floor((t + r) / 2)
          if (e > s[n][1]) t = n + 1
          else if (e < s[n][0]) r = n - 1
          else return true
        }
        return false
      }
    },
    286: (e) => {
      'use strict'
      e.exports = require('../strip-ansi')
    },
    491: (e) => {
      'use strict'
      e.exports = require('assert')
    },
    361: (e) => {
      'use strict'
      e.exports = require('events')
    },
    37: (e) => {
      'use strict'
      e.exports = require('os')
    },
    521: (e) => {
      'use strict'
      e.exports = require('readline')
    },
    955: (e) => {
      'use strict'
      e.exports = require('stream')
    },
    224: (e) => {
      'use strict'
      e.exports = require('tty')
    },
    32: (e) => {
      'use strict'
      e.exports = JSON.parse(
        '{"dots":{"interval":80,"frames":["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]},"dots2":{"interval":80,"frames":["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"]},"dots3":{"interval":80,"frames":["⠋","⠙","⠚","⠞","⠖","⠦","⠴","⠲","⠳","⠓"]},"dots4":{"interval":80,"frames":["⠄","⠆","⠇","⠋","⠙","⠸","⠰","⠠","⠰","⠸","⠙","⠋","⠇","⠆"]},"dots5":{"interval":80,"frames":["⠋","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋"]},"dots6":{"interval":80,"frames":["⠁","⠉","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠤","⠄","⠄","⠤","⠴","⠲","⠒","⠂","⠂","⠒","⠚","⠙","⠉","⠁"]},"dots7":{"interval":80,"frames":["⠈","⠉","⠋","⠓","⠒","⠐","⠐","⠒","⠖","⠦","⠤","⠠","⠠","⠤","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋","⠉","⠈"]},"dots8":{"interval":80,"frames":["⠁","⠁","⠉","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠤","⠄","⠄","⠤","⠠","⠠","⠤","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋","⠉","⠈","⠈"]},"dots9":{"interval":80,"frames":["⢹","⢺","⢼","⣸","⣇","⡧","⡗","⡏"]},"dots10":{"interval":80,"frames":["⢄","⢂","⢁","⡁","⡈","⡐","⡠"]},"dots11":{"interval":100,"frames":["⠁","⠂","⠄","⡀","⢀","⠠","⠐","⠈"]},"dots12":{"interval":80,"frames":["⢀⠀","⡀⠀","⠄⠀","⢂⠀","⡂⠀","⠅⠀","⢃⠀","⡃⠀","⠍⠀","⢋⠀","⡋⠀","⠍⠁","⢋⠁","⡋⠁","⠍⠉","⠋⠉","⠋⠉","⠉⠙","⠉⠙","⠉⠩","⠈⢙","⠈⡙","⢈⠩","⡀⢙","⠄⡙","⢂⠩","⡂⢘","⠅⡘","⢃⠨","⡃⢐","⠍⡐","⢋⠠","⡋⢀","⠍⡁","⢋⠁","⡋⠁","⠍⠉","⠋⠉","⠋⠉","⠉⠙","⠉⠙","⠉⠩","⠈⢙","⠈⡙","⠈⠩","⠀⢙","⠀⡙","⠀⠩","⠀⢘","⠀⡘","⠀⠨","⠀⢐","⠀⡐","⠀⠠","⠀⢀","⠀⡀"]},"dots8Bit":{"interval":80,"frames":["⠀","⠁","⠂","⠃","⠄","⠅","⠆","⠇","⡀","⡁","⡂","⡃","⡄","⡅","⡆","⡇","⠈","⠉","⠊","⠋","⠌","⠍","⠎","⠏","⡈","⡉","⡊","⡋","⡌","⡍","⡎","⡏","⠐","⠑","⠒","⠓","⠔","⠕","⠖","⠗","⡐","⡑","⡒","⡓","⡔","⡕","⡖","⡗","⠘","⠙","⠚","⠛","⠜","⠝","⠞","⠟","⡘","⡙","⡚","⡛","⡜","⡝","⡞","⡟","⠠","⠡","⠢","⠣","⠤","⠥","⠦","⠧","⡠","⡡","⡢","⡣","⡤","⡥","⡦","⡧","⠨","⠩","⠪","⠫","⠬","⠭","⠮","⠯","⡨","⡩","⡪","⡫","⡬","⡭","⡮","⡯","⠰","⠱","⠲","⠳","⠴","⠵","⠶","⠷","⡰","⡱","⡲","⡳","⡴","⡵","⡶","⡷","⠸","⠹","⠺","⠻","⠼","⠽","⠾","⠿","⡸","⡹","⡺","⡻","⡼","⡽","⡾","⡿","⢀","⢁","⢂","⢃","⢄","⢅","⢆","⢇","⣀","⣁","⣂","⣃","⣄","⣅","⣆","⣇","⢈","⢉","⢊","⢋","⢌","⢍","⢎","⢏","⣈","⣉","⣊","⣋","⣌","⣍","⣎","⣏","⢐","⢑","⢒","⢓","⢔","⢕","⢖","⢗","⣐","⣑","⣒","⣓","⣔","⣕","⣖","⣗","⢘","⢙","⢚","⢛","⢜","⢝","⢞","⢟","⣘","⣙","⣚","⣛","⣜","⣝","⣞","⣟","⢠","⢡","⢢","⢣","⢤","⢥","⢦","⢧","⣠","⣡","⣢","⣣","⣤","⣥","⣦","⣧","⢨","⢩","⢪","⢫","⢬","⢭","⢮","⢯","⣨","⣩","⣪","⣫","⣬","⣭","⣮","⣯","⢰","⢱","⢲","⢳","⢴","⢵","⢶","⢷","⣰","⣱","⣲","⣳","⣴","⣵","⣶","⣷","⢸","⢹","⢺","⢻","⢼","⢽","⢾","⢿","⣸","⣹","⣺","⣻","⣼","⣽","⣾","⣿"]},"line":{"interval":130,"frames":["-","\\\\","|","/"]},"line2":{"interval":100,"frames":["⠂","-","–","—","–","-"]},"pipe":{"interval":100,"frames":["┤","┘","┴","└","├","┌","┬","┐"]},"simpleDots":{"interval":400,"frames":[".  ",".. ","...","   "]},"simpleDotsScrolling":{"interval":200,"frames":[".  ",".. ","..."," ..","  .","   "]},"star":{"interval":70,"frames":["✶","✸","✹","✺","✹","✷"]},"star2":{"interval":80,"frames":["+","x","*"]},"flip":{"interval":70,"frames":["_","_","_","-","`","`","\'","´","-","_","_","_"]},"hamburger":{"interval":100,"frames":["☱","☲","☴"]},"growVertical":{"interval":120,"frames":["▁","▃","▄","▅","▆","▇","▆","▅","▄","▃"]},"growHorizontal":{"interval":120,"frames":["▏","▎","▍","▌","▋","▊","▉","▊","▋","▌","▍","▎"]},"balloon":{"interval":140,"frames":[" ",".","o","O","@","*"," "]},"balloon2":{"interval":120,"frames":[".","o","O","°","O","o","."]},"noise":{"interval":100,"frames":["▓","▒","░"]},"bounce":{"interval":120,"frames":["⠁","⠂","⠄","⠂"]},"boxBounce":{"interval":120,"frames":["▖","▘","▝","▗"]},"boxBounce2":{"interval":100,"frames":["▌","▀","▐","▄"]},"triangle":{"interval":50,"frames":["◢","◣","◤","◥"]},"arc":{"interval":100,"frames":["◜","◠","◝","◞","◡","◟"]},"circle":{"interval":120,"frames":["◡","⊙","◠"]},"squareCorners":{"interval":180,"frames":["◰","◳","◲","◱"]},"circleQuarters":{"interval":120,"frames":["◴","◷","◶","◵"]},"circleHalves":{"interval":50,"frames":["◐","◓","◑","◒"]},"squish":{"interval":100,"frames":["╫","╪"]},"toggle":{"interval":250,"frames":["⊶","⊷"]},"toggle2":{"interval":80,"frames":["▫","▪"]},"toggle3":{"interval":120,"frames":["□","■"]},"toggle4":{"interval":100,"frames":["■","□","▪","▫"]},"toggle5":{"interval":100,"frames":["▮","▯"]},"toggle6":{"interval":300,"frames":["ဝ","၀"]},"toggle7":{"interval":80,"frames":["⦾","⦿"]},"toggle8":{"interval":100,"frames":["◍","◌"]},"toggle9":{"interval":100,"frames":["◉","◎"]},"toggle10":{"interval":100,"frames":["㊂","㊀","㊁"]},"toggle11":{"interval":50,"frames":["⧇","⧆"]},"toggle12":{"interval":120,"frames":["☗","☖"]},"toggle13":{"interval":80,"frames":["=","*","-"]},"arrow":{"interval":100,"frames":["←","↖","↑","↗","→","↘","↓","↙"]},"arrow2":{"interval":80,"frames":["⬆️ ","↗️ ","➡️ ","↘️ ","⬇️ ","↙️ ","⬅️ ","↖️ "]},"arrow3":{"interval":120,"frames":["▹▹▹▹▹","▸▹▹▹▹","▹▸▹▹▹","▹▹▸▹▹","▹▹▹▸▹","▹▹▹▹▸"]},"bouncingBar":{"interval":80,"frames":["[    ]","[=   ]","[==  ]","[=== ]","[ ===]","[  ==]","[   =]","[    ]","[   =]","[  ==]","[ ===]","[====]","[=== ]","[==  ]","[=   ]"]},"bouncingBall":{"interval":80,"frames":["( ●    )","(  ●   )","(   ●  )","(    ● )","(     ●)","(    ● )","(   ●  )","(  ●   )","( ●    )","(●     )"]},"smiley":{"interval":200,"frames":["😄 ","😝 "]},"monkey":{"interval":300,"frames":["🙈 ","🙈 ","🙉 ","🙊 "]},"hearts":{"interval":100,"frames":["💛 ","💙 ","💜 ","💚 ","❤️ "]},"clock":{"interval":100,"frames":["🕛 ","🕐 ","🕑 ","🕒 ","🕓 ","🕔 ","🕕 ","🕖 ","🕗 ","🕘 ","🕙 ","🕚 "]},"earth":{"interval":180,"frames":["🌍 ","🌎 ","🌏 "]},"material":{"interval":17,"frames":["█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁","███████▁▁▁▁▁▁▁▁▁▁▁▁▁","████████▁▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","██████████▁▁▁▁▁▁▁▁▁▁","███████████▁▁▁▁▁▁▁▁▁","█████████████▁▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁▁██████████████▁▁▁▁","▁▁▁██████████████▁▁▁","▁▁▁▁█████████████▁▁▁","▁▁▁▁██████████████▁▁","▁▁▁▁██████████████▁▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁▁██████████████","▁▁▁▁▁▁██████████████","▁▁▁▁▁▁▁█████████████","▁▁▁▁▁▁▁█████████████","▁▁▁▁▁▁▁▁████████████","▁▁▁▁▁▁▁▁████████████","▁▁▁▁▁▁▁▁▁███████████","▁▁▁▁▁▁▁▁▁███████████","▁▁▁▁▁▁▁▁▁▁██████████","▁▁▁▁▁▁▁▁▁▁██████████","▁▁▁▁▁▁▁▁▁▁▁▁████████","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁██████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","███▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","████▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","██████▁▁▁▁▁▁▁▁▁▁▁▁▁█","████████▁▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","███████████▁▁▁▁▁▁▁▁▁","████████████▁▁▁▁▁▁▁▁","████████████▁▁▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁▁▁█████████████▁▁▁▁","▁▁▁▁▁████████████▁▁▁","▁▁▁▁▁████████████▁▁▁","▁▁▁▁▁▁███████████▁▁▁","▁▁▁▁▁▁▁▁█████████▁▁▁","▁▁▁▁▁▁▁▁█████████▁▁▁","▁▁▁▁▁▁▁▁▁█████████▁▁","▁▁▁▁▁▁▁▁▁█████████▁▁","▁▁▁▁▁▁▁▁▁▁█████████▁","▁▁▁▁▁▁▁▁▁▁▁████████▁","▁▁▁▁▁▁▁▁▁▁▁████████▁","▁▁▁▁▁▁▁▁▁▁▁▁███████▁","▁▁▁▁▁▁▁▁▁▁▁▁███████▁","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁"]},"moon":{"interval":80,"frames":["🌑 ","🌒 ","🌓 ","🌔 ","🌕 ","🌖 ","🌗 ","🌘 "]},"runner":{"interval":140,"frames":["🚶 ","🏃 "]},"pong":{"interval":80,"frames":["▐⠂       ▌","▐⠈       ▌","▐ ⠂      ▌","▐ ⠠      ▌","▐  ⡀     ▌","▐  ⠠     ▌","▐   ⠂    ▌","▐   ⠈    ▌","▐    ⠂   ▌","▐    ⠠   ▌","▐     ⡀  ▌","▐     ⠠  ▌","▐      ⠂ ▌","▐      ⠈ ▌","▐       ⠂▌","▐       ⠠▌","▐       ⡀▌","▐      ⠠ ▌","▐      ⠂ ▌","▐     ⠈  ▌","▐     ⠂  ▌","▐    ⠠   ▌","▐    ⡀   ▌","▐   ⠠    ▌","▐   ⠂    ▌","▐  ⠈     ▌","▐  ⠂     ▌","▐ ⠠      ▌","▐ ⡀      ▌","▐⠠       ▌"]},"shark":{"interval":120,"frames":["▐|\\\\____________▌","▐_|\\\\___________▌","▐__|\\\\__________▌","▐___|\\\\_________▌","▐____|\\\\________▌","▐_____|\\\\_______▌","▐______|\\\\______▌","▐_______|\\\\_____▌","▐________|\\\\____▌","▐_________|\\\\___▌","▐__________|\\\\__▌","▐___________|\\\\_▌","▐____________|\\\\▌","▐____________/|▌","▐___________/|_▌","▐__________/|__▌","▐_________/|___▌","▐________/|____▌","▐_______/|_____▌","▐______/|______▌","▐_____/|_______▌","▐____/|________▌","▐___/|_________▌","▐__/|__________▌","▐_/|___________▌","▐/|____________▌"]},"dqpb":{"interval":100,"frames":["d","q","p","b"]},"weather":{"interval":100,"frames":["☀️ ","☀️ ","☀️ ","🌤 ","⛅️ ","🌥 ","☁️ ","🌧 ","🌨 ","🌧 ","🌨 ","🌧 ","🌨 ","⛈ ","🌨 ","🌧 ","🌨 ","☁️ ","🌥 ","⛅️ ","🌤 ","☀️ ","☀️ "]},"christmas":{"interval":400,"frames":["🌲","🎄"]},"grenade":{"interval":80,"frames":["،  ","′  "," ´ "," ‾ ","  ⸌","  ⸊","  |","  ⁎","  ⁕"," ෴ ","  ⁓","   ","   ","   "]},"point":{"interval":125,"frames":["∙∙∙","●∙∙","∙●∙","∙∙●","∙∙∙"]},"layer":{"interval":150,"frames":["-","=","≡"]},"betaWave":{"interval":80,"frames":["ρββββββ","βρβββββ","ββρββββ","βββρβββ","ββββρββ","βββββρβ","ββββββρ"]},"fingerDance":{"interval":160,"frames":["🤘 ","🤟 ","🖖 ","✋ ","🤚 ","👆 "]},"fistBump":{"interval":80,"frames":["🤜　　　　🤛 ","🤜　　　　🤛 ","🤜　　　　🤛 ","　🤜　　🤛　 ","　　🤜🤛　　 ","　🤜✨🤛　　 ","🤜　✨　🤛　 "]},"soccerHeader":{"interval":80,"frames":[" 🧑⚽️       🧑 ","🧑  ⚽️      🧑 ","🧑   ⚽️     🧑 ","🧑    ⚽️    🧑 ","🧑     ⚽️   🧑 ","🧑      ⚽️  🧑 ","🧑       ⚽️🧑  ","🧑      ⚽️  🧑 ","🧑     ⚽️   🧑 ","🧑    ⚽️    🧑 ","🧑   ⚽️     🧑 ","🧑  ⚽️      🧑 "]},"mindblown":{"interval":160,"frames":["😐 ","😐 ","😮 ","😮 ","😦 ","😦 ","😧 ","😧 ","🤯 ","💥 ","✨ ","　 ","　 ","　 "]},"speaker":{"interval":160,"frames":["🔈 ","🔉 ","🔊 ","🔉 "]},"orangePulse":{"interval":100,"frames":["🔸 ","🔶 ","🟠 ","🟠 ","🔶 "]},"bluePulse":{"interval":100,"frames":["🔹 ","🔷 ","🔵 ","🔵 ","🔷 "]},"orangeBluePulse":{"interval":100,"frames":["🔸 ","🔶 ","🟠 ","🟠 ","🔶 ","🔹 ","🔷 ","🔵 ","🔵 ","🔷 "]},"timeTravel":{"interval":100,"frames":["🕛 ","🕚 ","🕙 ","🕘 ","🕗 ","🕖 ","🕕 ","🕔 ","🕓 ","🕒 ","🕑 ","🕐 "]},"aesthetic":{"interval":80,"frames":["▰▱▱▱▱▱▱","▰▰▱▱▱▱▱","▰▰▰▱▱▱▱","▰▰▰▰▱▱▱","▰▰▰▰▰▱▱","▰▰▰▰▰▰▱","▰▰▰▰▰▰▰","▰▱▱▱▱▱▱"]}}'
      )
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var n = t[r]
    if (n !== undefined) {
      return n.exports
    }
    var s = (t[r] = { id: r, loaded: false, exports: {} })
    var o = true
    try {
      e[r](s, s.exports, __nccwpck_require__)
      o = false
    } finally {
      if (o) delete t[r]
    }
    s.loaded = true
    return s.exports
  }
  ;(() => {
    __nccwpck_require__.nmd = (e) => {
      e.paths = []
      if (!e.children) e.children = []
      return e
    }
  })()
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(327)
  module.exports = r
})()