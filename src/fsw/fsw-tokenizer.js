import { parse } from './fsw-parse';

/**
 * Default special tokens configuration
 * ```
 * DEFAULT_SPECIAL_TOKENS = [
 *   { index: 0, name: 'UNK', value: '[UNK]' },
 *   { index: 1, name: 'PAD', value: '[PAD]' },
 *   { index: 2, name: 'CLS', value: '[CLS]' },
 *   { index: 3, name: 'SEP', value: '[SEP]' }
 * ];
 * ```
 */
const DEFAULT_SPECIAL_TOKENS = [
  { index: 0, name: 'UNK', value: '[UNK]' },
  { index: 1, name: 'PAD', value: '[PAD]' },
  { index: 2, name: 'CLS', value: '[CLS]' },
  { index: 3, name: 'SEP', value: '[SEP]' }
];

/**
 * Generates an array of all possible tokens for the FSW tokenizer
 * @private
 * @function generateTokens
 * @returns {string[]} Array of all possible tokens
 */
const generateTokens = () => {
  const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);
  const hexRange = (start, end) => range(start, end + 1).map(i => i.toString(16));

  const sequence = ["A"];
  const signbox = ["B", "L", "M", "R"];
  const nullToken = ["S000"];
  const baseSymbols = range(0x100, 0x38b + 1).map(i => `S${i.toString(16)}`);
  const rows = hexRange(0, 15).map(i => `r${i}`);
  const cols = hexRange(0, 5).map(i => `c${i}`);
  const positions = range(250, 750).map(i => `p${i}`);

  return [
    ...sequence,
    ...signbox,
    ...nullToken,
    ...baseSymbols,
    ...rows,
    ...cols,
    ...positions
  ];
};

/**
 * Creates mappings for special tokens
 * @private
 * @function createSpecialTokenMappings
 * @param {Array} specialTokens - Array of special token objects
 * @returns {Object} Special token mappings
 */
const createSpecialTokenMappings = (specialTokens) => {
  const byIndex = {};
  const byName = {};
  const byValue = {};
  const indices = new Set();
  
  specialTokens.forEach(token => {
    if (indices.has(token.index)) {
      throw new Error(`Duplicate token index: ${token.index}`);
    }
    indices.add(token.index);
    
    byIndex[token.index] = token;
    byName[token.name] = token;
    byValue[token.value] = token;
  });
  
  return {
    byIndex,
    byName,
    byValue,
    getByIndex: (index) => byIndex[index] || byIndex[specialTokens.find(t => t.name === 'UNK').index],
    getByName: (name) => byName[name] || byName['UNK'],
    getByValue: (value) => byValue[value] || byName['UNK'],
    getAllValues: () => specialTokens.map(t => t.value),
    getAllIndices: () => specialTokens.map(t => t.index)
  };
};

/**
 * Creates index-to-string and string-to-index mappings for tokens
 * @private
 * @function createTokenMappings
 * @param {string[]} tokens - Array of tokens to map
 * @param {Object} specialTokenMappings - Special tokens mapping object
 * @param {number} startingIndex - Starting index for regular tokens
 * @returns {Object} Object containing i2s and s2i mappings
 */
const createTokenMappings = (tokens, specialTokenMappings, startingIndex) => {
  const i2s = {};
  const s2i = {};
  
  // Add special tokens first
  Object.values(specialTokenMappings.byIndex).forEach(token => {
    i2s[token.index] = token.value;
    s2i[token.value] = token.index;
  });
  
  // Add regular tokens
  tokens.forEach((token, i) => {
    const index = startingIndex + i;
    i2s[index] = token;
    s2i[token] = index;
  });
  return { i2s, s2i };
};

/**
 * Tokenizes an FSW string into an array of tokens
 * @function fsw.tokenize
 * @param {string} fsw - FSW string to tokenize
 * @param {Object} options - Tokenization options
 * @param {boolean} [options.sequence=true] - Whether to include sequence tokens
 * @param {boolean} [options.signbox=true] - Whether to include signbox tokens
 * @param {string} [options.sep="[SEP]"] - Separator token
 * @returns {string[]} Array of tokens
 * @example
 * fsw.tokenize("AS10e00M507x515S10e00492x485",{sequence:false,sep:null})
 * 
 * return [
 *   'M', 'p507', 'p515','S10e', 'c0', 'r0', 'p492', 'p485'
 * ]
 */
const tokenize = (fsw, { sequence = true, signbox = true, sep = "[SEP]" } = {}) => {
  const tokenizeSymbol = (symbol) => [
    symbol.slice(0, 4),
    `c${symbol.charAt(4)}`,
    `r${symbol.charAt(5)}`
  ];
  
  const tokenizeCoord = (coord) => coord.map(p => `p${p}`);

  const segments = parse.text(fsw).map(fswSegment => {
    if (/[BLMR]/.test(fswSegment)) {
      const sign = parse.sign(fswSegment);
      const tokens = [];

      if (sign.sequence && sequence) {
        tokens.push("A", ...sign.sequence.map(seqItem => tokenizeSymbol(seqItem)).flat());
      }

      if (signbox) {
        tokens.push(
          sign.box,
          ...tokenizeCoord(sign.max),
          ...sign.spatials.flatMap(symbol => [
            ...tokenizeSymbol(symbol.symbol),
            ...tokenizeCoord(symbol.coord)
          ])
        );
      }

      return sep ? [...tokens, sep] : tokens;
    } else {
      const parsed = parse.symbol(fswSegment);
      
      if (!signbox && !sequence) {
        return [];
      }
      
      let tokens = [];
      if (!signbox && sequence) {
        tokens = [
          "A",
          ...tokenizeSymbol(parsed.symbol)
        ];
      } else {
        tokens = [
          "M",
          ...tokenizeCoord(parsed.coord.map(c => 1000 - c)),
          ...tokenizeSymbol(parsed.symbol),
          ...tokenizeCoord(parsed.coord)
        ];
      }
      
      return tokens.length > 0 && sep ? [...tokens, sep] : tokens;
    }
  });

  return segments.flatMap(segment => segment);
};

