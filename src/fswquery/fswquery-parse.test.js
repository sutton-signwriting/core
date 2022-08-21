
import { parse } from './fswquery-parse';

it('should parse generic queries', () => {
  expect(parse('Q')).toEqual({
    query: true
  })
  expect(parse('Q-')).toEqual({
    query: true,
    style: true
  })
})

it('should parse prefix queries', () => {
  expect(parse('QT')).toEqual({
    query: true,
    prefix: { required: true }
  })
  expect(parse('QT-')).toEqual({
    query: true,
    prefix: { required: true },
    style: true
  })
  expect(parse('QAS10000R100t204S20500T')).toEqual({
    query: true,
    prefix: {
      required: true,
      parts: [
        'S10000',
        ['100', '204'],
        'S20500'
      ]
    }
  })
  expect(parse('QAS10000R100t204oS20500T')).toEqual({
    query: true,
    prefix: {
      required: true,
      parts: [
        'S10000',
        [
          'or',
          ['100', '204'],
          'S20500'
        ]
      ]
    }
  })
})

it('should parse signbox queries', () => {
  expect(parse('QS20000')).toEqual({
    query: true,
    signbox: [
      { symbol: 'S20000' }
    ]
  })
  expect(parse('QS20000500x500')).toEqual({
    query: true,
    signbox: [
      {
        symbol: 'S20000',
        coord: [500, 500]
      }
    ]
  })
  expect(parse('QR100t105')).toEqual({
    query: true,
    signbox: [
      { range: ['100', '105'] }
    ]
  })
  expect(parse('QR100t105500x500')).toEqual({
    query: true,
    signbox: [
      {
        range: ['100', '105'],
        coord: [500, 500]
      }
    ]
  })
  expect(parse('QS20000R100t105500x500')).toEqual({
    query: true,
    signbox: [
      { symbol: 'S20000' },
      {
        range: ['100', '105'],
        coord: [500, 500]
      }
    ]
  })
  expect(parse('QS20000oR100t105500x500')).toEqual({
    query: true,
    signbox: [
      {
        or: [
          'S20000',
          ['100', '105']
        ],
        coord: [500, 500]
      }
    ]
  })
})

it('should parse full example', () => {
  expect(parse('QAS10000R100t204S20500TS20000R100t105500x500V5-')).toEqual({
    query: true,
    prefix: {
      required: true,
      parts: [
        'S10000',
        ['100', '204'],
        'S20500'
      ]
    },
    signbox: [
      { symbol: 'S20000' },
      {
        range: ['100', '105'],
        coord: [500, 500]
      }
    ],
    variance: 5,
    style: true
  })
})


it('should parse complex example', () => {
  expect(parse('QAS10000S10500oS20500oR2fft304TS100uuR205t206oS207uu510x510V5')).toEqual({
  })
})

it('should not break on invalid sign or input', () => {
  expect(parse()).toEqual({})
  expect(parse('a')).toEqual({})
  expect(parse({ 'a': 5 })).toEqual({})
  expect(parse(['a'])).toEqual({})
})
