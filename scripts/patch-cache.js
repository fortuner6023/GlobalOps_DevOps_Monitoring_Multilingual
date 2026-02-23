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
    // Landing page strings (round 2)
    '95c4e804c1e7': '🏆 Creado para el <a0>Hackathon de Lingo.dev </a0> — Feb 2026 · Usa las 5 herramientas de Lingo.dev',
    '1b9aac5c2a01': 'GitHub',
    '8e16b0095462': 'El mismo mensaje de registro — traducido en vivo en 6 idiomas',
    '9ac98f6e8fdc': 'Véalo en acción',
    '4bb88a4f2990': 'Cambia el idioma desde el panel y observa cómo los registros, alertas e información de IA se actualizan instantáneamente, todo impulsado por el SDK de Lingo.dev en tiempo real.',
    'bda1c4ba3e5a': 'Abrir Panel',
    '1958921f1856': '·',
    // Round 1
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
    // Landing page strings (round 2)
    '95c4e804c1e7': '🏆 Conçu pour le <a0>Hackathon Lingo.dev </a0> — Fév 2026 · Utilise les 5 outils Lingo.dev',
    '1b9aac5c2a01': 'GitHub',
    '8e16b0095462': 'Le même message de journal — traduit en direct dans 6 langues',
    '9ac98f6e8fdc': 'Voir en action',
    '4bb88a4f2990': 'Changez de langue depuis le tableau de bord et regardez les journaux, alertes et insights IA se mettre à jour instantanément — tout propulsé par le SDK Lingo.dev en temps réel.',
    'bda1c4ba3e5a': 'Ouvrir le tableau de bord',
    '1958921f1856': '·',
    // Round 1
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
    // Landing page strings (round 2)
    '95c4e804c1e7': '🏆 Entwickelt für den <a0>Lingo.dev Hackathon </a0> — Feb 2026 · Verwendet alle 5 Lingo.dev-Tools',
    '1b9aac5c2a01': 'GitHub',
    '8e16b0095462': 'Dieselbe Protokollnachricht — live in 6 Sprachen übersetzt',
    '9ac98f6e8fdc': 'In Aktion sehen',
    '4bb88a4f2990': 'Wechseln Sie die Sprache im Dashboard und beobachten Sie, wie Protokolle, Warnungen und KI-Insights sofort aktualisiert werden — alles über das Lingo.dev SDK in Echtzeit.',
    'bda1c4ba3e5a': 'Dashboard öffnen',
    '1958921f1856': '·',
    // Round 1
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
    // Landing page strings (round 2)
    '95c4e804c1e7': '🏆 <a0>Lingo.devハッカソン </a0>のために構築 — 2026年2月 · 5つのLingo.devツールをすべて使用',
    '1b9aac5c2a01': 'GitHub',
    '8e16b0095462': '同じログメッセージ — 6言語でライブ翻訳',
    '9ac98f6e8fdc': '実際に見る',
    '4bb88a4f2990': 'ダッシュボードから言語を切り替えると、ログ、アラート、AIインサイトがすべて即座に更新されます — すべてLingo.dev SDKによってリアルタイムで実行されます。',
    'bda1c4ba3e5a': 'ダッシュボードを開く',
    '1958921f1856': '·',
    // Round 1
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
    // Landing page strings (round 2)
    '95c4e804c1e7': '🏆 为<a0>Lingo.dev 黑客松 </a0>而构建 — 2026年2月 · 使用全部5个Lingo.dev工具',
    '1b9aac5c2a01': 'GitHub',
    '8e16b0095462': '相同的日志消息 — 实时翻译成6种语言',
    '9ac98f6e8fdc': '查看实际效果',
    '4bb88a4f2990': '从仪表板切换语言，观看日志、警报和AI洞察立即更新 — 全部由Lingo.dev SDK实时驱动。',
    'bda1c4ba3e5a': '打开仪表板',
    '1958921f1856': '·',
    // Round 1
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