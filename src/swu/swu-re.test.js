
import { re } from './swu-re';

it('should have the full regular expression', () => {
  expect(re.sign).toBe('(?:\uD836\uDC00(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*')
})
