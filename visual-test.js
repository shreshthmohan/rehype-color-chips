import { readFileSync, writeFileSync } from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeColorChips from './esm/index.js';

// Read the markdown input
const markdown = readFileSync('./test-input.md', 'utf-8');

// Process with default location (after)
const resultAfter = await unified()
  .use(remarkParse) // Parse markdown to mdast
  .use(remarkRehype) // Convert mdast to hast
  .use(rehypeColorChips, { location: 'after' }) // Add color chips after
  .use(rehypeStringify) // Convert hast to HTML
  .process(markdown);

// Process with location set to before
const resultBefore = await unified()
  .use(remarkParse) // Parse markdown to mdast
  .use(remarkRehype) // Convert mdast to hast
  .use(rehypeColorChips, { location: 'before' }) // Add color chips before
  .use(rehypeStringify) // Convert hast to HTML
  .process(markdown);

// Create a complete HTML document with styling
const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rehype Color Chips - Visual Test</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      line-height: 1.6;
      color: #333;
    }

    code {
      background-color: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
      font-size: 0.9em;
    }

    /* Color chip styling */
    .gfm-color-chip {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      margin-left: 4px;
      margin-right: 4px;
      vertical-align: middle;
    }

    .comparison-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 30px;
    }

    .comparison-section {
      border: 1px solid #e0e0e0;
      padding: 20px;
      border-radius: 8px;
      background-color: #fafafa;
    }

    .comparison-section h2 {
      margin-top: 0;
      color: #3498db;
      font-size: 1.3em;
    }

    h1 {
      color: #2c3e50;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
    }

    h2 {
      color: #34495e;
      margin-top: 30px;
    }

    h3 {
      color: #7f8c8d;
      margin-top: 20px;
    }

    ul {
      margin-top: 10px;
    }

    li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <h1>Rehype Color Chips - Visual Test Comparison</h1>
  <p>This page demonstrates the <code>location</code> option for the rehype-color-chips plugin. The left column shows color chips positioned <strong>after</strong> the color text (default), while the right column shows them positioned <strong>before</strong>.</p>

  <div class="comparison-container">
    <div class="comparison-section">
      <h2>Location: "after" (default)</h2>
      ${resultAfter.value}
    </div>
    <div class="comparison-section">
      <h2>Location: "before"</h2>
      ${resultBefore.value}
    </div>
  </div>
</body>
</html>`;

// Write the output HTML file
writeFileSync('./test-output.html', htmlDocument, 'utf-8');

console.log('✓ Visual test generated successfully!');
console.log('→ Open test-output.html in your browser to view the result');
