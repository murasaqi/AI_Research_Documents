---
title: Docusaurusのカスタマイズ - 日付表示とカラーパレット
tags: [docusaurus, customization, ui-design, claude-code]
date: 2025-01-29
---

# Docusaurusのカスタマイズ - 日付表示とカラーパレット

## 背景

AI Research Chronicleサイトの使いやすさを向上させるため、以下のカスタマイズを実施しました：

1. 記事一覧での作成日表示機能の追加
2. ダークモードをデフォルトに設定
3. 紫をキーカラーとしたカラーパレットへの変更

## 実施内容

### 1. 記事一覧への日付表示機能の追加

#### 初回実装の課題

最初の実装では、日付が記事タイトルの横に表示される設計でしたが、視覚的に窮屈になる問題がありました。

#### 改善された実装

##### プラグインの作成

カスタムプラグインを作成して、サイドバーに日付を表示する機能を実装：

**`src/plugins/addDateToSidebar.js`**
```javascript
module.exports = function() {
  return {
    name: 'add-date-to-sidebar',
    async contentLoaded({content, actions}) {
      // This plugin doesn't need to do anything here
    },
    getClientModules() {
      return [require.resolve('./addDateToSidebarClient.js')];
    },
  };
};
```

**`src/plugins/addDateToSidebarClient.js`**
```javascript
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  console.log('Date sidebar plugin loaded');
  
  // Function to add dates to sidebar items
  function addDatesToSidebar() {
    // Find all sidebar links
    const sidebarLinks = document.querySelectorAll('.menu__link');
    console.log('Found sidebar links:', sidebarLinks.length);
    
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || link.querySelector('.sidebar-date')) return; // Skip if no href or already has date
      
      // Extract date from URL if it matches the date pattern
      const dateMatch = href.match(/(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        const dateStr = dateMatch[1];
        
        // Create a wrapper div to contain both title and date
        const wrapper = document.createElement('div');
        wrapper.className = 'sidebar-item-wrapper';
        
        // Clone the link content
        const titleText = link.textContent.trim();
        
        // Create title element
        const titleElement = document.createElement('div');
        titleElement.className = 'sidebar-item-title';
        titleElement.textContent = titleText;
        
        // Create date element
        const dateElement = document.createElement('div');
        dateElement.className = 'sidebar-date';
        dateElement.textContent = dateStr;
        
        // Clear the link and add the new structure
        link.textContent = '';
        wrapper.appendChild(titleElement);
        wrapper.appendChild(dateElement);
        link.appendChild(wrapper);
      }
    });
  }
  
  // Use a more robust approach to ensure the sidebar is loaded
  function initializeDateDisplay() {
    // Try to add dates immediately
    addDatesToSidebar();
    
    // Set up mutation observer for dynamic updates
    const observer = new MutationObserver((mutations) => {
      // Only process if there are actual link changes
      const hasLinkChanges = mutations.some(mutation => 
        mutation.type === 'childList' && 
        (mutation.target.classList.contains('menu__list') || 
         mutation.target.classList.contains('menu__link'))
      );
      
      if (hasLinkChanges) {
        addDatesToSidebar();
      }
    });
    
    // Observe the entire document for sidebar changes
    const targetNode = document.querySelector('.theme-doc-sidebar-container') || document.body;
    observer.observe(targetNode, { 
      childList: true, 
      subtree: true 
    });
  }
  
  // Try multiple initialization strategies
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDateDisplay);
  } else {
    initializeDateDisplay();
  }
  
  // Also try after a short delay to catch late-loading content
  setTimeout(initializeDateDisplay, 1000);
}
```

##### プラグインの登録

`docusaurus.config.js`に以下を追加：

```javascript
plugins: [
  './src/plugins/addDateToSidebar',
],
```

##### スタイリング

日付を控えめに表示するためのCSS：

```css
/* Custom styles for sidebar dates */
.sidebar-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-item-title {
  font-size: 1em;
  line-height: 1.3;
}

.sidebar-date {
  color: var(--ifm-color-emphasis-500);
  font-size: 0.75em;
  font-weight: normal;
  opacity: 0.8;
  line-height: 1.2;
}

/* Dark mode adjustments */
[data-theme='dark'] .sidebar-date {
  color: var(--ifm-color-emphasis-600);
  opacity: 0.6;
}

/* Ensure proper link styling */
.menu__link {
  display: block;
  padding: var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal);
}

.menu__link:hover .sidebar-date {
  opacity: 1;
}
```

### 2. ダークモードをデフォルトに設定

`docusaurus.config.js`のthemeConfigに以下を追加：

```javascript
colorMode: {
  defaultMode: 'dark',
  disableSwitch: false,
  respectPrefersColorScheme: false,
},
```

### 3. 紫をキーカラーとしたカラーパレット

`src/css/custom.css`でカラー変数を定義：

```css
/* You can override the default Infima variables here. */
:root {
  /* Purple color palette for light mode */
  --ifm-color-primary: #7c3aed;
  --ifm-color-primary-dark: #6d28d9;
  --ifm-color-primary-darker: #5b21b6;
  --ifm-color-primary-darkest: #4c1d95;
  --ifm-color-primary-light: #8b5cf6;
  --ifm-color-primary-lighter: #a78bfa;
  --ifm-color-primary-lightest: #c4b5fd;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(124, 58, 237, 0.1);
}

/* For readability concerns, you should choose a lighter palette in dark mode. */
[data-theme='dark'] {
  /* Purple color palette for dark mode - lighter shades for better readability */
  --ifm-color-primary: #a78bfa;
  --ifm-color-primary-dark: #8b5cf6;
  --ifm-color-primary-darker: #7c3aed;
  --ifm-color-primary-darkest: #6d28d9;
  --ifm-color-primary-light: #c4b5fd;
  --ifm-color-primary-lighter: #ddd6fe;
  --ifm-color-primary-lightest: #ede9fe;
  --docusaurus-highlighted-code-line-bg: rgba(167, 139, 250, 0.2);
}
```

## 技術的なポイント

### 1. MutationObserverの活用

サイドバーは動的に更新されるため、MutationObserverを使用して変更を監視し、新しく追加された記事にも日付を表示できるようにしました。

### 2. 複数の初期化戦略

Docusaurusの読み込みタイミングに対応するため、以下の複数の初期化方法を実装：
- DOMContentLoadedイベント
- 即時実行
- タイムアウトによる遅延実行

### 3. ダークモードでの視認性

ダークモードでは明るい紫色を使用し、コントラスト比を確保して読みやすさを維持しました。

## まとめ

これらのカスタマイズにより、AI Research Chronicleサイトは以下の改善を実現しました：

1. **情報の階層化**: 日付を別行に表示することで、タイトルと日付の視覚的な区別が明確に
2. **視覚的な快適性**: ダークモードのデフォルト化により、長時間の閲覧でも目に優しい
3. **ブランディング**: 紫のカラーパレットにより、知的でエレガントな印象を演出

今後も使いやすさを追求して、継続的な改善を行っていく予定です。