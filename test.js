import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { rehype } from 'rehype'
import rehypeColorChips from './esm/index.js'
import dedent from 'dedent'

const processHtml = (html, options) => {
  return rehype()
    .data('settings', { fragment: true })
    .use(rehypeColorChips, options)
    .processSync(html)
    .toString()
}

test('6-digit hex code', () => {
  const result = processHtml(dedent`<code>#ef3491</code>`)
  const expected = dedent`
  <code>#ef3491<span class="gfm-color-chip" style="background-color: #ef3491;"></span></code>`
  assert.is(result, expected)
})

test('3-digit hex code', () => {
  const result = processHtml(dedent`<code>#ef3</code>`)
  const expected = dedent`
    <code>#ef3<span class="gfm-color-chip" style="background-color: #eeff33;"></span></code>
  `
  assert.is(result, expected)
})

test('4-digit hex code', () => {
  const result = processHtml(dedent`<code>#ef3c</code>`)
  const expected = dedent`
  <code>#ef3c<span class="gfm-color-chip" style="background-color: #eeff33;"></span></code>
  `
  assert.is(result, expected)
})

test('8-digit hex code', () => {
  const result = processHtml(dedent`<code>#0000ffcc</code>`)
  const expected = dedent`
  <code>#0000ffcc<span class="gfm-color-chip" style="background-color: #0000ff;"></span></code>
  `
  assert.is(result, expected)
})

// `rgba(2, 3, 4, 50%)`

// `rgba(24 213 78/0.5)`
// `rgba(24 213 78/50%)`

// `hsl(0, 100%, 50%)`

test('rgb (comma-separated) color code', () => {
  const result = processHtml(dedent`<code>rgb(255, 34, 0)</code>`)
  const expected = dedent`
    <code>rgb(255, 34, 0)<span class="gfm-color-chip" style="background-color: #ff2200;"></span></code>
  `
  assert.is(result, expected)
})

test('rgb (space-separated) color code', () => {
  const result = processHtml(dedent`<code>rgb(255 34 0)</code>`)
  const expected = dedent`
    <code>rgb(255 34 0)</code>
  `
  assert.is(result, expected)
})

test('rgba (comma-separated) color code with opacity as decimal number', () => {
  const result = processHtml(dedent`<code>rgba(24, 213, 78, 0.4)</code>`)
  const expected = dedent`
    <code>rgba(24, 213, 78, 0.4)<span class="gfm-color-chip" style="background-color: #18d54e;"></span></code>
  `
  assert.is(result, expected)
})

test('rgba (comma-separated) color code with opacity as percentage', () => {
  const result = processHtml(dedent`<code>rgba(2, 3, 4, 50%)</code>`)
  const expected = dedent`
    <code>rgba(2, 3, 4, 50%)</code>
  `
  assert.is(result, expected)
})

test('named color: tomato', () => {
  const result = processHtml(dedent`<code>tomato</code>`)
  const expected = dedent`
    <code>tomato<span class="gfm-color-chip" style="background-color: #ff6347;"></span></code> 
  `
  assert.is(result, expected)
})

test('Custom class for color chip', () => {
  const result = processHtml(dedent`<code>#ef3491</code>`, {
    customClassName: 'color-chip',
  })
  const expected = dedent`
  <code>#ef3491<span class="color-chip" style="background-color: #ef3491;"></span></code>`
  assert.is(result, expected)
})

test.run()
