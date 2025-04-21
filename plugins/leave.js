const { cmd } = require('../command'),
  { sleep } = require('../lib/functions')
cmd(
  {
    pattern: 'leave',
    alias: ['left', 'leftgc', 'leavegc'],
    desc: 'Leave the group',
    react: '\uD83C\uDF89',
    category: 'owner',
    filename: __filename,
  },
  async (
    _0x10dbb6,
    _0x33144,
    _0x4cb242,
    {
      from: _0x5bba46,
      quoted: _0x258050,
      body: _0x63fb2e,
      isCmd: _0x14cbb6,
      command: _0x4de0cc,
      args: _0x4ab610,
      q: _0x316b2e,
      isGroup: _0x25f576,
      senderNumber: _0x46cb8f,
      reply: _0x27cabd,
    }
  ) => {
    try {
      if (!_0x25f576) {
        return _0x27cabd('This command can only be used in groups.')
      }
      const _0x567aa8 = _0x10dbb6.user.id.split(':')[0]
      if (_0x46cb8f !== _0x567aa8) {
        return _0x27cabd('Only the bot owner can use this command.')
      }
      _0x27cabd('Leaving group...')
      await sleep(1500)
      await _0x10dbb6.groupLeave(_0x5bba46)
      _0x27cabd('Goodbye! \uD83D\uDC4B')
    } catch (_0x2028e8) {
      console.error(_0x2028e8)
      _0x27cabd('\u274C Error: ' + _0x2028e8)
    }
  }
)
