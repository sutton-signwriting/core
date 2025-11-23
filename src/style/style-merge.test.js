
import { merge } from './style-merge';

it('should merge style object', () => {
  expect(merge({'colorize': true},{zoom:2})).toEqual({
      'colorize': true,
      'zoom': 2
    });
})

it('should merge style zoom of x', () => {
  expect(merge({'colorize': true},{zoom:'x'})).toEqual({
      'colorize': true,
      'zoom': 1
    });
})

it('should merge style zoom of x', () => {
  expect(merge({'colorize': true, 'zoom': 2},{'zoom':'x'})).toEqual({
      'colorize': true,
      'zoom': 2
    });
})


it('should merge without breaking on bad data', () => {
  expect(merge()).toEqual({
    'zoom': 1
  });
  expect(merge(undefined)).toEqual({
    'zoom': 1
  });
  expect(merge("S10000500x500-CZ5")).toEqual({
    'zoom': 1
  });
})
