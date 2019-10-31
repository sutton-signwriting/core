
import { re } from './fswquery-re';

it('should have the full regular expression', () => {
  expect(re.full).toBe('Q((?:A(?:S[123][0-9a-f]{2}[0-5u][0-9a-fu]|R[123][0-9a-f]{2}t[123][0-9a-f]{2})+)?T)?((?:S[123][0-9a-f]{2}[0-5u][0-9a-fu](?:[0-9]{3}x[0-9]{3})?|R[123][0-9a-f]{2}t[123][0-9a-f]{2}(?:[0-9]{3}x[0-9]{3})?)*)?(V[0-9]+)?(-?)')
})
