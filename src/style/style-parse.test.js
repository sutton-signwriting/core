
import { parse } from './style-parse';

it('should parse style strings', () => {
  expect(parse('-')).toEqual({
  });
  expect(parse('-CP10G_blue_D_red,Cyan_')).toEqual({
    'colorize': true,
    'padding': 10,
    'background': 'blue',
    'detail': ['red', 'Cyan']
  });
  expect(parse('-Zx')).toEqual({
    'zoom': 'x'
  });
  expect(parse('-G_eee_D_fff_-D01_aaa,bababa_')).toEqual({
    'background': '#eee',
    'detail': ['#fff'],
    'detailsym': [
      {
        'index': 1,
        'detail': ['#aaa', '#bababa']
      }
    ]
  });
  expect(parse('--D01_yellow_')).toEqual({
    'detailsym': [
      {
        'index': 1,
        'detail': ['yellow']
      }
    ]
  });
  expect(parse('---myclass!')).toEqual({
    'classes': 'myclass'
  });
  expect(parse('---!myid!')).toEqual({
    'id': 'myid'
  });
  expect(parse('-CP10G_blue_D_red,Cyan_Z1.1-D01_blue_D02_yellow,green_Z01,10,500x500Z02,5.5-primary blinking!cursor!')).toEqual({
    'colorize': true,
    'padding': 10,
    'background': 'blue',
    'detail': ['red', 'Cyan'],
    'zoom': 1.1,
    'detailsym': [
      {
        'index': 1,
        'detail': ['blue']
      },
      {
        'index': 2,
        'detail': ['yellow', 'green']
      }
    ],
    'zoomsym': [
      {
        'index': 1,
        'zoom': 10,
        'offset': [0, 0]
      },
      {
        'index': 2,
        'zoom': 5.5
      }
    ],
    'classes': 'primary blinking',
    'id': 'cursor'
  });
})

it('should parse without breaking on bad data', () => {
  expect(parse()).toEqual({
  });
  expect(parse(undefined)).toEqual({
  });
  expect(parse("S10000500x500-CZ5")).toEqual({
  });
  expect(parse(['-Zx'])).toEqual({
  });
  expect(parse({ "this": "that" })).toEqual({
  });
})
