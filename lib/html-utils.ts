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
  const entities: Record<string, string> = {
    '&amp;': '&',  // Must be first to handle double-encoding
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&ndash;': '–',
    '&mdash;': '—',
    '&hellip;': '…',
    '&uuml;': 'ü',
    '&Uuml;': 'Ü',
    '&auml;': 'ä',
    '&Auml;': 'Ä',
    '&ouml;': 'ö',
    '&Ouml;': 'Ö',
    '&szlig;': 'ß',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
  }
  
  // Handle numeric entities like &#8211; (en-dash) and &#x2013; (hex)
  let decoded = html.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10))
  })
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })
  
  // Handle named entities (decode multiple times to handle double-encoding)
  let previousDecoded = ''
  let iterations = 0
  while (decoded !== previousDecoded && iterations < 3) {
    previousDecoded = decoded
    Object.keys(entities).forEach(entity => {
      const regex = new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      decoded = decoded.replace(regex, entities[entity])
    })
    iterations++
  }
  
  return decoded
}

/**
 * Processes HTML content from TinyMCE for safe rendering
 * - Decodes HTML entities
 * - Ensures proper line breaks
 * - Cleans up common issues
 */
export function processTinyMCEHtml(html: string, isServer: boolean = false): string {
  if (!html) return html
  
  // Decode HTML entities
  let processed = isServer ? decodeHtmlEntitiesServer(html) : html
  
  // Ensure <br> tags are properly formatted
  processed = processed.replace(/<br\s*\/?>/gi, '<br />')
  
  // Ensure <p> tags are properly closed
  processed = processed.replace(/<p([^>]*)>/gi, '<p$1>')
  processed = processed.replace(/<\/p>/gi, '</p>')
  
  return processed
}
