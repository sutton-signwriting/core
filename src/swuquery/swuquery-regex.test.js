
import { regex } from './swuquery-regex';

it('should return regex for general query string', () => {
  expect(regex('Q')).toEqual(['(?:\uD836\uDC00(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
})

it('should return regex for signbox query string', () => {
  expect(regex('Q񀀒')).toEqual(['(\uD836\uDC00((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*\uD8C0\uDC12(?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
  expect(regex('Q񀀑r')).toEqual(['(\uD836\uDC00((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*\uD8C0[\uDC11-\uDC20](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
})

it('should return regex for prefix query string', () => {
  expect(regex('QA񀀒T')).toEqual(['(\uD836\uDC00\uD8C0\uDC12((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))*)\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
  expect(regex('QA񀀑rT')).toEqual(['(\uD836\uDC00\uD8C0[\uDC11-\uDC20]((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))*)\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
})

it('should return regex for prefix query string', () => {
  expect(regex('QA񀀑rT񀀓𝤅𝣯񆕁𝤅𝣽')).toEqual(['(\uD836\uDC00\uD8C0[\uDC11-\uDC20]((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))*)\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*\uD8C0\uDC13(?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*', '(\uD836\uDC00\uD8C0[\uDC11-\uDC20]((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))*)\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*\uD8D9\uDD41(?:\uD836[\uDC0C-\uDDFF]){2}((?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
})