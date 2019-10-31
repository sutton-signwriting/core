
import { parse } from './swuquery-parse';

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
  expect(parse('QA񀀁R񀀁񆆑񆇡T')).toEqual({
    query: true,
    prefix: {
      required: true,
      parts: [
        '񀀁',
        ['񀀁', '񆆑'],
        '񆇡'
      ]
    }
  })
})

it('should parse signbox queries', () => {
  expect(parse('Q񆀁')).toEqual({
    query: true,
    signbox: [
      { symbol: '񆀁' }
    ]
  })
  expect(parse('Q񆀁fr𝤆𝤆')).toEqual({
    query: true,
    signbox: [
      {
        symbol: '񆀁fr',
        coord: [500, 500]
      }
    ]
  })
  expect(parse('QR񀀁񀇡')).toEqual({
    query: true,
    signbox: [
      { range: ['񀀁', '񀇡'] }
    ]
  })
  expect(parse('QR񀀁񀇡𝤆𝤆')).toEqual({
    query: true,
    signbox: [
      {
        range: ['񀀁', '񀇡'],
        coord: [500, 500]
      }
    ]
  })
  expect(parse('Q񆀁rR񀀁񀇡𝤆𝤆')).toEqual({
    query: true,
    signbox: [
      { symbol: '񆀁r' },
      {
        range: ['񀀁', '񀇡'],
        coord: [500, 500]
      }
    ]
  })
})

it('should not break on invalid sign or input', () => {
  expect(parse()).toEqual({})
  expect(parse('a')).toEqual({})
  expect(parse({ 'a': 5 })).toEqual({})
  expect(parse(['a'])).toEqual({})
})
