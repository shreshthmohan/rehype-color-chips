# Color Formats Test

Test various color formats supported by the plugin.

## Hex Colors

### 6-digit hex
Here's a nice blue color: `#3498db` and a red one: `#e74c3c`

### 3-digit hex
Short form colors work too: `#f00` for red, `#0f0` for green, and `#00f` for blue

### 4-digit hex (with alpha)
Semi-transparent colors: `#ef3c` and `#0f08`

### 8-digit hex (with alpha)
Full alpha channel: `#0000ffcc` and `#ff0000aa`

## RGB Colors

### RGB format
Standard RGB: `rgb(255, 34, 0)` and `rgb(46, 204, 113)`

### RGBA format
With transparency: `rgba(24, 213, 78, 0.4)` and `rgba(231, 76, 60, 0.8)`

## Named Colors

CSS named colors work great: `tomato`, `cornflowerblue`, `mediumseagreen`, `rebeccapurple`

## Mixed Content

You can use colors inline with text, like "the primary color is `#2c3e50` and the secondary is `#16a085`" in a sentence.

## Edge Cases

- Invalid colors should not get chips: `#gggggg`, `rgb(300, 400, 500)`, `notacolor`
- Colors in regular text without code blocks don't get chips: #ffffff
- Only colors in `inline code` blocks get the treatment!
