import { parse } from './swu-parse';
import { info } from './swu-info';

const columnDefaults = {
  'height': 500,
  'width': 150,
  'offset': 50,
  'pad': 20,
  'margin': 5,
  'dynamic': false,
  'background': undefined,
  'punctuation': {
    'spacing': true,
    'pad': 30,
    'pull': true
  },
  'style':{
    'detail': ['black','white'],
    'zoom': 1
  }
}

/**
 * Function to an object of column options with default values
 * 
 * @function swu.columnDefaultsMerge
 * @param {ColumnOptions} options - object of column options
 * @returns {ColumnOptions} object of column options merged with column defaults
 * @example
 * swu.columnDefaultsMerge({height: 500,width:150})
 * 
 * return {
 *   "height": 500,
 *   "width": 150,
 *   "offset": 50,
 *   "pad": 20,
 *   "margin": 5,
 *   "dynamic": false,
 *   "punctuation": {
 *     "spacing": true,
 *     "pad": 30,
 *     "pull": true
 *   },
 *   "style": {
 *     "detail": [
 *       "black",
 *       "white"
 *     ],
 *     "zoom": 1
 *   }
 * }
 */
const columnDefaultsMerge = (options) => {
  if (typeof options !== 'object') options = {};
  return {
    ...columnDefaults,
    ...options,
    punctuation: {
      ...columnDefaults.punctuation,
      ...options.punctuation
    },
    style: {
      ...columnDefaults.style,
      ...options.style
    }
  }
}

/**
 * Function to transform an SWU text to an array of columns
 * 
 * @function swu.columns
 * @param {string} swuText - SWU text of signs and punctuation
 * @param {ColumnOptions} options - object of column options
 * @returns {{options:ColumnOptions,widths:number[],columns:ColumnData}} object of column options, widths array, and column data
 * @example
 * swu.columns('𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂', {height: 500,width:150})
 * 
 * return {
 *   "options": {
 *     "height": 500,
 *     "width": 150,
 *     "offset": 50,
 *     "pad": 20,
 *     "margin": 5,
 *     "dynamic": false,
 *     "punctuation": {
 *       "spacing": true,
 *       "pad": 30,
 *       "pull": true
 *     },
 *     "style": {
 *       "detail": [
 *         "black",
 *         "white"
 *       ],
 *       "zoom": 1
 *     }
 *   },
 *   "widths": [
 *     150
 *   ],
 *   "columns": [
 *     [
 *       {
 *         "x": 56,
 *         "y": 20,
 *         "minX": 481,
 *         "minY": 471,
 *         "width": 37,
 *         "height": 58,
 *         "lane": 0,
 *         "padding": 0,
 *         "segment": "sign",
 *         "text": "𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻",
 *         "zoom": 1
 *       },
 *       {
 *         "x": 57,
 *         "y": 118,
 *         "minX": 482,
 *         "minY": 468,
 *         "width": 36,
 *         "height": 65,
 *         "lane": 0,
 *         "padding": 0,
 *         "segment": "sign",
 *         "text": "𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦",
 *         "zoom": 1
 *       },
 *       {
 *         "x": 39,
 *         "y": 203,
 *         "minX": 464,
 *         "minY": 496,
 *         "width": 72,
 *         "height": 8,
 *         "lane": 0,
 *         "padding": 0,
 *         "segment": "symbol",
 *         "text": "񏌁𝣢𝤂",
 *         "zoom": 1
 *       }
 *     ]
 *   ]
 * }
 */
 const columns = (swuText, options) => {
  if (typeof swuText !== 'string') return {};
  const values = columnDefaultsMerge(options)

  let input = parse.text(swuText);
  let cursor = 0;
  let cols = [];
  let col = [];
  let plus = 0;
  let center = parseInt(values.width/2);
  let maxHeight = values.height - values.margin;
  let pullable = true;
  let finalize = false;

  for (let val of input) {
    let informed = info(val);
    cursor += plus;
    if (values.punctuation.spacing){
      cursor += ((informed.segment=='sign')?values.pad:0);
    } else {
      cursor += values.pad;
    }

    finalize = ((cursor + informed.height) > maxHeight);

    if (finalize && informed.segment=='symbol' && values.punctuation.pull  && pullable){
      finalize = false;
      pullable = false;
    }

    if (col.length == 0) { finalize = false; }

    if ( finalize) {
      cursor = values.pad;
      cols.push(col);
      col = [];
      pullable = true;
    }
    col.push(Object.assign(informed,{
      x: center + (values.offset * informed.lane) - ((500-informed.minX) * informed.zoom * values.style.zoom),
      y: cursor,
      text: val
    }))
    cursor += (informed.height * informed.zoom * values.style.zoom);
    if (values.punctuation.spacing){
      plus = (informed.segment=='sign')?values.pad:values.punctuation.pad;
    } else {
      plus = values.pad;
    }
  }

  if (col.length) {
    cols.push(col);
  }

  // over height issue when pulling punctuation
  if (values.punctuation.pull) {
    for (let col of cols){
      let last = col[col.length -1];
      let diff = (last.y + last.height) - (values.height - values.margin);
      if (diff>0){
        let adj = parseInt(diff/(col.length)) + 1;
        for (let i in col){
          col[i].y -= adj*i + adj;
        }
      }
    }
  }

  // contract, expand, adjust
  let widths = [];
  for (let col of cols){
    let min = [(center - values.offset - values.pad)]
    let max = [(center + values.offset + values.pad)]
    for (let item of col){
      min.push(item.x - values.pad);
      max.push(item.x + item.width + values.pad);
    }
    min = Math.min(...min);
    max = Math.max(...max);

    let width = values.width;
    let adj = 0;

    if (!values.dynamic){
      adj = center - parseInt((min + max)/2);
    } else {
      width = max - min;
      adj = -min;
    }
    for (let item of col){
      item.x += adj;
    }
    widths.push(width);
  }

  return {
    'options': values,
    'widths': widths,
    'columns': cols
  };
}

export { columnDefaults, columnDefaultsMerge, columns }