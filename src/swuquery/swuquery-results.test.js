
import { results, lines } from './swuquery-results';

const signtext = '𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭 𝠀񂇢񂇈񆙡񋎥񋎵𝠃𝤛𝤬񂇈𝤀𝣺񂇢𝤄𝣻񋎥𝤄𝤗񋎵𝤃𝣟񆙡𝣱𝣸 𝠀񅨑񀀙񆉁𝠃𝤙𝤞񀀙𝣷𝤀񅨑𝣼𝤀񆉁𝣳𝣮 񏌁𝣢𝤂 𝠀񀕁𝠃𝤍𝤕񀕁𝣾𝣷 𝠀񂌢񂇷񆙡񈗦𝠃𝤩𝤛񂌢𝣢𝣱񂇷𝣬𝤉񆙡𝤍𝣽񈗦𝤜𝤎 񏊡𝣡𝤂 𝠀񀀡𝠃𝤎𝤕񀀡𝣿𝣷 𝠀񀀒񉁩񌏁𝠃𝤮𝤙񌏁𝣴𝣴񀀒𝤙𝣻񉁩𝤙𝣟 𝠀񀕁񀕉񆇡񈩡񈩽񆇡񋺁񌀇񌀃𝠃𝤲𝤡񀕉𝣨𝤃񀕁𝤖𝤃񌀇𝣴𝣴񆇡𝤙𝣶񆇡𝣩𝣶񈩡𝤊𝣢񈩽𝣕𝣡񌀃𝣴𝣴񋺁𝣽𝣗 񏊡𝣡𝤂 𝠀񀕡𝠃𝤎𝤕񀕡𝣿𝣷 𝠀񀀒񉁩񌏁𝠃𝤮𝤙񌏁𝣴𝣴񀀒𝤙𝣻񉁩𝤙𝣟 𝠀񀂁񂇻񈟃񆕁𝠃𝤣𝤘񂇻𝤈𝤌񆕁𝣹𝤁񀂁𝤍𝣵񈟃𝣩𝣽 𝠀񀀡񋎥񀀁𝠃𝤡𝤖񀀁𝤒𝣸񀀡𝣫𝣸񋎥𝣻𝣷 𝠀񀀓񃛆񆿅񆕁𝠃𝤣𝤟񀀓𝤅𝣯񆕁𝤅𝣽񃛆𝣪𝣮񆿅𝤅𝤐 񏌁𝣢𝤂 𝠀񂇢񉳍񂇂񂇈𝠃𝤬𝤘񂇢𝤕𝣵񂇈𝣡𝣴񂇂𝣤𝣵񉳍𝣿𝣼 𝠀񀀒񀀚񋠥񋡩𝠃𝤝𝤪񋡩𝣷𝤊񀀒𝤈𝣡񋠥𝤍𝤃񀀚𝣯𝣪 𝠀񃧁񃧉񆿅񆿕񋸥𝠃𝤨𝤛񆿕𝣭𝤉񃧁𝤌𝣱񃧉𝣥𝣱񆿅𝤔𝤊񋸥𝣿𝤕 񏌁𝣢𝤂 𝠀񅡁񂇸񈗨񈗨񂇑񂇙񇀥񇀵𝠃𝤤𝤸񂇸𝣨𝣚񂇑𝤕𝤝񂇙𝣳𝤝񅡁𝣼𝣦񇀵𝣱𝣺񈗨𝤊𝣔񇀥𝤔𝣻񈗨𝤖𝣞 𝠀񄹸񈗦񄾘𝠃𝤭𝤥񄹸𝣞𝣦񄾘𝤔𝤌񈗦𝣽𝣾 𝠃𝤗𝤜񀀋𝣹𝤍񀁂𝣵𝣱 񏊡𝣡𝤂 𝠀񆅁񇅅𝠃𝤏𝤙񆅁𝣿𝣳񇅅𝣾𝤇 񏌁𝣢𝤂 𝠃𝤦𝤖񄵡𝣧𝣷񆅁𝤁𝤆񃉡𝤔𝣸 񏊡𝣡𝤂 𝠃𝤧𝤬񅩱𝤊𝤝񍳡𝣴𝣴 𝠃𝤼𝤘񃛋𝣳𝣶񃛃𝤇𝣶񈙇𝤞𝣵񈙓𝣐𝣵񆇡𝤂𝤍 񏊡𝣡𝤂 𝠀񂋣񂋫񆕁񇆡𝠃𝤜𝤞񇆡𝣹𝣯񂋣𝤁𝤆񂋫𝣱𝤋񆕁𝣿𝣿 𝠀񀟡񆄩񆕁񈟃񍩁𝠃𝤟𝥄񆄩𝤉𝤵񀟡𝤐𝤕񆕁𝤁𝤥񈟃𝣰𝤟񍩁𝣴𝣴 񏊡𝣡𝤂 𝠃𝤹𝤰񅊰𝣒𝣣񅊂𝣴𝣝񈙆𝤈𝣺񈙖𝣥𝣼񅑢𝤠𝤏񅒐𝣺𝤐 𝠀񃁁񃁉񋠩񋡭񋸡𝠃𝤦𝤬񃁁𝤇𝤝񃁉𝣥𝤑񋡭𝣯𝣨񋠩𝤌𝣵񋸡𝤀𝣠 񏌁𝣢𝤂 𝠃𝤦𝤖񄵡𝣧𝣷񆅁𝤁𝤆񃉡𝤔𝣸 𝠀񃧁񃧉񆿅񆿕񋸥𝠃𝤨𝤛񆿕𝣭𝤉񃧁𝤌𝣱񃧉𝣥𝣱񆿅𝤔𝤊񋸥𝣿𝤕 񏊡𝣡𝤂 𝠀񀀒񀀚񋠥񋡩𝠃𝤝𝤪񋡩𝣷𝤊񀀒𝤈𝣡񋠥𝤍𝤃񀀚𝣯𝣪 𝠀񅡁񂇇񉨬𝠃𝤖𝤥񂇇𝣶𝣦񅡁𝣾𝣵񉨬𝣶𝤂 𝠀񆅱񆅹񇆥񇆵񌁵𝠃𝤢𝥇񆅱𝤎𝤤񆅹𝣯𝤤񇆥𝤉𝤹񇆵𝣩𝤹񌁵𝣴𝣯 񏌁𝣢𝤂';

