const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function ensureRichTextHtml(value: string): string {
  const trimmed = value?.trim() ?? ''
  if (!trimmed) {
    return ''
  }

  if (HTML_TAG_PATTERN.test(trimmed)) {
    return trimmed
  }

  return `<p>${escapeHtml(trimmed)}</p>`
}

export function combineRichTextBlocks(blocks: string[]): string {
  return blocks.map(ensureRichTextHtml).filter((block) => block.length > 0).join('')
}

export function editorValueFromBlocks(blocks: string[]): string {
  const combined = combineRichTextBlocks(blocks)
  return combined || '<p></p>'
}

export function blocksFromEditorHtml(html: string): string[] {
  const normalized = html?.trim() ?? ''
  if (!normalized || normalized === '<p></p>' || normalized === '<p></p>\n') {
    return []
  }
  return [normalized]
}

export function renderableRichTextBlocks(blocks: string[]): string[] {
  return blocks.map(ensureRichTextHtml).filter((block) => block.trim().length > 0)
}

