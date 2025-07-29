// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'すべてのメモ',
      collapsed: false,
      items: [
        '2025-07-29-claude-session-logging-with-screenshots',
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
      ],
    },
  ],
};

export default sidebars;