/**
 * Converts an array of tokens back into an FSW string
 * @function fsw.detokenize
 * @param {string[]} tokens - Array of tokens to convert
 * @param {Array} specialTokens - Array of special token objects to filter out
 * @returns {string} FSW string
 * @example
 * fsw.detokenize(['M', 'p507', 'p515','S10e', 'c0', 'r0', 'p492', 'p485'])
 * 
 * return "M507x515S10e00492x485"
 */
const detokenize = (tokens, specialTokens = DEFAULT_SPECIAL_TOKENS) => {
  const specialValues = new Set(specialTokens.map(t => t.value));
  
  return tokens
    .filter(t => !specialValues.has(t))
    .join(' ')
    .replace(/\bp(\d{3})\s+p(\d{3})/g, '$1x$2')
    .replace(/ c(\d)\d? r(.)/g, '$1$2')
    .replace(/ c(\d)\d?/g, '$10')
    .replace(/ r(.)/g, '0$1')
    .replace(/ /g, '')
    .replace(/(\d)([BLMR])/g, '$1 $2')
    .replace(/(\d)(AS)/g, '$1 $2')
    .replace(/(A(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])+)( )([BLMR])/g, '$1$3');
};

/**
 * Splits tokens into chunks of specified size while preserving sign boundaries
 * @function fsw.chunkTokens
 * @param {string[]} tokens - Array of tokens to chunk
 * @param {number} chunkSize - Maximum size of each chunk
 * @param {Object} options - Chunking options
 * @param {string} [options.cls="[CLS]"] - CLS token
 * @param {string} [options.sep="[SEP]"] - SEP token
 * @param {string} [options.pad="[PAD]"] - PAD token
 * @returns {string[][]} Array of token chunks
 */
const chunkTokens = (tokens, chunkSize, { cls = "[CLS]", sep = "[SEP]", pad = "[PAD]" } = {}) => {
  if (chunkSize < 60) {
    throw new Error('Chunk size must be at least 60 tokens to accommodate a typical sign');
  }

  const chunks = [];
  let currentChunk = [];
  let tokenIndex = 0;

  while (tokenIndex < tokens.length) {
    currentChunk = [cls];
    
    while (tokenIndex < tokens.length) {
      const token = tokens[tokenIndex];
      
      let lookAhead = tokenIndex;
      while (lookAhead < tokens.length && tokens[lookAhead] !== sep) {
        lookAhead++;
      }
      
      const signSize = lookAhead - tokenIndex + 1;
      
      if (currentChunk.length + signSize > chunkSize - 1) {
        break;
      }
      
      while (tokenIndex <= lookAhead) {
        currentChunk.push(tokens[tokenIndex]);
        tokenIndex++;
      }
    }
    
    while (currentChunk.length < chunkSize) {
      currentChunk.push(pad);
    }
    
    chunks.push(currentChunk);
  }

  return chunks;
};

/**
 * Creates a tokenizer object with encoding and decoding capabilities
 * @function fsw.createTokenizer
 * @param {Object} [specialTokens] - Special tokens mapping object
 * @param {number} [startingIndex] - Starting index for regular tokens
 * @returns {TokenizerObject} Tokenizer object
 * @example
 * const t = fsw.createTokenizer()
 * 
 * t.encode('M507x515S10e00492x485')
 * 
 * return [7, 941, 949,  24, 678, 662, 926, 919, 3]
 */
const createTokenizer = ( 
  specialTokens = DEFAULT_SPECIAL_TOKENS,
  startingIndex = null
) => {
  const specialTokenMappings = createSpecialTokenMappings(specialTokens);
  const calculatedStartingIndex = startingIndex ?? 
    (specialTokenMappings.getAllIndices().length > 0 ? Math.max(...specialTokenMappings.getAllIndices()) + 1 : 0);

  const tokens = generateTokens();
  const { i2s, s2i } = createTokenMappings(tokens, specialTokenMappings, calculatedStartingIndex);

  const tokenizer = {
    i2s,
    s2i,
    specialTokens: specialTokenMappings,
    length: Object.keys(i2s).length,
    vocab: () => Object.values(i2s),

    encodeTokens: (tokens) => tokens.map(t => {
      return s2i[t] !== undefined ? s2i[t] : specialTokenMappings.getByValue(t).index;
    }),
    
    decodeTokens: (indices) => indices.map(i => i2s[i] || specialTokenMappings.getByName('UNK').value),

    encode: (text, options = {}) => {
      const tokens = tokenize(text, {
        ...options,
        sep: specialTokenMappings.getByName('SEP').value
      });
      return tokenizer.encodeTokens(tokens);
    },

    decode: (tokens) => {
      if (tokens.length === 0) return "";
      
      if (Array.isArray(tokens[0])) {
        const decodedChunks = tokens.map(chunk => tokenizer.decodeTokens(chunk));
        return detokenize(decodedChunks.flat(), specialTokens);
      }
      
      const decodedTokens = tokenizer.decodeTokens(tokens);
      return detokenize(decodedTokens, specialTokens);
    },

    chunk: (tokens, chunkSize) => chunkTokens(tokens, chunkSize, {
      cls: specialTokenMappings.getByName('CLS').value,
      sep: specialTokenMappings.getByName('SEP').value,
      pad: specialTokenMappings.getByName('PAD').value
    })
  };
  
  return tokenizer;
};

export { tokenize, detokenize, createTokenizer, chunkTokens };