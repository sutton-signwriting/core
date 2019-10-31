
import { compose } from './fswquery-compose';
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
        'S10000',
        ['100', '204'],
        'S20500'
      ]
    }
  })).toBe('QAS10000R100t204S20500T');
})

it('should compose signbox queries', () => {
  expect(compose({
    query: true,
    signbox: [
      { symbol: 'S20000' }
    ]
  })).toBe('QS20000');
  expect(compose({
    query: true,
    signbox: [
      {
        symbol: 'S20000',
        coord: [500, 500]
      }
    ]
  })).toBe('QS20000500x500');
  expect(compose({
    query: true,
    signbox: [
      { range: ['100', '105'] }
    ]
  })).toBe('QR100t105');
  expect(compose({
    query: true,
    signbox: [
      {
        range: ['100', '105'],
        coord: [500, 500]
      }
    ]
  })).toBe('QR100t105500x500');
  expect(compose({
    query: true,
    signbox: [
      { symbol: 'S20000' },
      {
        range: ['100', '105'],
        coord: [500, 500]
      }
    ]
  })).toBe('QS20000R100t105500x500');
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
