
import { rgb2hex, rgba2hex } from './style-rgb';

it('should return hex color or "transparent" for rgb color', () => {
  expect(rgb2hex("rgb(0,0,0)")).toEqual("000000");
  expect(rgb2hex("rgb(1,1,1)")).toEqual("010101");
  expect(rgb2hex("rgb(255,255,255)")).toEqual("ffffff");
  expect(rgb2hex("rgba(255,255,255,1)")).toEqual("ffffff");
  expect(rgb2hex("rgba(255,255,255,0.5)")).toEqual("ffffff");
  expect(rgb2hex("rgba(255,255,255,0)")).toEqual("transparent");
  expect(rgb2hex("rgba(255,255,255,0.5)",0.5)).toEqual("transparent");
})

it('should return hex color for rgba2hex', () => {
  expect(rgba2hex("rgba(0,0,0,0)","rgb(255,255,255)")).toEqual("transparent");
  expect(rgba2hex("rgba(0,0,0,0.5)","rgb(255,255,255)")).toEqual("7f7f7f");
  expect(rgba2hex("rgba(0,0,0,1)","rgb(255,255,255)")).toEqual("000000");
  expect(rgba2hex("rgba(255,255,255,0)","rgb(0,0,0)")).toEqual("transparent");
  expect(rgba2hex("rgba(255,255,255,0.5)","rgb(0,0,0)")).toEqual("7f7f7f");
  expect(rgba2hex("rgba(255,255,255,1)","rgb(0,0,0)")).toEqual("ffffff");
  expect(rgba2hex("rgba(255,0,0,0.3)","rgb(0,0,0)")).toEqual("4c0000");
  expect(rgba2hex("rgba(0,255,0,0.3)","rgb(0,0,0)")).toEqual("004c00");
  expect(rgba2hex("rgba(0,0,255,0.3)","rgb(0,0,0)")).toEqual("00004c");
  expect(rgba2hex("rgb(255,255,255)","rgb(0,0,0)")).toEqual("ffffff");
})
