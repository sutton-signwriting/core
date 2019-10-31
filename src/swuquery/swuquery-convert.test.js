
import { swu2query } from './swuquery-convert';

it('should convert swu strings into query string', () => {
  expect(swu2query('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭', 'ASL'))
    .toBe('QA񀀒񀀚񋚥񋛩T񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭');
  expect(swu2query('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭', 'a'))
    .toBe('QA񀀒fr񀀚fr񋚥fr񋛩frT');
  expect(swu2query('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭', 'sL'))
    .toBe('Q񋛩fr𝣵𝤐񀀒fr𝤇𝣤񋚥fr𝤐𝤆񀀚fr𝣮𝣭')
})