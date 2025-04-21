const fetch = (..._0x537ac8) =>
    import('node-fetch').then(({ default: _0x4b9247 }) =>
      _0x4b9247(..._0x537ac8)
    ),
  cheerio = require('cheerio'),
  tools = require('../lib/Config')
async function search(_0x341843) {
  let _0x4d2119 = await fetch(
      tools.api(5, '/apps/search', {
        query: _0x341843,
        limit: 1000,
      })
    ),
    _0x1bfba3 = {}
  return (
    (_0x4d2119 = await _0x4d2119.json()),
    (_0x1bfba3 = _0x4d2119.datalist.list.map((_0x4be377) => {
      return {
        name: _0x4be377.name,
        id: _0x4be377.package,
      }
    })),
    _0x1bfba3
  )
}
async function download(_0x1dbab6) {
  let _0x538865 = await fetch(
    tools.api(5, '/apps/search', {
      query: _0x1dbab6,
      limit: 1,
    })
  )
  _0x538865 = await _0x538865.json()
  let _0xcb2aca = _0x538865.datalist.list[0].name,
    _0x9fc6c2 = _0x538865.datalist.list[0].package,
    _0x5cca93 = _0x538865.datalist.list[0].icon,
    _0x158360 = _0x538865.datalist.list[0].file.path,
    _0xc1ff2a = _0x538865.datalist.list[0].updated
  return {
    name: _0xcb2aca,
    lastup: _0xc1ff2a,
    package: _0x9fc6c2,
    icon: _0x5cca93,
    dllink: _0x158360,
  }
}
module.exports = {
  search: search,
  download: download,
}
