echo "additional type definitions"
tsc src/types.js --declaration --emitDeclarationOnly --allowJs

echo "full core definitions"
tsc core.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> core.d.ts

echo "fsw definitions"
tsc fsw/fsw.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> fsw/fsw.d.ts

echo "fswquery definitions"
tsc fswquery/fswquery.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> fswquery/fswquery.d.ts

echo "swu definitions"
tsc swu/swu.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> swu/swu.d.ts

echo "swuquery definitions"
tsc swuquery/swuquery.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> swuquery/swuquery.d.ts

echo "style definitions"
tsc style/style.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> style/style.d.ts

echo "convert definitions"
tsc convert/convert.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> convert/convert.d.ts
