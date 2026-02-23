/**
 * Patches the Lingo Compiler cache files with missing translations
 * for strings added after the free-plan quota was exhausted.
 *
 * Run once: node scripts/patch-cache.js
 */
const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '..', 'app', 'lingo', 'cache');

// Missing translations keyed by locale → hash → translation
const PATCHES = {
  es: {
    '7b0d970dcc31': '{expression0} registro{expression1}',
    '635b7c43d541': 'Exportar CSV',
    'dd51e1133d43': '{expression0} perspectiva{expression1}',
    'a522b2e89f9c': 'Haga clic en Generar para analizar los registros.',
    '887698d8f45f': 'Alertas',
    'fc4179f17a24': 'Gestionar y rastrear alertas del sistema',
    '2d5f78e29da3': 'Nueva Alerta',
    '895c4448bb3f': 'En vivo — Transmisión en tiempo real activa',
  },
  fr: {
    '7b0d970dcc31': '{expression0} entrée{expression1}',
    '635b7c43d541': 'Exporter CSV',
    'dd51e1133d43': '{expression0} information{expression1}',
    'a522b2e89f9c': 'Cliquez sur Générer pour analyser les journaux.',
    '887698d8f45f': 'Alertes',
    'fc4179f17a24': 'Gérer et suivre les alertes système',
    '2d5f78e29da3': 'Nouvelle Alerte',
    '895c4448bb3f': 'En direct — Diffusion en temps réel active',
  },
  de: {
    '7b0d970dcc31': '{expression0} Log{expression1}',
    '635b7c43d541': 'CSV exportieren',
    'dd51e1133d43': '{expression0} Insight{expression1}',
    'a522b2e89f9c': 'Klicken Sie auf Generieren, um Protokolle zu analysieren.',
    '887698d8f45f': 'Warnmeldungen',
    'fc4179f17a24': 'Systemwarnmeldungen verwalten und verfolgen',
    '2d5f78e29da3': 'Neue Warnung',
    '895c4448bb3f': 'Live — Echtzeit-Streaming aktiv',
  },
  ja: {
    '7b0d970dcc31': '{expression0} 件のログ',
    '635b7c43d541': 'CSVエクスポート',
    'dd51e1133d43': '{expression0} 件のインサイト',
    'a522b2e89f9c': '生成をクリックしてログを分析してください。',
    '887698d8f45f': 'アラート',
    'fc4179f17a24': 'システムアラートを管理および追跡する',
    '2d5f78e29da3': '新しいアラート',
    '895c4448bb3f': 'ライブ — リアルタイムストリーミング有効',
  },
  zh: {
    '274b943dcfcf': '正在切换语言…',
    '7b0d970dcc31': '{expression0} 条日志',
    '635b7c43d541': '导出 CSV',
    'dd51e1133d43': '{expression0} 条洞察',
    'a522b2e89f9c': '点击生成以分析日志。',
    '887698d8f45f': '警报',
    'fc4179f17a24': '管理和跟踪系统警报',
    '2d5f78e29da3': '新建警报',
    '895c4448bb3f': '实时 — 实时流媒体已激活',
  },
};

let totalPatched = 0;
for (const [locale, patches] of Object.entries(PATCHES)) {
  const file = path.join(CACHE_DIR, `${locale}.json`);
  const cache = JSON.parse(fs.readFileSync(file, 'utf8'));
  let count = 0;
  for (const [hash, translation] of Object.entries(patches)) {
    if (!cache.entries[hash]) {
      cache.entries[hash] = translation;
      count++;
    }
  }
  fs.writeFileSync(file, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`✓ ${locale}: patched ${count} missing entries`);
  totalPatched += count;
}
console.log(`\nTotal entries patched: ${totalPatched}`);
console.log('Cache files are ready for build.');