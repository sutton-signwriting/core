
import { info } from './fsw-info';
import { sample } from './fsw-sample';

it('should return an object of information about a sign', () => {
  expect(info("AS14c20S27106M518x529S14c20481x471S27106503x489")).toEqual({
    minX: 481,
    minY: 471,
    width: 37,
    height: 58,
    zoom: 1,
    padding: 0,
    segment: 'sign',
    lane: 0
  });
  expect(info("AS14c20S27106L518x529S14c20481x471S27106503x489-Z2")).toEqual({
    minX: 481,
    minY: 471,
    width: 37,
    height: 58,
    zoom: 2,
    padding: 0,
    segment: 'sign',
    lane: -1
  });
  expect(info("AS14c20S27106R518x529S14c20481x471S27106503x489-P10Z0.2")).toEqual({
    minX: 481,
    minY: 471,
    width: 37,
    height: 58,
    zoom: .2,
    padding: 10,
    segment: 'sign',
    lane: 1
  });
  expect(info("AS14c20S00000S27106R518x529S14c20481x471S27106503x489-P10Z0.2")).toEqual({
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
  expect(info("S38800464x496")).toEqual({
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
  expect(info("S38800464x496-P10Z2.2")).toEqual({
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
