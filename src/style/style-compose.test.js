
import { compose } from './style-compose';

it('should compose style strings', () => {
  expect(compose({})).toBe('-');
  expect(compose({
    'colorize': true,
    'padding': 10,
    'background': 'blue',
    'detail': ['red', 'Cyan']
  })).toBe('-CP10G_blue_D_red,Cyan_');
  expect(compose({
    'detailsym': [
      {
        'index': 1,
        'detail': ['yellow']
      }
    ]
  })).toBe('--D01_yellow_');
  expect(compose({
    'zoom': 'x'
  })).toBe('-Zx');
  expect(compose({
    'background': '#eee',
    'detail': ['#fff'],
    'detailsym': [
      {
        'index': 1,
        'detail': ['#aaa', '#bababa']
      }
    ]
  })).toBe('-G_eee_D_fff_-D01_aaa,bababa_');
  expect(compose({
    'classes': 'myclass'
  })).toBe('---myclass!');
  expect(compose({
    'id': 'myid'
  })).toBe('---!myid!');
  expect(compose({
    'colorize': true,
    'padding': 10,
    'background': 'blue',
    'detail': ['red', 'Cyan'],
    'zoom': 1.1,
    'detailsym': [
      {
        'index': 1,
        'detail': ['#ff00ff']
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
  })).toBe('-CP10G_blue_D_red,Cyan_Z1.1-D01_ff00ff_D02_yellow,green_Z01,10,500x500Z02,5.5-primary blinking!cursor!');
})

it('should compose without breaking on bad data', () => {
  expect(compose({
    'colorize': 'C',
    'padding': -1,
    'background': '$color',
    'detail': 'red',
    'zoom': -2,
    'detailsym':
    {
      'index': 0,
      'detail': 'green'
    },
    'zoomsym':
    {
      'index': 'a',
      'zoom': 'b',
      'offset': '500x500'
    },
    'classes': '%ox',
    'id': 'my@'
  })).toBe('-CG_color_D_r,e_--ox!my!');
  expect(compose({
    'padding': 'a',
    'background': 5,
    'detail': [1],
    'zoom': "B",
    'detailsym': [0, 'green'],
    'zoomsym': ["index", [0]],
    'classes': ['%ox'],
    'id': { 'index': 'what?' }
  })).toBe('-');
  expect(compose({
    'padding': [3, 5],
    'background': ['yellow'],
    'detail': { 'a': 5 },
    'zoom': [1],
    'detailsym': [0, 'green'],
    'id': 6
  })).toBe('-P03Z1');
})
