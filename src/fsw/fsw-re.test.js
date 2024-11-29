
import { re } from './fsw-re';

it('should have the full regular expression', () => {
  expect(re.sign).toBe('(?:A(?:S00000|S[123][0-9a-f]{2}[0-5][0-9a-f])+)?[BLMR][0-9]{3}x[0-9]{3}(?:S[123][0-9a-f]{2}[0-5][0-9a-f][0-9]{3}x[0-9]{3})*')
})
