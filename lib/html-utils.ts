/**
 * HTML Utilities
 * Functions for processing HTML content from TinyMCE
 */

/**
 * Decodes HTML entities in a string (Client-side)
 * Converts entities like &ndash; &uuml;r &amp; etc. to their actual characters
 * Handles both single and double-encoded entities
 */
export function decodeHtmlEntities(html: string): string {
  if (!html) return html
  
  // If document is not available (SSR), use server-side function
  if (typeof document === 'undefined') {
    return decodeHtmlEntitiesServer(html)
  }
  
  // Create a temporary textarea element to decode HTML entities
  // This handles all HTML entities including numeric ones
  const textarea = document.createElement('textarea')
  textarea.innerHTML = html
  let decoded = textarea.value
  
  // Handle double-encoded entities (e.g., &amp;ndash; should become –)
  // If the result still contains entities, decode again
  if (decoded !== html && decoded.includes('&')) {
    textarea.innerHTML = decoded
    decoded = textarea.value
  }
  
  return decoded
}

/**
 * Server-side version using Node.js
 * For use in server components and API routes
 * Handles both single and double-encoded entities
 */
export function decodeHtmlEntitiesServer(html: string): string {
  if (!html) return html
  
  // Common HTML entities mapping (must be in order - decode &amp; first!)
  // Include both lowercase and uppercase variants for robustness
  const entities: Record<string, string> = {
    '&amp;': '&',  // Must be first to handle double-encoding
    '&AMP;': '&',  // Uppercase variant
    '&nbsp;': ' ',
    '&NBSP;': ' ',
    '&lt;': '<',
    '&LT;': '<',
    '&gt;': '>',
    '&GT;': '>',
    '&quot;': '"',
    '&QUOT;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&APOS;': "'",
    '&ndash;': '–',
    '&NDASH;': '–',
    '&mdash;': '—',
    '&MDASH;': '—',
    '&hellip;': '…',
    '&HELLIP;': '…',
    '&uuml;': 'ü',
    '&Uuml;': 'Ü',
    '&UUML;': 'Ü',
    '&auml;': 'ä',
    '&Auml;': 'Ä',
    '&AUML;': 'Ä',
    '&ouml;': 'ö',
    '&Ouml;': 'Ö',
    '&OUML;': 'Ö',
    '&szlig;': 'ß',
    '&SZlig;': 'ß',
    '&SZLIG;': 'ß',
    '&copy;': '©',
    '&COPY;': '©',
    '&reg;': '®',
    '&REG;': '®',
    '&trade;': '™',
    '&TRADE;': '™',
  }
  
  // Handle numeric entities like &#8211; (en-dash) and &#x2013; (hex)
  let decoded = html.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10))
  })
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })
  
  // Handle named entities (decode multiple times to handle double-encoding)
  // Increase iterations to handle deeply nested encodings
  let previousDecoded = ''
  let iterations = 0
  while (decoded !== previousDecoded && iterations < 5) {
    previousDecoded = decoded
    // Decode entities in order - &amp; must be first
    Object.keys(entities).forEach(entity => {
      const regex = new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi') // Case-insensitive
      decoded = decoded.replace(regex, entities[entity])
    })
    iterations++
  }
  
  // Final pass: decode any remaining numeric or hex entities that might have been created
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10))
  })
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/gi, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })
  
  return decoded
}

/**
 * Processes HTML content from TinyMCE for safe rendering
 * - Decodes HTML entities (always, regardless of server/client)
 * - Ensures proper line breaks
 * - Cleans up common issues like nested <p> tags
 */
export function processTinyMCEHtml(html: string, isServer: boolean = false): string {
  if (!html) return html
  
  // Always decode HTML entities - use server function if on server, otherwise client function
  // decodeHtmlEntities automatically detects server/client, but for explicit control use isServer flag
  let processed = isServer ? decodeHtmlEntitiesServer(html) : decodeHtmlEntities(html)
  
  // Fix nested <p> tags - split nested paragraphs into separate paragraphs
  // Pattern: <p>text1<p>text2</p>text3</p> becomes <p>text1</p><p>text2</p><p>text3</p>
  // This regex handles the case where we have <p>...<p>...</p>...</p>
  let previousProcessed = ''
  let iterations = 0
  while (processed !== previousProcessed && iterations < 5) {
    previousProcessed = processed
    // Find nested <p> tags and split them
    processed = processed.replace(/<p([^>]*)>([^<]*)<p([^>]*)>/gi, '<p$1>$2</p><p$3>')
    iterations++
  }
  
  // Fix multiple consecutive opening <p> tags without content
  processed = processed.replace(/<\/p>\s*<p([^>]*)>\s*<p([^>]*)>/gi, '</p><p$2>')
  
  // Ensure <br> tags are properly formatted
  processed = processed.replace(/<br\s*\/?>/gi, '<br />')
  
  // Ensure <p> tags are properly closed (fix unclosed tags)
  processed = processed.replace(/<p([^>]*)>/gi, '<p$1>')
  processed = processed.replace(/<\/p>/gi, '</p>')
  
  return processed
}
