
import { encode, decode, pair, parse } from './swu-parse';

it('should parse a symbol', () => {
  expect(parse.symbol('񀀁')).toEqual({ symbol: '񀀁' })
})

it('should parse a symbol with coordinate', () => {
  expect(parse.symbol('񀀁𝤆𝤆')).toEqual({ symbol: '񀀁', coord: [500, 500] })
})

it('should parse a symbol with style', () => {
  expect(parse.symbol('񀀁-C')).toEqual({ symbol: '񀀁', style: '-C' })
})

it('should not break on invalid symbol key or input', () => {
  expect(parse.symbol()).toEqual({})
  expect(parse.symbol('a')).toEqual({})
  expect(parse.symbol({ 'a': 5 })).toEqual({})
  expect(parse.symbol(['a'])).toEqual({})
})

it('should parse an empty signbox', () => {
  expect(parse.sign('𝠃𝤆𝤆')).toEqual({
    box: '𝠃',
    max: [500, 500]
  })
})

it('should parse a plain signbox', () => {
  expect(parse.sign('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')).toEqual({
    box: '𝠃',
    max: [525, 535],
    spatials: [
      {
        symbol: '񋛩',
        coord: [483, 510]
      },

      {
        symbol: '񀀒',
        coord: [501, 466]
      },

      {
        symbol: '񋚥',
        coord: [510, 500]
      },

      {
        symbol: '񀀚',
        coord: [476, 475]
      }
    ]
  })
})


it('should parse a prefixed signbox', () => {
  expect(parse.sign('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')).toEqual({
    sequence: ['񀀒', '񀀚', '񋚥', '񋛩'],
    box: '𝠃',
    max: [525, 535],
    spatials: [
      {
        symbol: '񋛩',
        coord: [483, 510]
      },

      {
        symbol: '񀀒',
        coord: [501, 466]
      },

      {
        symbol: '񋚥',
        coord: [510, 500]
      },

      {
        symbol: '񀀚',
        coord: [476, 475]
      }
    ]
  })
})

it('should parse a prefixed signbox with style', () => {
  expect(parse.sign('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C')).toEqual({
    sequence: ['񀀒', '񀀚', '񋚥', '񋛩'],
    box: '𝠃',
    max: [525, 535],
    spatials: [
      {
        symbol: '񋛩',
        coord: [483, 510]
      },

      {
        symbol: '񀀒',
        coord: [501, 466]
      },

      {
        symbol: '񋚥',
        coord: [510, 500]
      },

      {
        symbol: '񀀚',
        coord: [476, 475]
      }
    ],
    style: '-C'
  })
})

it('should not break on invalid sign or input', () => {
  expect(parse.sign()).toEqual({})
  expect(parse.sign('a')).toEqual({})
  expect(parse.sign({ 'a': 5 })).toEqual({})
  expect(parse.sign(['a'])).toEqual({})
})

it('should parse a text', () => {
  expect(parse.text('𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂')).toEqual([
    '𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻',
    '𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦',
    '񏌁𝣢𝤂'
  ])
})

it('should parse a text with style', () => {
  expect(parse.text('𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻-C 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂-Z2')).toEqual([
    '𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻-C',
    '𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦',
    '񏌁𝣢𝤂-Z2'
  ])
})

it('should not break on invalid text or input', () => {
  expect(parse.text()).toEqual([])
  expect(parse.text('a')).toEqual([])
  expect(parse.text({ 'a': 5 })).toEqual([])
  expect(parse.text(['a'])).toEqual([])
})

it('should encode swu characters', () => {
  expect(encode('񀀁𝤆𝤆')).toBe('\\uD8C0\\uDC01\\uD836\\uDD06\\uD836\\uDD06');
})

it('should decode swu characters', () => {
  expect(decode('\\uD8C0\\uDC01\\uD836\\uDD06\\uD836\\uDD06')).toBe('񀀁𝤆𝤆');
})

it('should return the utf-16 pair for a swu char', () => {
  expect(pair('񀀁')).toEqual(['D8C0', 'DC01']);
})
