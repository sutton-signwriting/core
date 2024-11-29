
import { regex } from './swuquery-regex';

it('should return regex for general query string', () => {
  expect(regex('Q')).toEqual(['(?:\uD836\uDC00(?:(?:\uD8C0\uDC00|(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
})

it('should return regex for signbox query string', () => {
  expect(regex('Q񀀒')).toEqual(['(?:\uD836\uDC00(?:\uD8C0\uDC00|(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*\uD8C0\uDC12(?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
  expect(regex('Q񀀑r')).toEqual(['(?:\uD836\uDC00(?:\uD8C0\uDC00|(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*\uD8C0[\uDC11-\uDC20](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
  expect(regex('QR񋔡񋮁')).toEqual(['(?:\uD836\uDC00(?:\uD8C0\uDC00|(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))+)?\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*((\uD8ED[\uDD21-\uDFFF])|(\uD8EE[\uDC00-\uDFE0]))(?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
})

it('should return regex for prefix query string', () => {
  expect(regex('QA񀀒T')).toEqual(['(?:𝠀񀀒(?:񀀀|(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80])))*)\ud836[\udc01-\udc04](?:\ud836[\udc0c-\uddff]){2}(?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*']);
  expect(regex('QA񀀑rT')).toEqual(['(?:𝠀\uD8C0[\uDC11-\uDC20](?:񀀀|(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80])))*)\uD836[\uDC01-\uDC04](?:\uD836[\uDC0C-\uDDFF]){2}(?:(?:(?:\uD8C0[\uDC01-\uDFFF])|(?:[\uD8C1-\uD8FC][\uDC00-\uDFFF])|(?:\uD8FD[\uDC00-\uDC80]))(?:\uD836[\uDC0C-\uDDFF]){2})*']);
})

it('should return multiple regex for prefix and multiple signbox', () => {
  expect(regex('QA񀀑rT񀀓𝤅𝣯񆕁𝤅𝣽')).toEqual([
    '(?:𝠀\ud8c0[\udc11-\udc20](?:񀀀|(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80])))*)\ud836[\udc01-\udc04](?:\ud836[\udc0c-\uddff]){2}(?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*񀀓\ud836[\udcf1-\udd19]\ud836[\udcdb-\udd03](?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*',
    '(?:𝠀\ud8c0[\udc11-\udc20](?:񀀀|(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80])))*)\ud836[\udc01-\udc04](?:\ud836[\udc0c-\uddff]){2}(?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*񆕁\ud836[\udcf1-\udd19]\ud836[\udce9-\udd11](?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*'
  ]);
})

it('should return regex for prefix query string with OR searching', () => {
  expect(regex('QA񀀒o񂇢T')).toEqual(['(?:𝠀(?:񀀒|񂇢)(?:񀀀|(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80])))*)\ud836[\udc01-\udc04](?:\ud836[\udc0c-\uddff]){2}(?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*']);
})

it('should return regex for signbox query string with OR searching', () => {
  expect(regex('Q񀀒o񋛩𝣵𝤐')).toEqual(['(?:𝠀(?:񀀀|(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80])))+)?\ud836[\udc01-\udc04](?:\ud836[\udc0c-\uddff]){2}(?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*(?:񀀒|񋛩)\ud836[\udce1-\udd09]\ud836[\udcfc-\udd24](?:(?:(?:\ud8c0[\udc01-\udfff])|(?:[\ud8c1-\ud8fc][\udc00-\udfff])|(?:\ud8fd[\udc00-\udc80]))(?:\ud836[\udc0c-\uddff]){2})*']);
})
