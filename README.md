# AI Research Documents

A Docusaurus-based knowledge base for documenting AI research, development notes, experimental results, and ideas in chronological order.

## 🚀 GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to your repository settings: https://github.com/murasaqi/AI_Research_Documents/settings/pages
2. Under "Build and deployment", select:
   - **Source**: GitHub Actions
3. The workflow will automatically run when you push to the main branch
4. After the first deployment, your site will be available at: https://murasaqi.github.io/AI_Research_Documents/

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build the site
npm run build

# Serve the built site locally
npm run serve
```

## 📝 Adding New Documents

1. Create a new markdown file in the `docs/` folder
2. Use the naming convention: `YYYY-MM-DD-title.md`
3. Add frontmatter with title, tags, and date
4. The document will automatically appear in the sidebar

## 🎨 Features

- 🌙 Dark mode by default
- 💜 Custom purple theme
- 📅 Automatic date display in sidebar
- 📱 Responsive design
- 🔍 Search functionality
- 📊 Mermaid diagram support

## 📄 License

This project is for personal use to document AI research and experiments.