
import { parse } from './fsw-parse';

it('should parse a symbol', () => {
  expect(parse.symbol('S10000')).toEqual({ symbol: 'S10000' })
})

it('should parse a symbol with coordinate', () => {
  expect(parse.symbol('S10000500x500')).toEqual({ symbol: 'S10000', coord: [500, 500] })
})

it('should parse a symbol with style', () => {
  expect(parse.symbol('S10000-C')).toEqual({ symbol: 'S10000', style: '-C' })
})

it('should not break on invalid symbol key or input', () => {
  expect(parse.symbol()).toEqual({})
  expect(parse.symbol('a')).toEqual({})
  expect(parse.symbol({ 'a': 5 })).toEqual({})
  expect(parse.symbol(['a'])).toEqual({})
})

it('should parse an empty signbox', () => {
  expect(parse.sign('M500x500')).toEqual({
    box: 'M',
    max: [500, 500]
  })
})

it('should parse a plain signbox', () => {
  expect(parse.sign('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')).toEqual({
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
  })
})

it('should parse a prefixed signbox', () => {
  expect(parse.sign('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')).toEqual({
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
  })
})

it('should parse a prefixed signbox with style', () => {
  expect(parse.sign('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475-C')).toEqual({
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
  })
})

it('should not break on invalid sign or input', () => {
  expect(parse.sign()).toEqual({})
  expect(parse.sign('a')).toEqual({})
  expect(parse.sign({ 'a': 5 })).toEqual({})
  expect(parse.sign(['a'])).toEqual({})
})

it('should parse a text', () => {
  expect(parse.text('AS14c20S27106M518x529S14c20481x471S27106503x489 AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496')).toEqual([
    'AS14c20S27106M518x529S14c20481x471S27106503x489',
    'AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468',
    'S38800464x496'
  ])
})

it('should parse a text with style', () => {
  expect(parse.text('AS14c20S27106M518x529S14c20481x471S27106503x489-C AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496-Z2')).toEqual([
    'AS14c20S27106M518x529S14c20481x471S27106503x489-C',
    'AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468',
    'S38800464x496-Z2'
  ])
})

it('should not break on invalid text or input', () => {
  expect(parse.text()).toEqual([])
  expect(parse.text('a')).toEqual([])
  expect(parse.text({ 'a': 5 })).toEqual([])
  expect(parse.text(['a'])).toEqual([])
})
