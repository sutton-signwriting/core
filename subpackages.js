
const fs = require('fs');

// fs.copyFile(`src/index.d.ts`, `core.d.ts`, (err) => {
//   if (err) throw err;
// })

var package = JSON.parse(fs.readFileSync('package.json'));

['style', 'fsw', 'fswquery', 'swu', 'swuquery', 'convert'].map(section => {
  fs.writeFile(`${section}/package.json`, JSON.stringify({
    name: `${package.name}/${section}`,
    version: package.version,
    main: `${section}.min.cjs`,
    module: `${section}.min.mjs`,
    browser: `${section}.min.js`,
    unpkg: `${section}.min.js`,
    exports: {
      require: `${section}.min.cjs`,
      import: `${section}.min.mjs`,
      default: `${section}.min.js`
    },
    types: `${section}.d.ts`,
    author: package.author,
    license: package.license,
    homepage: package.homepage,
    bugs: package.bugs
  }, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  });
//  fs.copyFile(`src/${section}/index.d.ts`, `${section}/${section}.d.ts`, (err) => {
//    if (err) throw err;
//  })
})