const signlines = `𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭 this line here
𝠀񂇢񂇈񆙡񋎥񋎵𝠃𝤛𝤬񂇈𝤀𝣺񂇢𝤄𝣻񋎥𝤄𝤗񋎵𝤃𝣟񆙡𝣱𝣸 this line here
𝠀񅨑񀀙񆉁𝠃𝤙𝤞񀀙𝣷𝤀񅨑𝣼𝤀񆉁𝣳𝣮 this line here
񏌁𝣢𝤂 this line here
𝠀񀕁𝠃𝤍𝤕񀕁𝣾𝣷 this line here
𝠀񂌢񂇷񆙡񈗦𝠃𝤩𝤛񂌢𝣢𝣱񂇷𝣬𝤉񆙡𝤍𝣽񈗦𝤜𝤎 this line here
񏊡𝣡𝤂 this line here
𝠀񀀡𝠃𝤎𝤕񀀡𝣿𝣷 this line here
𝠀񀀒񉁩񌏁𝠃𝤮𝤙񌏁𝣴𝣴񀀒𝤙𝣻񉁩𝤙𝣟 this line here
𝠀񀕁񀕉񆇡񈩡񈩽񆇡񋺁񌀇񌀃𝠃𝤲𝤡񀕉𝣨𝤃񀕁𝤖𝤃񌀇𝣴𝣴񆇡𝤙𝣶񆇡𝣩𝣶񈩡𝤊𝣢񈩽𝣕𝣡񌀃𝣴𝣴񋺁𝣽𝣗 this line here
񏊡𝣡𝤂 this line here
𝠀񀕡𝠃𝤎𝤕񀕡𝣿𝣷 this line here
𝠀񀀒񉁩񌏁𝠃𝤮𝤙񌏁𝣴𝣴񀀒𝤙𝣻񉁩𝤙𝣟 this line here
𝠀񀂁񂇻񈟃񆕁𝠃𝤣𝤘񂇻𝤈𝤌񆕁𝣹𝤁񀂁𝤍𝣵񈟃𝣩𝣽 this line here
𝠀񀀡񋎥񀀁𝠃𝤡𝤖񀀁𝤒𝣸񀀡𝣫𝣸񋎥𝣻𝣷 this line here
𝠀񀀓񃛆񆿅񆕁𝠃𝤣𝤟񀀓𝤅𝣯񆕁𝤅𝣽񃛆𝣪𝣮񆿅𝤅𝤐 this line here
񏌁𝣢𝤂 this line here
𝠀񂇢񉳍񂇂񂇈𝠃𝤬𝤘񂇢𝤕𝣵񂇈𝣡𝣴񂇂𝣤𝣵񉳍𝣿𝣼 this line here
𝠀񀀒񀀚񋠥񋡩𝠃𝤝𝤪񋡩𝣷𝤊񀀒𝤈𝣡񋠥𝤍𝤃񀀚𝣯𝣪 this line here
𝠀񃧁񃧉񆿅񆿕񋸥𝠃𝤨𝤛񆿕𝣭𝤉񃧁𝤌𝣱񃧉𝣥𝣱񆿅𝤔𝤊񋸥𝣿𝤕 this line here
񏌁𝣢𝤂 this line here
𝠀񅡁񂇸񈗨񈗨񂇑񂇙񇀥񇀵𝠃𝤤𝤸񂇸𝣨𝣚񂇑𝤕𝤝񂇙𝣳𝤝񅡁𝣼𝣦񇀵𝣱𝣺񈗨𝤊𝣔񇀥𝤔𝣻񈗨𝤖𝣞 this line here
𝠀񄹸񈗦񄾘𝠃𝤭𝤥񄹸𝣞𝣦񄾘𝤔𝤌񈗦𝣽𝣾 this line here
𝠃𝤗𝤜񀀋𝣹𝤍񀁂𝣵𝣱 this line here
񏊡𝣡𝤂 this line here
𝠀񆅁񇅅𝠃𝤏𝤙񆅁𝣿𝣳񇅅𝣾𝤇 this line here
񏌁𝣢𝤂 this line here
𝠃𝤦𝤖񄵡𝣧𝣷񆅁𝤁𝤆񃉡𝤔𝣸 this line here
񏊡𝣡𝤂 this line here
𝠃𝤧𝤬񅩱𝤊𝤝񍳡𝣴𝣴 this line here
𝠃𝤼𝤘񃛋𝣳𝣶񃛃𝤇𝣶񈙇𝤞𝣵񈙓𝣐𝣵񆇡𝤂𝤍 this line here
񏊡𝣡𝤂 this line here
𝠀񂋣񂋫񆕁񇆡𝠃𝤜𝤞񇆡𝣹𝣯񂋣𝤁𝤆񂋫𝣱𝤋񆕁𝣿𝣿 this line here
𝠀񀟡񆄩񆕁񈟃񍩁𝠃𝤟𝥄񆄩𝤉𝤵񀟡𝤐𝤕񆕁𝤁𝤥񈟃𝣰𝤟񍩁𝣴𝣴 this line here
񏊡𝣡𝤂 this line here
𝠃𝤹𝤰񅊰𝣒𝣣񅊂𝣴𝣝񈙆𝤈𝣺񈙖𝣥𝣼񅑢𝤠𝤏񅒐𝣺𝤐 this line here
𝠀񃁁񃁉񋠩񋡭񋸡𝠃𝤦𝤬񃁁𝤇𝤝񃁉𝣥𝤑񋡭𝣯𝣨񋠩𝤌𝣵񋸡𝤀𝣠 this line here
񏌁𝣢𝤂 this line here
𝠃𝤦𝤖񄵡𝣧𝣷񆅁𝤁𝤆񃉡𝤔𝣸 this line here
𝠀񃧁񃧉񆿅񆿕񋸥𝠃𝤨𝤛񆿕𝣭𝤉񃧁𝤌𝣱񃧉𝣥𝣱񆿅𝤔𝤊񋸥𝣿𝤕 this line here
񏊡𝣡𝤂 this line here
𝠀񀀒񀀚񋠥񋡩𝠃𝤝𝤪񋡩𝣷𝤊񀀒𝤈𝣡񋠥𝤍𝤃񀀚𝣯𝣪 this line here
𝠀񅡁񂇇񉨬𝠃𝤖𝤥񂇇𝣶𝣦񅡁𝣾𝣵񉨬𝣶𝤂 this line here
𝠀񆅱񆅹񇆥񇆵񌁵𝠃𝤢𝥇񆅱𝤎𝤤񆅹𝣯𝤤񇆥𝤉𝤹񇆵𝣩𝤹񌁵𝣴𝣯 this line here
񏌁𝣢𝤂 this line here`;

