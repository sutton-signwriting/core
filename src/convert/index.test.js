
import { swu2num, num2swu, swu2coord, coord2swu, fsw2coord, coord2fsw, swu2code, code2swu, swu2id, id2swu, swu2key, key2swu, swu2fsw, fsw2swu } from './';

it('should convert swu to number', () => {
  expect(swu2num('𝤆')).toBe(500);
})

it('should convert number to swu', () => {
  expect(num2swu(500)).toBe('𝤆');
})

it('should convert swu to coord', () => {
  expect(swu2coord('𝤆𝤆')).toEqual([500, 500]);
})

it('should convert coord to swu', () => {
  expect(coord2swu([500, 500])).toBe('𝤆𝤆');
})

it('should convert fsw to coord', () => {
  expect(fsw2coord('500x500')).toEqual([500, 500]);
})

it('should convert coord to fsw', () => {
  expect(coord2fsw([500, 500])).toBe('500x500');
})

it('should convert swu symbol to code point', () => {
  expect(swu2code('񀀁')).toBe(0x40001);
})

it('should convert code point to swu symbol', () => {
  expect(code2swu(0x40001)).toBe('񀀁');
})

it('should convert swu symbol to 16-bit id', () => {
  expect(swu2id('񀀁')).toBe(1);
})

it('should convert 16-bit id to swu symbol', () => {
  expect(id2swu(1)).toBe('񀀁');
})

it('should convert swu symbol to fsw key', () => {
  expect(swu2key('񀀁')).toBe('S10000');
})

it('should convert fsw key to swu symbol', () => {
  expect(key2swu('S10000')).toBe('񀀁');
})

it('should convert an swu string into an fsw string', () => {
  expect(swu2fsw('񀀁𝤆𝤆')).toBe('S10000500x500');
  expect(swu2fsw('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')).toBe('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475');
})

it('should convert an fsw string into an swu string', () => {
  expect(fsw2swu('S10000500x500')).toBe('񀀁𝤆𝤆');
  expect(fsw2swu('AS10011S10019S2e704S2e748M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')).toBe('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭');
})

it('should not corrupt styling string and other text', () => {
  expect(fsw2swu('-CP10G_blue_D_red,Cyan_Z1.1-D01_blue_D02_yellow,green_Z01,10,500x500Z02,5.5-primary blinking!cursor!')).toBe('-CP10G_blue_D_red,Cyan_Z1.1-D01_blue_D02_yellow,green_Z01,10,500x500Z02,5.5-primary blinking!cursor!');
})
