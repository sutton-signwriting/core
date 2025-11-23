
import { info } from './swu-info';

it('should return an object of information about a sign', () => {
  expect(info("𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻")).toEqual({
    minX: 481,
    minY: 471,
    width: 37,
    height: 58,
    zoom: 1,
    padding: 0,
    segment: 'sign',
    lane: 0
  });
  expect(info("𝠀񁲡񈩧𝠂𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻-Z2")).toEqual({
    minX: 481,
    minY: 471,
    width: 37,
    height: 58,
    zoom: 2,
    padding: 0,
    segment: 'sign',
    lane: -1
  });
  expect(info("𝠀񁲡񈩧𝠄𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻-P10Z0.2")).toEqual({
    minX: 481,
    minY: 471,
    width: 37,
    height: 58,
    zoom: .2,
    padding: 10,
    segment: 'sign',
    lane: 1
  });
})

it('should return an object of information about a punctuation', () => {
  expect(info("񏌁𝣢𝤂")).toEqual({
    minX: 464,
    minY: 496,
    width: 72,
    height: 8,
    zoom: 1,
    padding: 0,
    segment: 'symbol',
    lane: 0
  });
})

it('should return an object of information about a punctuation', () => {
  expect(info("񏌁𝣢𝤂-P10Z2.2")).toEqual({
    minX: 464,
    minY: 496,
    width: 72,
    height: 8,
    zoom: 2.2,
    padding: 10,
    segment: 'symbol',
    lane: 0
  });
})