it('should return matching signs', () => {
  expect(results('QA񅡁T', signtext)).toEqual(['𝠀񅡁񂇸񈗨񈗨񂇑񂇙񇀥񇀵𝠃𝤤𝤸񂇸𝣨𝣚񂇑𝤕𝤝񂇙𝣳𝤝񅡁𝣼𝣦񇀵𝣱𝣺񈗨𝤊𝣔񇀥𝤔𝣻񈗨𝤖𝣞', '𝠀񅡁񂇇񉨬𝠃𝤖𝤥񂇇𝣶𝣦񅡁𝣾𝣵񉨬𝣶𝤂']);
  expect(results('QA񆅱񆅹frT񇆥񌁵fr𝣲𝣲', signtext)).toEqual(['𝠀񆅱񆅹񇆥񇆵񌁵𝠃𝤢𝥇񆅱𝤎𝤤񆅹𝣯𝤤񇆥𝤉𝤹񇆵𝣩𝤹񌁵𝣴𝣯']);
})

it('should return lines with matching sign at start', () => {
  expect(lines('QA񅡁T', signlines)).toEqual(['𝠀񅡁񂇸񈗨񈗨񂇑񂇙񇀥񇀵𝠃𝤤𝤸񂇸𝣨𝣚񂇑𝤕𝤝񂇙𝣳𝤝񅡁𝣼𝣦񇀵𝣱𝣺񈗨𝤊𝣔񇀥𝤔𝣻񈗨𝤖𝣞 this line here', '𝠀񅡁񂇇񉨬𝠃𝤖𝤥񂇇𝣶𝣦񅡁𝣾𝣵񉨬𝣶𝤂 this line here']);
  expect(lines('QA񆅱񆅹frT񇆥񌁵fr𝣲𝣲', signlines)).toEqual(['𝠀񆅱񆅹񇆥񇆵񌁵𝠃𝤢𝥇񆅱𝤎𝤤񆅹𝣯𝤤񇆥𝤉𝤹񇆵𝣩𝤹񌁵𝣴𝣯 this line here']);
})
