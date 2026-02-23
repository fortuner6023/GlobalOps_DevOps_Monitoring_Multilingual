const fs = require('fs');
const base = 'app/lingo/cache';
const en = JSON.parse(fs.readFileSync(base + '/en.json'));
const enKeys = Object.keys(en.entries);
['es','fr','de','ja','zh'].forEach(l => {
  const d = JSON.parse(fs.readFileSync(base + '/' + l + '.json'));
  const lKeys = new Set(Object.keys(d.entries));
  const miss = enKeys.filter(k => !lKeys.has(k));
  console.log(l, 'missing', miss.length, ':');
  miss.forEach(k => console.log('  ', k, '=', JSON.stringify(en.entries[k])));
});