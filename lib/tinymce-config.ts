/**
 * TinyMCE Configuration
 * Shared configuration for all TinyMCE editors with proper UTF-8 and umlaut support
 */

export const getTinyMCEConfig = (height: number = 200) => ({
  height,
  menubar: false,
  // UTF-8 encoding for proper umlaut support
  encoding: 'utf8',
  // Don't encode entities - keep raw characters (ü, ä, ö, ß, –, etc.)
  entity_encoding: 'raw',
  plugins: [
    'advlist', 
    'autolink', 
    'lists', 
    'link', 
    'charmap', 
    'preview', 
    'anchor', 
    'searchreplace', 
    'visualblocks', 
    'code'
  ],
  toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code',
  content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }',
  // Ensure proper character encoding
  forced_root_block: 'p',
  forced_root_block_attrs: {},
  // Don't convert special characters to entities
  convert_urls: false,
  // Preserve line breaks
  convert_newlines_to_brs: false,
  remove_linebreaks: false,
  // Language settings for German
  language: 'de',
  // Ensure proper handling of special characters
  valid_elements: '*[*]',
  valid_children: '+body[style]',
})
