const fetch = (..._0x54df0d) =>
    import('node-fetch').then(({ default: _0x2dd3bc }) =>
      _0x2dd3bc(..._0x54df0d)
    ),
  APIs = {
    1: 'https://apkcombo.com',
    2: 'apk-dl.com',
    3: 'https://apk.support',
    4: 'https://apps.evozi.com/apk-downloader',
    5: 'http://ws75.aptoide.com/api/7',
    6: 'https://cafebazaar.ir',
  },
  Proxy = (_0x51d2dc) =>
    _0x51d2dc
      ? 'https://translate.google.com/translate?sl=en&tl=fr&hl=en&u=' +
        encodeURIComponent(_0x51d2dc) +
        '&client=webapp'
      : '',
  api = (_0x243e2e, _0x5e2cfc = '/', _0x1e3e47 = {}) =>
    (_0x243e2e in APIs ? APIs[_0x243e2e] : _0x243e2e) +
    _0x5e2cfc +
    (_0x1e3e47
      ? '?' + new URLSearchParams(Object.entries({ ..._0x1e3e47 }))
      : '')
module.exports = {
  APIs: APIs,
  Proxy: Proxy,
  api: api,
}
