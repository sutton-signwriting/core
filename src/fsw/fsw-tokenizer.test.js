// fsw-tokenizer.test.js

import { createTokenizer, tokenize, detokenize } from './fsw-tokenizer.js';

describe('FSW tokenize', () => {
  test('tokenization single sign', () => {
    const fsw = 'M523x556S1f720487x492S1f72f487x492';
    const tokens = tokenize(fsw);
    expect(tokens).toEqual([
      'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492', 'S1f7', 'c2', 'rf', 'p487', 'p492', '[SEP]'
    ]);
  });

  test('tokenization no box', () => {
    const fsw = 'S38800464x496';
    const tokens = tokenize(fsw);
    expect(tokens).toEqual(['M', 'p536', 'p504', 'S388', 'c0', 'r0', 'p464', 'p496', '[SEP]']);
  });

  test('tokenization multiple signs', () => {
    const fsw = 'M523x556S1f720487x492 M524x556S1f210488x493';
    const tokens = tokenize(fsw);
    expect(tokens).toEqual([
      'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492', '[SEP]',
      'M', 'p524', 'p556', 'S1f2', 'c1', 'r0', 'p488', 'p493', '[SEP]'
    ]);
  });

  test('tokenization with A', () => {
    const fsw = "AS1f720M523x556S1f720487x492";
    const tokens = tokenize(fsw);
    expect(tokens).toEqual([
      'A', 'S1f7', 'c2', 'r0', 'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492', '[SEP]'
    ]);
  });
});

describe('FSW detokenize', () => {
  test('detokenizes single symbol', () => {
    const tokens = ['S388', 'c0', 'r0', 'p464', 'p496'];
    expect(detokenize(tokens)).toBe('S38800464x496');
  });

  test('detokenizes multiple symbols with M prefix', () => {
    const tokens = [
      'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492',
      'S1f7', 'c2', 'r0', 'p487', 'p492'
    ];
    expect(detokenize(tokens)).toBe('M523x556S1f720487x492S1f720487x492');
  });

  test('detokenizes multiple symbols with A prefix', () => {
    const tokens = [
      'A', 'S1f7', 'c2', 'r0', 'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492',
      'S1f7', 'c2', 'r0', 'p487', 'p492'
    ];
    expect(detokenize(tokens)).toBe('AS1f720M523x556S1f720487x492S1f720487x492');
  });

  test('detokenizes multiple signs', () => {
    const tokens = [
      'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492',
      'M', 'p524', 'p556', 'S1f2', 'c1', 'r0', 'p488', 'p493'
    ];
    expect(detokenize(tokens)).toBe('M523x556S1f720487x492 M524x556S1f210488x493');
  });

  test('handles empty token array', () => {
    expect(detokenize([])).toBe('');
  });

  test('handles all box types', () => {
    const boxTypes = ['B', 'L', 'M', 'R'];
    for (const box of boxTypes) {
      const tokens = [box, 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492'];
      expect(detokenize(tokens)).toBe(`${box}523x556S1f720487x492`);
    }
  });
});

describe('FSW Tokenizer', () => {
  let tokenizer;

  beforeEach(() => {
    tokenizer = createTokenizer();
  });

  test('tokenization single sign', () => {
    const fsw = 'M523x556S1f720487x492S1f720487x492';
    const tokens = tokenizer.encode(fsw);
    const expectedTokens = [
      'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492', 'S1f7', 'c2', 'r0', 'p487', 'p492', '[SEP]'
    ].map(t => tokenizer.s2i[t]);
    expect(tokens).toEqual(expectedTokens);
  });

  test('tokenization no box', () => {
    const fsw = 'S38800464x496';
    const tokens = tokenizer.encode(fsw);
    const expectedTokens = ['M', 'p536', 'p504', 'S388', 'c0', 'r0', 'p464', 'p496', '[SEP]'].map(t => tokenizer.s2i[t]);
    expect(tokens).toEqual(expectedTokens);
  });

  test('tokenization multiple signs', () => {
    const fsw = 'M523x556S1f720487x492 M524x556S1f210488x493';
    const tokens = tokenizer.encode(fsw);
    const expectedTokens = [
      'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492', '[SEP]',
      'M', 'p524', 'p556', 'S1f2', 'c1', 'r0', 'p488', 'p493', '[SEP]'
    ].map(t => tokenizer.s2i[t]);
    expect(tokens).toEqual(expectedTokens);
  });

  test('tokenization with A', () => {
    const fsw = "AS1f720M523x556S1f720487x492";
    const tokens = tokenizer.encode(fsw);
    const expectedTokens = [
      'A', 'S1f7', 'c2', 'r0', 'M', 'p523', 'p556', 'S1f7', 'c2', 'r0', 'p487', 'p492', '[SEP]'
    ].map(t => tokenizer.s2i[t]);
    expect(tokens).toEqual(expectedTokens);
  });

  test('detokenization single sign', () => {
    const tokens = ['M', 'p251', 'p456', 'S1f7', 'c2', 'r0', 'p487', 'p492', 'S1f7', 'c2', 'r0', 'p487', 'p492', '[SEP]']
      .map(t => tokenizer.s2i[t]);
    const fsw = tokenizer.decode(tokens);
    expect(fsw).toBe('M251x456S1f720487x492S1f720487x492');
  });

  test('detokenization multiple signs', () => {
    const tokens = [
      'M', 'p251', 'p456', 'S1f7', 'c2', 'r0', 'p487', 'p492', '[SEP]',
      'M', 'p524', 'p556', 'S1f2', 'c1', 'r0', 'p488', 'p493', '[SEP]'
    ].map(t => tokenizer.s2i[t]);
    const fsw = tokenizer.decode(tokens);
    expect(fsw).toBe('M251x456S1f720487x492 M524x556S1f210488x493');
  });
});

describe('FSW Tokenizer Special Cases', () => {
  test('creates tokenizer with empty special tokens object', () => {
    const tokenizer = createTokenizer([]);
    expect(tokenizer.s2i["A"]).toBe(0);
  });

  test('creates tokenizer with non-sequential special tokens', () => {
    const specialTokens = [
      { index: 0, name: 'UNK', value: '[UNK]' },
      { index: 5, name: 'PAD', value: '[PAD]' },
      { index: 10, name: 'CLS', value: '[CLS]' },
      { index: 15, name: 'SEP', value: '[SEP]' }
    ];
    const tokenizer = createTokenizer(specialTokens);
    // First normal token should start at 16 (max special token index + 1)
    expect(tokenizer.s2i["A"]).toBe(16);
  });

  test('creates tokenizer with custom starting index', () => {
    const specialTokens = [
      { index: 0, name: 'UNK', value: '[UNK]' },
      { index: 5, name: 'PAD', value: '[PAD]' },
      { index: 10, name: 'CLS', value: '[CLS]' },
      { index: 15, name: 'SEP', value: '[SEP]' }
    ];
    const tokenizer = createTokenizer(specialTokens, 100);
    // First normal token should start at provided index 100
    expect(tokenizer.s2i["A"]).toBe(100);
  });

  test('handles empty special tokens with custom starting index', () => {
    const tokenizer = createTokenizer([], 10);
    // Should use provided starting index even with no special tokens
    expect(tokenizer.s2i["A"]).toBe(10);
  });
});
