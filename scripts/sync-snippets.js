#!/usr/bin/env node

/**
 * Snippet Sync Script for @pure-admin/svelte
 *
 * Compares snippet hashes from pure-admin-core/snippets/manifest.json
 * with local .snippets-manifest.json to detect changes.
 *
 * Usage:
 *   node scripts/sync-snippets.js          # Check for changes
 *   node scripts/sync-snippets.js --update # Update local manifest
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_MANIFEST = path.resolve(ROOT_DIR, '../pure-admin/pure-admin-core/snippets/manifest.json');
const LOCAL_MANIFEST = path.resolve(ROOT_DIR, 'snippets-manifest.json');
const SNIPPETS_DIR = path.resolve(ROOT_DIR, '../pure-admin/pure-admin-core/snippets');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function readManifest(filePath) {
  if (!fs.existsSync(filePath)) {
    return { generated: new Date().toISOString(), version: '0.0.0', snippets: {} };
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeManifest(filePath, manifest) {
  fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2), 'utf-8');
}

function compareManifests(source, local) {
  const changes = {
    added: [],
    modified: [],
    deleted: [],
    unchanged: []
  };

  const sourceSnippets = source.snippets || {};
  const localSnippets = local.snippets || {};

  // Find added and modified
  for (const [filename, sourceData] of Object.entries(sourceSnippets)) {
    if (!localSnippets[filename]) {
      changes.added.push({
        filename,
        hash: sourceData.hash,
        size: sourceData.size,
        modified: sourceData.modified
      });
    } else if (localSnippets[filename].hash !== sourceData.hash) {
      changes.modified.push({
        filename,
        oldHash: localSnippets[filename].hash,
        newHash: sourceData.hash,
        oldModified: localSnippets[filename].modified,
        newModified: sourceData.modified
      });
    } else {
      changes.unchanged.push(filename);
    }
  }

  // Find deleted
  for (const filename of Object.keys(localSnippets)) {
    if (!sourceSnippets[filename]) {
      changes.deleted.push(filename);
    }
  }

  return changes;
}

function getComponentMapping() {
  return {
    'alerts.html': ['src/lib/feedback/Alert.svelte'],
    'badges.html': ['src/lib/display/Badge.svelte', 'src/lib/display/CompositeBadge.svelte', 'src/lib/display/BadgeGroup.svelte'],
    'buttons.html': ['src/lib/buttons/Button.svelte', 'src/lib/buttons/ButtonGroup.svelte'],
    'cards.html': ['src/lib/display/Card.svelte'],
    'checkbox-lists.html': ['(Not yet componentized - specialized component)'],
    'code.html': ['src/lib/display/Code.svelte', 'src/lib/display/CodeBlock.svelte'],
    'command-palette.html': ['src/lib/navigation/CommandPalette.svelte'],
    'comparison.html': ['(Not componentized - raw HTML in pages)'],
    'customization.html': ['(Documentation only - CSS variables)'],
    'forms.html': [
      'src/lib/forms/Input.svelte',
      'src/lib/forms/Textarea.svelte',
      'src/lib/forms/Select.svelte',
      'src/lib/forms/Checkbox.svelte',
      'src/lib/forms/Radio.svelte',
      'src/lib/forms/FormGroup.svelte',
      'src/lib/forms/FormLabel.svelte',
      'src/lib/forms/InputGroup.svelte',
      'src/lib/forms/InputGroupPrepend.svelte',
      'src/lib/forms/InputGroupAppend.svelte'
    ],
    'grid.html': ['src/lib/layout/Grid.svelte', 'src/lib/layout/Column.svelte'],
    'layout.html': [
      'src/lib/layout/Layout.svelte',
      'src/lib/layout/LayoutInner.svelte',
      'src/lib/layout/LayoutContent.svelte',
      'src/lib/layout/Navbar.svelte',
      'src/lib/layout/Sidebar.svelte',
      'src/lib/layout/SidebarItem.svelte',
      'src/lib/layout/Main.svelte',
      'src/lib/layout/Footer.svelte'
    ],
    'lists.html': [
      'src/lib/display/BasicList.svelte',
      'src/lib/display/OrderedList.svelte',
      'src/lib/display/DefinitionList.svelte',
      'src/lib/display/List.svelte',
      'src/lib/display/ListItem.svelte'
    ],
    'loaders.html': ['src/lib/feedback/Spinner.svelte'],
    'modals.html': ['src/lib/feedback/Modal.svelte'],
    'popconfirm.html': ['src/lib/feedback/Popconfirm.svelte'],
    'profile.html': ['src/lib/profile/ProfilePanel.svelte'],
    'tables.html': ['src/lib/display/Table.svelte', 'src/lib/display/Pager.svelte', 'src/lib/display/LoadMore.svelte'],
    'tabs.html': [
      'src/lib/navigation/Tabs.svelte',
      'src/lib/navigation/TabItem.svelte',
      'src/lib/navigation/TabsContent.svelte',
      'src/lib/navigation/TabPanel.svelte',
      'src/lib/navigation/TabsContainer.svelte',
      'src/lib/display/Card.svelte (for card tabs)'
    ],
    'timeline.html': ['src/lib/display/Timeline.svelte', 'src/lib/display/TimelineItem.svelte'],
    'toasts.html': ['src/lib/feedback/Toast.svelte', 'src/lib/feedback/ToastContainer.svelte'],
    'tooltips.html': ['src/lib/feedback/Tooltip.svelte', 'src/lib/feedback/Popover.svelte'],
    'utilities.html': ['(CSS utilities - no components)'],
    'virtual-scroll.html': ['(Not yet componentized - advanced feature)']
  };
}

function printChanges(changes) {
  const componentMap = getComponentMapping();
  let hasChanges = false;

  if (changes.added.length > 0) {
    hasChanges = true;
    log('\n📦 NEW SNIPPETS:', 'green');
    changes.added.forEach(item => {
      log(`  + ${item.filename}`, 'green');
      log(`    Size: ${item.size} bytes`, 'gray');
      log(`    Modified: ${new Date(item.modified).toLocaleString()}`, 'gray');
      const components = componentMap[item.filename] || ['(No component mapping)'];
      log(`    Components: ${components.join(', ')}`, 'cyan');
    });
  }

  if (changes.modified.length > 0) {
    hasChanges = true;
    log('\n🔄 MODIFIED SNIPPETS:', 'yellow');
    changes.modified.forEach(item => {
      log(`  ~ ${item.filename}`, 'yellow');
      log(`    Old: ${new Date(item.oldModified).toLocaleString()}`, 'gray');
      log(`    New: ${new Date(item.newModified).toLocaleString()}`, 'gray');
      const components = componentMap[item.filename] || ['(No component mapping)'];
      log(`    Affected components:`, 'yellow');
      components.forEach(comp => log(`      - ${comp}`, 'cyan'));
    });
  }

  if (changes.deleted.length > 0) {
    hasChanges = true;
    log('\n❌ DELETED SNIPPETS:', 'red');
    changes.deleted.forEach(filename => {
      log(`  - ${filename}`, 'red');
      const components = componentMap[filename] || ['(No component mapping)'];
      log(`    Components: ${components.join(', ')}`, 'cyan');
    });
  }

  if (!hasChanges) {
    log('\n✅ All snippets are up to date!', 'green');
    log(`   ${changes.unchanged.length} snippets unchanged`, 'gray');
  }

  return hasChanges;
}

function printSummary(changes) {
  log('\n' + '='.repeat(60), 'gray');
  log('SUMMARY:', 'blue');
  log(`  Added:     ${changes.added.length}`, changes.added.length > 0 ? 'green' : 'gray');
  log(`  Modified:  ${changes.modified.length}`, changes.modified.length > 0 ? 'yellow' : 'gray');
  log(`  Deleted:   ${changes.deleted.length}`, changes.deleted.length > 0 ? 'red' : 'gray');
  log(`  Unchanged: ${changes.unchanged.length}`, 'gray');
  log('='.repeat(60), 'gray');
}

function main() {
  const args = process.argv.slice(2);
  const shouldUpdate = args.includes('--update');

  log('\n🔍 Pure Admin Snippet Sync', 'blue');
  log('━'.repeat(60), 'gray');

  // Check if source manifest exists
  if (!fs.existsSync(SOURCE_MANIFEST)) {
    log(`\n❌ ERROR: Source manifest not found at:`, 'red');
    log(`   ${SOURCE_MANIFEST}`, 'gray');
    process.exit(1);
  }

  // Read manifests
  log('\n📖 Reading manifests...', 'cyan');
  const sourceManifest = readManifest(SOURCE_MANIFEST);
  const localManifest = readManifest(LOCAL_MANIFEST);

  log(`   Source: ${sourceManifest.version} (${new Date(sourceManifest.generated).toLocaleString()})`, 'gray');
  log(`   Local:  ${localManifest.version} (${new Date(localManifest.generated).toLocaleString()})`, 'gray');

  // Compare
  log('\n🔄 Comparing snippets...', 'cyan');
  const changes = compareManifests(sourceManifest, localManifest);

  // Print results
  const hasChanges = printChanges(changes);
  printSummary(changes);

  // Update if requested
  if (shouldUpdate) {
    log('\n💾 Updating local manifest...', 'cyan');
    writeManifest(LOCAL_MANIFEST, sourceManifest);
    log('   ✅ Local manifest updated!', 'green');
  } else if (hasChanges) {
    log('\n💡 TIP: Run with --update to sync the local manifest:', 'yellow');
    log('   node scripts/sync-snippets.js --update', 'gray');
  }

  log('\n');
}

main();
