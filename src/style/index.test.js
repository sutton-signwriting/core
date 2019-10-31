
import { parse, compose } from './';

it('should pass', () => {
  expect(true).toBe(true);
});

it('should parse to object and back to original string', () => {
  let styles = [
    '-',
    '-C',
    '-CG_color_D_red,eee_Zx--ox!my!',
    '-CP10G_ccc_D_red,Cyan_Zx--primary blinking!cursor!'
  ];
  styles.map((test) => {
    expect(compose(parse(test))).toBe(test);
  })
})