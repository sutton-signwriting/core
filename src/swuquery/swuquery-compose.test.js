
import { compose } from './swuquery-compose';

it('should pass', () => {
  expect(true).toBe(true);
})

it('should compose generic queries', () => {
  expect(compose({
    query: true
  })).toBe('Q');
  expect(compose({
    query: true,
    style: true
  })).toBe('Q-');
})

it('should compose prefix queries', () => {
  expect(compose({
    query: true,
    prefix: { required: true }
  })).toBe('QT');
  expect(compose({
    query: true,
    prefix: { required: true },
    style: true
  })).toBe('QT-');
  expect(compose({
    query: true,
    prefix: {
      required: true,
      parts: [
        '񀀁',
        ['񀀁', '񆆑'],
        '񆇡'
      ]
    }
  })).toBe('QA񀀁R񀀁񆆑񆇡T');
  expect(compose({
    query: true,
    prefix: {
      required: true,
      parts: [
        [
          'or',
          '񀀁',
          ['񀀁', '񆆑']
        ],
        '񆇡'
      ]
    }
  })).toBe('QA񀀁oR񀀁񆆑񆇡T');
})

it('should compose signbox queries', () => {
  expect(compose({
    query: true,
    signbox: [
      { symbol: '񆀁' }
    ]
  })).toBe('Q񆀁');
  expect(compose({
    query: true,
    signbox: [
      {
        symbol: '񆀁fr',
        coord: [500, 500]
      }
    ]
  })).toBe('Q񆀁fr𝤆𝤆');
  expect(compose({
    query: true,
    signbox: [
      {
        symbol: '񆀁fr',
        coord: [500, 500]
      }
    ],
    variance: 5
  })).toBe('Q񆀁fr𝤆𝤆V5');
  expect(compose({
    query: true,
    signbox: [
      { range: ['񀀁', '񀇡'] }
    ]
  })).toBe('QR񀀁񀇡');
  expect(compose({
    query: true,
    signbox: [
      {
        range: ['񀀁', '񀇡'],
        coord: [500, 500]
      }
    ]
  })).toBe('QR񀀁񀇡𝤆𝤆');
  expect(compose({
    query: true,
    signbox: [
      { symbol: '񆀁r' },
      {
        range: ['񀀁', '񀇡'],
        coord: [500, 500]
      }
    ]
  })).toBe('Q񆀁rR񀀁񀇡𝤆𝤆');
  expect(compose({
    query: true,
    signbox: [
      {
        or: [
          '񆀁r',
          ['񀀁', '񀇡']
        ],
        coord: [500, 500]
      }
    ]
  })).toBe('Q񆀁roR񀀁񀇡𝤆𝤆');
})

it('should not break on invalid input', () => {
  expect(compose()).toBe(undefined);
  expect(compose('a')).toBe(undefined);
  expect(compose({ 'a': 5 })).toBe(undefined);
  expect(compose(['a'])).toBe(undefined);
})

it('should not break on mangled input', () => {
  expect(compose({
    query: true,
    prefix: {
      required: true,
      parts: [
        'x',
        ['100', '204'],
        'S20500'
      ]
    }
  })).toBe('Q');
  expect(compose({
    query: true,
    prefix: {
      required: true,
      parts: [
        ['444', '204'],
        'S20500'
      ]
    }
  })).toBe('Q');
  expect(compose({
    query: true,
    prefix: {
      required: true,
      parts: 'xx'
    }
  })).toBe('QT');
  expect(compose({
    query: true,
    prefix: {
      required: true,
      parts: [{ a: 'xx' }]
    }
  })).toBe('Q');
  expect(compose({
    query: true,
    signbox: [
      { symbolx: 'S20000' },
      {
        rangex: ['100', '105'],
        coord: [500, 500]
      }
    ]
  })).toBe('Q');
  expect(compose({
    query: true,
    signbox: [
      { symbol: 'x' },
      {
        rangex: ['100', '105'],
        coord: [500, 500]
      }
    ]
  })).toBe('Q');
})
