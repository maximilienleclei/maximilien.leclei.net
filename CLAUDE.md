# CLAUDE.md - Context for Future Sessions

## Project Overview

This is a personal philosophy website for Maximilien Le Cleï, hosted on GitHub Pages. The website features:
- Personal blog posts about unconditional universal love and philosophy
- Homepage displaying all blog posts in full (newest → oldest)
- Individual pages for each blog post (for direct linking/SEO)
- Technological approach page (AI journey from 2015 to present)
- Dark theme matching professional site (#000000 black background)
- Automated markdown-to-HTML conversion pipeline

## Key Files

### Source Files (Markdown - EDIT THESE)
- **markdown/main.md**: Homepage introduction ("TLDR: I like to think a lot...")
- **markdown/technological_approach.md**: AI journey and technological background
- **markdown/blog/01.md through 10.md**: Blog posts (source of truth)
- **markdown/blog/drafts.md**: Unpublished drafts (ignored by build script)

### Generated Files (HTML - AUTO-GENERATED, DON'T EDIT)
- **index.html**: Homepage with intro + all 10 blog posts
- **technological_approach.html**: Tech journey page
- **blog/01.html through 10.html**: Individual blog post pages

### Build System
- **generate-html.js**: Node.js build script that converts markdown → HTML
- **package.json**: Dependencies (markdown-it)
- **.github/workflows/generate-html.yml**: GitHub Actions automation

### Design Files
- **styles.css**: Stylesheet (based on professional site + blog additions)
- **image.png**: Profile photo (1.4M, also used as favicon)

### Configuration
- **CNAME**: Custom domain (maximilien.leclei.net)
- **.gitignore**: Excludes node_modules/

## Critical Requirement: ZERO TEXT MODIFICATION

**MOST IMPORTANT:** The build system NEVER modifies text from markdown files.

- markdown-it parser only adds HTML tags, never changes words
- Text is preserved character-for-character
- Spacing, punctuation, line breaks all preserved exactly
- This is verified by comparing markdown source with generated HTML

## How Content Updates Work

### Adding a New Blog Post

1. **Create markdown file** - e.g., `markdown/blog/11.md`
   ```markdown
   # Your Blog Title Here

   First paragraph...

   Second paragraph...
   ```

2. **Push to GitHub** - Commit and push the markdown file
   ```bash
   git add markdown/blog/11.md
   git commit -m "Add blog post 11"
   git push
   ```

3. **GitHub Actions automatically**:
   - Detects changes to markdown files
   - Runs `node generate-html.js`
   - Generates `blog/11.html`, updates `index.html` and dropdown menu
   - Commits generated HTML back to repo with `[skip ci]` tag
   - GitHub Pages deploys everything

4. **Website updates** in 2-3 minutes

### Updating Existing Content

1. **Edit markdown file** - Edit any file in `markdown/` directory
2. **Push to GitHub** - Changes trigger automatic regeneration
3. **All HTML regenerated** - Ensures consistency across all pages

### Local Testing

```bash
npm run build  # Generate HTML locally
# Open index.html in browser to preview
```

## Build Script Details (generate-html.js)

### What It Does

1. **Reads all markdown files** from `markdown/` directory
2. **Converts to HTML** using markdown-it (text preserved exactly)
3. **Wraps in templates** (header, navigation, social links, footer)
4. **Generates**:
   - `index.html` - Homepage with all blog posts
   - `technological_approach.html` - Tech journey page
   - `blog/01.html` through `blog/10.html` - Individual post pages
5. **Creates blog dropdown** - Automatically sorted newest → oldest

### Markdown-it Configuration

```javascript
const md = new MarkdownIt({
  html: true,        // Allow HTML tags in markdown (like <u>)
  breaks: false,     // Don't convert \n to <br>
  linkify: false,    // Don't auto-linkify URLs
  typographer: false // Don't replace quotes/dashes
});
```

**This configuration ensures text is never modified.**

### Post-Processing Rules

Only two post-processing transformations (text still preserved):

1. **Footnotes**: `[1]` → `<sup>[1]</sup>` (for styling)
2. **Internal links**: `[Technological Approach]` → `<a href="/technological_approach.html">Technological Approach</a>`

## Design Specifications

### Colors (Matching Professional Site)
- Background: `#000000` (pure black)
- Text: `#ffffff` (white)
- Secondary text: `#e0e0e0` (slightly gray for body)
- Icon backgrounds: `#404040` (gray circles)
- Icon hover: `#505050` (lighter gray)
- Links: `#6b9bd1` (light blue)
- Borders/separators: `#333333` (subtle gray)

### Typography (Matching Professional Site)
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`
- Name (h1): 1.5rem, font-weight: 300
- Blog titles (h2 on homepage): 1.5rem, font-weight: 400
- Blog titles (h1 on individual pages): 1.8rem, font-weight: 400
- Body text: 1rem, line-height: 1.7
- Navigation: 1rem, font-weight: 400
- Dropdown items: 0.9rem

### Layout
- Max content width: 700px (centered)
- Header padding: 20px 30px
- Social links gap: 15px
- Blog post margin: 60px between posts
- Navigation gap: 30px between items

### Navigation Dropdown
- Pure CSS hover interaction (no JavaScript)
- Blog posts listed newest → oldest (10 → 1)
- Format: `{number}. {title}`
- Mobile: Expands on tap, static positioning

### Social Links (Personal/Social Media Focused)
- Email: `mailto:maximilien@leclei.net`
- Threads: `https://www.threads.com/@maximilienleclei`
- Instagram: `https://www.instagram.com/maximilienleclei/`
- X (Twitter): `https://x.com/maximilien_lc`
- Facebook: `https://www.facebook.com/maximilienlc/`
- Bluesky: `https://bsky.app/profile/maximilienleclei.bsky.social`
- TikTok: `https://www.tiktok.com/@maximilienleclei`
- Discord: `https://discord.gg/WHReS5JUkv`

## Homepage Structure

1. **Header**: Profile photo + "Maximilien Le Cleï"
2. **Navigation**: Home | Blog ▼ | Technological Approach | Professional Site
3. **Social Links**: Email, GitHub, Scholar, LinkedIn (centered)
4. **Introduction**: Content from `main.md` (3 paragraphs)
5. **Blog Posts**: All 10 posts in full (newest → oldest)
   - Each post has h2 heading + full content
   - Separated by horizontal rules
   - Anchor IDs: `id="post-{N}"`

## Individual Blog Pages

Each blog post has its own page:
- URL: `/blog/{N}.html` (e.g., `/blog/01.html`)
- Same header/nav/social as homepage
- Blog title as h1 (larger than homepage h2)
- Full content
- Previous/Next navigation at bottom
- Links back to homepage via "Home" and "Blog" dropdown

## GitHub Setup

### Required Permissions
- **GitHub Actions**: Settings → Actions → General → Workflow permissions
  - Set to "Read and write permissions" (allows workflow to commit HTML)

### GitHub Pages
- **Settings** → **Pages**
- Source: Deploy from `main` branch, `/ (root)` folder
- Custom domain: `maximilien.leclei.net`

### DNS Configuration
- Type: CNAME
- Name: `maximilien` (or `@` for root domain)
- Target: `[USERNAME].github.io`

## Common Modifications

### Add a New Blog Post
1. Create `markdown/blog/11.md`
2. Write content in markdown
3. Push to GitHub
4. Automatic: HTML generated, homepage updated, dropdown updated

### Update Existing Blog Post
1. Edit `markdown/blog/{N}.md`
2. Push to GitHub
3. Automatic: All affected pages regenerated

### Update Homepage Introduction
1. Edit `markdown/main.md`
2. Push to GitHub
3. Automatic: Homepage regenerated

### Update Technological Approach
1. Edit `markdown/technological_approach.md`
2. Push to GitHub
3. Automatic: Page regenerated

### Update Styles
1. Edit `styles.css` directly (not auto-generated)
2. Push to GitHub
3. Changes apply immediately

### Update Social Links
1. Edit `generate-html.js` - Find `generateSocialLinks()` function (around line 75)
2. Modify href attributes and SVG icons as needed
3. Run `npm run build` locally to test
4. Push to GitHub (triggers automatic regeneration)

### Change Profile Photo
1. Replace `image.png` (keep filename)
2. Used in header and as favicon
3. Push to GitHub

## Markdown Formatting Guide

### Basic Formatting
- `# Heading` - Top-level heading (becomes h1 in individual pages, h2 on homepage)
- `## Subheading` - Second-level heading (becomes h3)
- Blank line - New paragraph (`<p>`)
- `**bold**` - Bold text (`<strong>`)
- `*italic*` - Italic text (`<em>`)
- `[text](url)` - Link (`<a href="url">text</a>`)

### Special Features
- `<u>text</u>` - HTML pass-through (underlined text preserved)
- `[1]` - Auto-converted to `<sup>[1]</sup>` for footnotes
- `[Technological Approach]` - Auto-linked to tech page
- `---` - Horizontal separator (`<hr>`)

### Blog Post Structure
```markdown
# Title of Your Blog Post

First paragraph of content.

Second paragraph with more thoughts.

Third paragraph concludes the post.
```

**Important**: First `# Heading` becomes the page title and appears in dropdown menu.

## Workflow Summary

```
User edits markdown file
  ↓
Git commit & push
  ↓
GitHub Actions triggers
  ↓
Node.js runs generate-html.js
  ↓
markdown-it converts to HTML (text preserved)
  ↓
HTML wrapped in templates
  ↓
Generated files committed [skip ci]
  ↓
GitHub Pages deploys
  ↓
Website live with new content (2-3 min)
```

## Technology Stack

- **HTML5/CSS3** - Static site structure
- **Markdown** - Content source format
- **Node.js** - Build script runtime
- **markdown-it** - Markdown parser (preserves text exactly)
- **GitHub Actions** - CI/CD automation
- **GitHub Pages** - Static hosting

## Similarities to Professional Site

Both websites use the same automated workflow pattern:

**Professional Site:**
- Source: `cv.html` (HTML)
- Process: Puppeteer → PDF
- Output: `cv.pdf`
- Trigger: Push to `cv.html`

**Personal Site:**
- Source: `markdown/*.md` (Markdown)
- Process: markdown-it → HTML
- Output: `*.html` files
- Trigger: Push to `markdown/**`

Both:
- Use Node.js and GitHub Actions
- Commit generated files back to repo
- Use `[skip ci]` to prevent loops
- Deploy via GitHub Pages
- Require "Read and write permissions"

## Important Notes

1. **NEVER edit generated HTML files directly** - Edit markdown instead
2. **Text is preserved exactly** - markdown-it only adds tags
3. **All blog posts appear on homepage** - This is intentional (posts are short)
4. **Individual pages exist for SEO** - And direct linking/sharing
5. **Dropdown menu auto-updates** - When you add new blog posts
6. **Blog numbering** - Files named `01.md`, `02.md`, etc.
7. **Sorted newest first** - On homepage and in dropdown (10 → 1)
8. **drafts.md is ignored** - Won't appear on site
9. **GitHub Actions uses `[skip ci]`** - Prevents infinite commit loops
10. **Testing locally** - Run `npm run build` to generate HTML

## File Locations to Ignore

- `node_modules/` - Git ignored
- `.git/`, `.github/` - Standard directories
- `.claude/` - Plan files
- `package-lock.json` - Auto-generated

## Dependencies

```json
{
  "markdown-it": "^14.0.0"
}
```

Only one dependency. Deliberately minimal.

## Responsive Design

- **Desktop** (> 1024px): Full 700px content width
- **Tablet** (768-1024px): 600px content width
- **Mobile** (< 768px):
  - Full-width content
  - Stacked navigation
  - Dropdown becomes static/expanded
  - Smaller social icons (40px vs 48px)

## Future Enhancements (Optional)

After initial implementation:
1. **RSS feed** - Auto-generate from markdown
2. **Sitemap** - Auto-generate sitemap.xml
3. **Meta tags** - Extract descriptions from first paragraph
4. **Search** - Static search with lunr.js
5. **Tags** - YAML frontmatter for categorization
6. **Local dev server** - live-server for development

## Troubleshooting

### HTML not regenerating?
- Check GitHub Actions workflow ran successfully
- Verify "Read and write permissions" enabled
- Look for errors in Actions log

### Text looks different than markdown?
- Verify markdown-it configuration in `generate-html.js`
- Check for unwanted post-processing
- Compare source markdown with generated HTML

### Dropdown menu not working?
- Check CSS is loaded (`styles.css`)
- Verify hover states in styles
- Test in different browsers

### Blog post not appearing?
- Filename must match pattern: `##.md` (e.g., `11.md`)
- Must have `# Title` as first heading
- Check file is in `markdown/blog/` directory
- Verify not named `drafts.md`

### GitHub Actions failing?
- Check workflow file syntax (`.github/workflows/generate-html.yml`)
- Verify `package.json` has correct dependencies
- Check Node.js version (18 specified)
- Look for errors in Actions log

## Testing Checklist

Before pushing major changes:
- [ ] Run `npm run build` locally
- [ ] Open `index.html` in browser
- [ ] Check all blog posts display correctly
- [ ] Test dropdown menu (hover behavior)
- [ ] Click through individual blog pages
- [ ] Test prev/next navigation
- [ ] Verify text matches markdown exactly
- [ ] Check responsive design (resize browser)
- [ ] Test social links open correctly
- [ ] Verify "Professional Site" link works

## Content Best Practices

1. **Blog post length** - Current posts are 100-300 words (keep similar)
2. **Title format** - Clear, descriptive titles
3. **Numbering** - Continue sequential numbering (11.md, 12.md, etc.)
4. **Consistent voice** - Maintain philosophical, reflective tone
5. **Paragraph breaks** - Use blank lines for readability
6. **Special characters** - markdown-it handles these correctly
7. **Internal links** - Reference other pages by name (auto-linked)

## Name Convention

- **Name**: Maximilien Le Cleï (with ï)
- Used in:
  - Header (h1)
  - Page titles
  - Meta tags
  - Alt text for profile photo
  - Both professional and personal sites

## Deployment Checklist

Initial setup:
- [ ] Repository created on GitHub
- [ ] CNAME file in root directory
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] GitHub Actions permissions: "Read and write"
- [ ] DNS configured (CNAME record)
- [ ] `npm install` run locally (package-lock.json committed)
- [ ] Initial build successful (`npm run build`)
- [ ] All files committed and pushed
- [ ] Wait 2-5 minutes for deployment
- [ ] Verify site at https://maximilien.leclei.net

## Maintenance

### Regular Updates
- Add new blog posts in markdown
- Update technological approach as career progresses
- Refresh profile photo if desired

### Rarely Changed
- `generate-html.js` - Only if adding features
- `styles.css` - Only for design changes
- `package.json` - Only for dependency updates

### Never Changed
- `CNAME` - Domain stays the same
- `.github/workflows/generate-html.yml` - Workflow is stable
- `image.png` filename - Referenced in many places

## Summary

This website automates markdown-to-HTML conversion while preserving your text exactly. The workflow mirrors your professional site's CV generation:

**Edit markdown → Push → Automatic HTML generation → Deploy**

To add content: Just write markdown and push. Everything else is automatic.
