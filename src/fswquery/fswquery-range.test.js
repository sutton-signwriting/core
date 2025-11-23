import { range } from './fswquery-range';

describe('range function', () => {
  // Set to true to test all combinations, false to sample randomly
  const EXHAUSTIVE = false;
  // Sample rate when not exhaustive (0.0 to 1.0)
  const SAMPLE_RATE = 0.05; // Test ~5% of cases
  
  const shouldTest = (exhaustive) => {
    return exhaustive || Math.random() < SAMPLE_RATE;
  };

  it('should generate correct regex patterns for all 3-digit decimal ranges', () => {
    const failures = [];
    const errors = [];
    let testedCount = 0;
    let totalCount = 0;

    for (let start = 250; start <= 749; start++) {
      for (let end = start; end <= 749; end++) {
        totalCount++;
        
        if (!shouldTest(EXHAUSTIVE)) continue;
        testedCount++;
        
        try {
          const regexPattern = range(start, end);
          const regex = new RegExp(regexPattern);
          
          for (let num = 100; num <= 999; num++) {
            const numStr = num.toString().padStart(3, '0');
            const regexMatch = regex.test(numStr);
            const numericalMatch = num >= start && num <= end;
            
            if (regexMatch !== numericalMatch) {
              failures.push({
                start,
                end,
                num,
                regexMatch,
                numericalMatch,
                pattern: regexPattern
              });
            }
          }
        } catch (e) {
          errors.push({
            start,
            end,
            error: e.message
          });
        }
      }
    }

    // console.log(`Decimal: Tested ${testedCount} of ${totalCount} ranges (${(testedCount/totalCount*100).toFixed(1)}%)`);

    if (failures.length > 0) {
      console.log('Decimal failures:', failures.slice(0, 10));
      fail(`Found ${failures.length} decimal range failures. First failure: start=${failures[0].start}, end=${failures[0].end}, num=${failures[0].num}`);
    }

    if (errors.length > 0) {
      console.log('Decimal errors:', errors.slice(0, 10));
      fail(`Found ${errors.length} decimal range errors. First error: start=${errors[0].start}, end=${errors[0].end}, error=${errors[0].error}`);
    }
  });

  it('should generate correct regex patterns for all 3-digit hex ranges', () => {
    const numToHex = (num) => num.toString(16).padStart(3, '0');
    const failures = [];
    const errors = [];
    let testedCount = 0;
    let totalCount = 0;

    for (let startNum = 0x100; startNum <= 0x38b; startNum++) {
      const start = numToHex(startNum);
      
      for (let endNum = startNum; endNum <= 0x38b; endNum++) {
        const end = numToHex(endNum);
        totalCount++;
        
        if (!shouldTest(EXHAUSTIVE)) continue;
        testedCount++;
        
        try {
          const regexPattern = range(start, end, 'hex');
          const regex = new RegExp(regexPattern);
          
          for (let num = 0x100; num <= 0xfff; num++) {
            const numStr = numToHex(num);
            const regexMatch = regex.test(numStr);
            const numericalMatch = num >= startNum && num <= endNum;
            
            if (regexMatch !== numericalMatch) {
              failures.push({
                start,
                end,
                num: numStr,
                regexMatch,
                numericalMatch,
                pattern: regexPattern
              });
            }
          }
        } catch (e) {
          errors.push({
            start,
            end,
            error: e.message,
            pattern: regexPattern
          });
        }
      }
    }

    // console.log(`Hex: Tested ${testedCount} of ${totalCount} ranges (${(testedCount/totalCount*100).toFixed(1)}%)`);

    if (failures.length > 0) {
      console.log('Hex failures:', failures.slice(0, 10));
      fail(`Found ${failures.length} hex range failures. First failure: start=${failures[0].start}, end=${failures[0].end}, num=${failures[0].num}, pattern=${failures[0].pattern}`);
    }

    if (errors.length > 0) {
      console.log('Hex errors:', errors.slice(0, 10));
      fail(`Found ${errors.length} hex range errors. First error: start=${errors[0].start}, end=${errors[0].end}, error=${errors[0].error}`);
    }
  });
});