
import { columnDefaultsMerge, columns } from './swu-columns';
import { sample } from './swu-sample';

it('should return the column defaults', () => {
  expect(columnDefaultsMerge()).toEqual({
    "height": 500,
    "width": 150,
    "offset": 50,
    "pad": 20,
    "margin": 5,
    "dynamic": false,
    "punctuation": {
      "pad": 30,
      "pull": true,
      "spacing": true
    },
    "style": {
      "detail": [
        "black",
        "white"
      ],
      "zoom": 1
    }
  })
})

it('should merge top level with the column defaults', () => {
  expect(columnDefaultsMerge({width:200})).toEqual({
    "height": 500,
    "width": 200,
    "offset": 50,
    "pad": 20,
    "margin": 5,
    "dynamic": false,
    "punctuation": {
      "pad": 30,
      "pull": true,
      "spacing": true
    },
    "style": {
      "detail": [
        "black",
        "white"
      ],
      "zoom": 1
    }
  })
})

it('should merge deep level with the column defaults', () => {
  expect(columnDefaultsMerge({punctuation:{pad:20},width:200})).toEqual({
    "height": 500,
    "width": 200,
    "offset": 50,
    "pad": 20,
    "margin": 5,
    "dynamic": false,
    "punctuation": {
      "pad": 20,
      "pull": true,
      "spacing": true
    },
    "style": {
      "detail": [
        "black",
        "white"
      ],
      "zoom": 1
    }
  })
  expect(columnDefaultsMerge({style:{background:"555"},width:200})).toEqual({
    "height": 500,
    "width": 200,
    "offset": 50,
    "pad": 20,
    "margin": 5,
    "dynamic": false,
    "punctuation": {
      "pad": 30,
      "pull": true,
      "spacing": true
    },
    "style": {
      "detail": [
        "black",
        "white"
      ],
      "zoom": 1,
      "background": "555"
    }
  })
})

it('should return an array of columns', () => {
  let helloWorld = sample.helloWorld;
  expect(columns(helloWorld)).toEqual({
    "options": {
      "height": 500,
      "width": 150,
      "offset": 50,
      "pad": 20,
      "margin": 5,
      "dynamic": false,
      "punctuation": {
        "pad": 30,
        "pull": true,
        "spacing": true
      },
      "style": {
        "detail": [
          "black",
          "white"
        ],
        "zoom": 1
      }
    },
    "widths": [150],
    "columns": [
      [
        {
          "x": 56,
          "y": 20,
          "minX": 481,
          "minY": 471,
          "width": 37,
          "height": 58,
          "lane": 0,
          "padding": 0,
          "segment": "sign",
          "text": "𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻",
          "zoom": 1
        },
        {
          "x": 57,
          "y": 118,
          "minX": 482,
          "minY": 468,
          "width": 36,
          "height": 65,
          "lane": 0,
          "padding": 0,
          "segment": "sign",
          "text": "𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦",
          "zoom": 1
        },
        {
          "x": 39,
          "y": 203,
          "minX": 464,
          "minY": 496,
          "width": 72,
          "height": 8,
          "lane": 0,
          "padding": 0,
          "segment": "symbol",
          "text": "񏌁𝣢𝤂",
          "zoom": 1
        }
      ]
    ]
  })
})

it('should not break columns on bad swu input', () => {
  expect(columns()).toEqual({})
  expect(columns(5)).toEqual({})
  expect(columns(['what'])).toEqual({})
})
