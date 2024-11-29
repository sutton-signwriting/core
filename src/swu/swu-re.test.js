
import { re } from './swu-re';

it('should have the full regular expression', () => {
  expect(re.sign).toBe('(?:𝠀(?:(?:񀀀|(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))))+)?\ud836[\udc01-\udc04](?:\ud836[\udc0c-\uddff]){2}(?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*')
})
