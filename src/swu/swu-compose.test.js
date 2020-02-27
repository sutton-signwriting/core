
import { compose } from './swu-compose';

it('should compose a symbol', () => {
  expect(compose.symbol({ symbol: '񀀁' })).toEqual('񀀁')
})

it('should compose a symbol with coordinate', () => {
  expect(compose.symbol({ symbol: '񀀁', coord: [500, 500] })).toEqual('񀀁𝤆𝤆')
})

it('should compose a symbol with style', () => {
  expect(compose.symbol({ symbol: '񀀁', style: '-C' })).toEqual('񀀁-C')
})

it('should not break on invalid symbol key or input', () => {
  expect(compose.symbol()).toEqual(undefined)
  expect(compose.symbol('a')).toEqual(undefined)
  expect(compose.symbol({ 'a': 5 })).toEqual(undefined)
  expect(compose.symbol(['a'])).toEqual(undefined)
})

it('should compose an empty signbox', () => {
  expect(compose.sign({
    box: '𝠃',
    max: [500, 500]
  })).toEqual('𝠃𝤆𝤆')
})

it('should compose a plain signbox', () => {
  expect(compose.sign({
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
  })).toEqual('𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
})


it('should compose a prefixed signbox', () => {
  expect(compose.sign({
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
  })).toEqual('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
})

it('should compose a prefixed signbox with style', () => {
  expect(compose.sign({
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
  })).toEqual('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-C')
})

it('should not break on invalid sign or input', () => {
  expect(compose.sign()).toEqual(undefined)
  expect(compose.sign('a')).toEqual(undefined)
  expect(compose.sign({ 'a': 5 })).toEqual(undefined)
  expect(compose.sign(['a'])).toEqual(undefined)
})
