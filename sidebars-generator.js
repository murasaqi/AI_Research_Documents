const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Filter out documents with 'ignore' tag
 */
function filterIgnoredDocs(items, docsPath) {
  return items.filter(item => {
    if (typeof item === 'string') {
      // Check if this doc has ignore tag
      const docPath = path.join(docsPath, `${item}.md`);
      try {
        const content = fs.readFileSync(docPath, 'utf8');
        const { data } = matter(content);
        const tags = data.tags || [];
        
        if (tags.includes('ignore')) {
          console.log(`Filtering out ignored doc: ${item}`);
          return false;
        }
      } catch (error) {
        // If file doesn't exist or can't be read, include it
        console.warn(`Could not read ${docPath}:`, error.message);
      }
    }
    return true;
  });
}

/**
 * Generate sidebars with ignored docs filtered out
 */
function generateSidebars() {
  const docsPath = path.join(__dirname, 'docs');
  
  // Original sidebar items
  const allItems = [
    '2025-07-29-claude-session-logging-with-screenshots',
    '2025-07-29-AIテックブログのToDo',
    '2025-01-29-ai-knowledge-logger-project',
    '2025-01-29-ai-sketch-to-3d-game-asset',
    '2025-01-29-docusaurus-customization',
    '2025-01-28-ai-dialogue-format',
    '2025-01-28-claude-code-conversations',
    '2025-01-28-docusaurus-setup',
    '2025-01-28-getting-started',
    'ai-dialogue-format-template',
    'blank-template',
    'mermaid-test',
  ];
  
  // Filter out ignored docs
  const filteredItems = filterIgnoredDocs(allItems, docsPath);
  
  return {
    tutorialSidebar: [
      'intro',
      {
        type: 'category',
        label: 'すべてのメモ',
        collapsed: false,
        items: filteredItems,
      },
    ],
  };
}

module.exports = generateSidebars();