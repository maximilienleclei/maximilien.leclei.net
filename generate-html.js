const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

// Configure markdown-it to preserve exact text
const md = new MarkdownIt({
  html: true,        // Allow HTML tags in markdown (like <u>)
  breaks: false,     // Don't convert \n to <br> (preserve paragraph structure)
  linkify: false,    // Don't auto-linkify URLs
  typographer: false // Don't replace quotes/dashes
});

// Directories
const MARKDOWN_DIR = 'markdown';
const UNITS_DIR = path.join(MARKDOWN_DIR, 'units');
const RESEARCH_FILE = path.join(MARKDOWN_DIR, 'artificial_wisdom_research.md');

// Helper: Read markdown file
function readMarkdown(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}

// Helper: Extract title from markdown (first # heading)
function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

// Helper: Extract number from filename (e.g., "01.md" -> 1)
function extractUnitNumber(filename) {
  const match = filename.match(/^(\d+)\.md$/);
  return match ? parseInt(match[1], 10) : 0;
}

// Helper: Convert markdown to HTML
function markdownToHTML(markdown) {
  let html = md.render(markdown);

  // Post-process: Convert [N] to <sup>[N]</sup> for footnotes
  html = html.replace(/\[(\d+)\]/g, '<sup>[$1]</sup>');

  // Post-process: Make bare URLs clickable while preserving the displayed text
  html = html.replace(
    /(^|[\s>])(https?:\/\/[^\s<]+)/g,
    '$1<a href="$2">$2</a>'
  );

  // Post-process: Convert internal references to links
  html = html.replace(/\[Artificial Wisdom Research\]/g, '<a href="/artificial_wisdom_research.html">Artificial Wisdom Research</a>');

  return html;
}

// Generate header HTML with navigation
function generateHeader(iconPath = '') {
  return `    <header>
        <div class="header-container">
            <div class="header-left">
                <img src="${iconPath}image.png" alt="Maximilien Le Cleï" class="profile-photo">
                <h1>Maximilien Le Cleï</h1>
            </div>
            <nav class="header-nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/artificial_wisdom_research.html">Artificial Wisdom Research</a></li>
                    <li><a href="https://pro.maximilien.leclei.net" target="_blank" rel="noopener noreferrer">Professional Site</a></li>
                </ul>
            </nav>
        </div>
    </header>`;
}

// Generate social links HTML
function generateSocialLinks() {
  return `    <nav class="social-links">
        <a href="mailto:maximilien@leclei.net" class="social-link" title="Email">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
            </svg>
        </a>

        <a href="https://www.threads.com/@maximilienleclei" class="social-link" target="_blank" rel="noopener noreferrer" title="Threads">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3 11.3c-.1 0-.2-.1-.2-.1-.1-2.6-1.5-4-3.9-4-1.4 0-2.6.6-3.3 1.7l1.3.9c.5-.8 1.4-1 2-1 .8 0 1.4.2 1.7.7.3.3.5.8.5 1.3-.7-.1-1.4-.2-2.2-.1-2.2.1-3.7 1.4-3.6 3.2 0 .9.5 1.7 1.3 2.2.7.4 1.5.6 2.4.6 1.2-.1 2.1-.5 2.7-1.3.5-.6.8-1.4.9-2.4.6.3 1 .8 1.2 1.3.4.9.4 2.4-.8 3.6-1.1 1.1-2.3 1.5-4.3 1.5-2.1 0-3.8-.7-4.8-2S5.7 14.3 5.7 12c0-2.3.5-4.1 1.5-5.4 1.1-1.3 2.7-2 4.8-2 2.2 0 3.8.7 4.9 2 .5.7.9 1.5 1.2 2.5l1.5-.4c-.3-1.2-.8-2.2-1.5-3.1-1.3-1.7-3.3-2.6-6-2.6-2.6 0-4.7.9-6 2.6C4.9 7.2 4.3 9.3 4.3 12s.6 4.8 1.9 6.4c1.4 1.7 3.4 2.6 6 2.6 2.3 0 4-.6 5.3-2 1.8-1.8 1.7-4 1.1-5.4-.4-.9-1.2-1.7-2.3-2.3zm-4 3.8c-1 .1-2-.4-2-1.3 0-.7.5-1.5 2.1-1.6h.5c.6 0 1.1.1 1.6.2-.2 2.3-1.3 2.7-2.2 2.7z"/>
            </svg>
        </a>

        <a href="https://www.instagram.com/maximilienleclei/" class="social-link" target="_blank" rel="noopener noreferrer" title="Instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        </a>

        <a href="https://x.com/maximilien_lc" class="social-link" target="_blank" rel="noopener noreferrer" title="X">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        </a>

        <a href="https://www.facebook.com/maximilienlc/" class="social-link" target="_blank" rel="noopener noreferrer" title="Facebook">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        </a>

        <a href="https://bsky.app/profile/maximilienleclei.bsky.social" class="social-link" target="_blank" rel="noopener noreferrer" title="Bluesky">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 01-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
            </svg>
        </a>

        <a href="https://www.tiktok.com/@maximilienleclei" class="social-link" target="_blank" rel="noopener noreferrer" title="TikTok">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
        </a>

        <a href="https://discord.gg/WHReS5JUkv" class="social-link" target="_blank" rel="noopener noreferrer" title="Discord">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
        </a>
    </nav>`;
}

