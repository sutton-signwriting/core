
import { compose } from './fsw-compose';

it('should compose a symbol', () => {
  expect(compose.symbol({ symbol: 'S10000' })).toEqual('S10000')
})

it('should compose a symbol with coordinate', () => {
  expect(compose.symbol({ symbol: 'S10000', coord: [500, 500] })).toEqual('S10000500x500')
  expect(compose.symbol({ symbol: 'S10000', coord: ["500", "500"] })).toEqual('S10000500x500')
})

it('should compose a symbol with style', () => {
  expect(compose.symbol({ symbol: 'S10000', style: '-C' })).toEqual('S10000-C')
})

it('should not break on invalid symbol key or bad input', () => {
  expect(compose.symbol({})).toEqual(undefined)
  expect(compose.symbol({ symbol: "xxx" })).toEqual(undefined)
  expect(compose.symbol({ symbol: "S10000", style: "asdf" })).toEqual('S10000')
  expect(compose.symbol({ symbol: "S10000", style: { style: false } })).toEqual('S10000')
  expect(compose.symbol({ symbol: "S10000", coord: "500x500", style: "-CW" })).toEqual('S10000-C')
  expect(compose.symbol({ symbol: "S10000", coord: [0, 0], style: "-CW" })).toEqual('S10000-C')
  expect(compose.symbol({ symbol: "S10000", coord: { x: 0, y: 0 }, style: "-CW" })).toEqual('S10000-C')
  expect(compose.symbol({ symbol: "S10000", coord: [{ x: 0 }, { y: 0 }], style: "-CW" })).toEqual('S10000-C')
  expect(compose.symbol({ symbol: "S10000", coord: [500], style: "-CW" })).toEqual('S10000-C')
  expect(compose.symbol('a')).toEqual(undefined)
  expect(compose.symbol({ 'a': 5 })).toEqual(undefined)
  expect(compose.symbol(['a'])).toEqual(undefined)
})

it('should compose an empty signbox', () => {
  expect(compose.sign({
    box: 'M',
    max: [500, 500]
  })).toEqual('M500x500')
})

it('should compose a plain signbox', () => {
  expect(compose.sign({
    box: 'M',
    max: [525, 535],
    spatials: [
      {
        symbol: 'S2e748',
        coord: [483, 510]
      },

      {
        symbol: 'S10011',
        coord: [501, 466]
      },

      {
        symbol: 'S2e704',
        coord: [510, 500]
      },

      {
        symbol: 'S10019',
        coord: [476, 475]
      }
    ]
  })).toEqual('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
})

it('should compose a prefixed signbox', () => {
  expect(compose.sign({
    sequence: ['S10011', 'S10019', 'S2e704', 'S2e748'],
    box: 'M',
    max: [525, 535],
    spatials: [
      {
        symbol: 'S2e748',
        coord: [483, 510]
      },

      {
        symbol: 'S10011',
        coord: [501, 466]
      },

      {
        symbol: 'S2e704',
        coord: [510, 500]
      },

      {
        symbol: 'S10019',
        coord: [476, 475]
      }
    ]
  })).toEqual('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
})

it('should compose a prefixed signbox with style', () => {
  expect(compose.sign({
    sequence: ['S10011', 'S10019', 'S2e704', 'S2e748'],
    box: 'M',
    max: [525, 535],
    spatials: [
      {
        symbol: 'S2e748',
        coord: [483, 510]
      },
      {
        symbol: 'S10011',
        coord: [501, 466]
      },
      {
        symbol: 'S2e704',
        coord: [510, 500]
      },
      {
        symbol: 'S10019',
        coord: [476, 475]
      }
    ],
    style: '-C'
  })).toEqual('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-C')
})

it('should not break on invalid sign or input', () => {
  expect(compose.sign({ box: ['M'], coord: '500x500' })).toEqual(undefined)
  expect(compose.sign({})).toEqual(undefined)
  expect(compose.sign('a')).toEqual(undefined)
  expect(compose.sign({ 'a': 5 })).toEqual(undefined)
  expect(compose.sign(['a'])).toEqual(undefined)
})