// Generate complete HTML page
function generateHTMLPage(content, metadata) {
  const {
    title = 'Maximilien Le Cleï',
    description = 'Personal website',
    iconPath = '',
    cssPath = ''
  } = metadata;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <meta name="author" content="Maximilien Le Cleï">
    <title>${title}</title>
    <link rel="icon" type="image/png" href="${iconPath}image.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${cssPath}styles.css">
</head>
<body>
${generateHeader(iconPath)}

${generateSocialLinks()}

    <main>
${content}
    </main>
</body>
</html>
`;
}

// Generate homepage
function generateHomepage(unitFiles) {
  console.log('Generating homepage...');

  const mainMd = readMarkdown(path.join(MARKDOWN_DIR, 'main.md'));
  const introHTML = markdownToHTML(mainMd);

  const sortedUnits = unitFiles
    .map(file => ({
      num: extractUnitNumber(file),
      markdown: readMarkdown(path.join(UNITS_DIR, file))
    }))
    .filter(unit => unit.num > 0)
    .sort((a, b) => b.num - a.num);

  const unitPostsHTML = sortedUnits.map((unit, index) => {
    const title = extractTitle(unit.markdown);
    const content = markdownToHTML(unit.markdown);
    const contentWithoutTitle = content.replace(/<h1>.*?<\/h1>/, '');
    const separator = index < sortedUnits.length - 1 ? '            <hr class="blog-separator">\n\n' : '';

    return `            <article class="blog-post" id="${unit.num}">
                <h2><a href="/#${unit.num}" class="blog-post-title">${title}</a></h2>
                <div class="blog-content">
${contentWithoutTitle}                </div>
            </article>

${separator}`;
  }).join('');

  const content = `        <section class="introduction">
${introHTML}        </section>

        <section class="blog-posts" id="units">
${unitPostsHTML}        </section>`;

  const html = generateHTMLPage(content, {
    title: 'Maximilien Le Cleï',
    description: 'Personal website'
  });

  fs.writeFileSync('index.html', html);
  console.log('✓ Generated index.html');
}

// Generate research page
function generateResearchPage() {
  console.log('Generating artificial wisdom research page...');

  const researchMd = readMarkdown(RESEARCH_FILE);
  const researchHTML = markdownToHTML(researchMd);
  const content = `        <article class="tech-approach">
${researchHTML}        </article>`;

  const html = generateHTMLPage(content, {
    title: 'Artificial Wisdom Research - Maximilien Le Cleï',
    description: 'Artificial Wisdom Research'
  });

  fs.writeFileSync('artificial_wisdom_research.html', html);
  console.log('✓ Generated artificial_wisdom_research.html');
}

function main() {
  console.log('Starting HTML generation from markdown...\n');

  const unitFiles = fs.readdirSync(UNITS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'drafts.md')
    .sort();

  console.log(`Found ${unitFiles.length} units\n`);

  generateHomepage(unitFiles);
  generateResearchPage();

  console.log('\n✅ All HTML files generated successfully!');
}

try {
  main();
} catch (error) {
  console.error('❌ Error generating HTML:', error);
  process.exit(1);
}
