import { useCallback, useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { LinkIcon } from '@heroicons/react/20/solid'

export interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  labelledBy?: string
  describedBy?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write the detailed overview…',
  className,
  labelledBy,
  describedBy,
}: RichTextEditorProps) {
  const resolvedPlaceholder = placeholder ?? 'Write the detailed overview…'
  const editorAttributes: Record<string, string> = {
    class:
      'prose prose-slate max-w-none min-h-[180px] resize-y rounded-2xl border border-brand-neutral/15 bg-white px-4 py-3 text-sm leading-relaxed text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-secondary/40',
  }

  if (labelledBy) {
    editorAttributes['aria-labelledby'] = labelledBy
  }

  if (describedBy) {
    editorAttributes['aria-describedby'] = describedBy
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: resolvedPlaceholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value?.trim().length ? value : '<p></p>',
    editorProps: {
      attributes: editorAttributes,
    },
    onUpdate({ editor: instance }) {
      const html = instance.getHTML()
      onChange(html)
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const normalizedValue = value?.trim().length ? value : '<p></p>'
    if (current !== normalizedValue) {
      editor.commands.setContent(normalizedValue, { emitUpdate: false })
    }
  }, [editor, value])

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Enter URL', previousUrl ?? '')

    if (url === null) {
      return
    }

    if (url.trim().length === 0) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
      })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }

  const toolbarButtonClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-neutral/10 bg-white text-brand-primary transition hover:border-brand-secondary/40 hover:text-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary disabled:cursor-not-allowed disabled:opacity-60'

  return (
    <div className={className}>
      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-full border border-brand-neutral/10 bg-white/90 px-2 py-1 shadow-[0_18px_45px_rgba(8,20,44,0.08)]">
        <button
          type="button"
          className={`${toolbarButtonClass} ${editor.isActive('bold') ? 'border-brand-secondary/50 text-brand-secondary' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <span className="text-sm font-semibold">B</span>
        </button>
        <button
          type="button"
          className={`${toolbarButtonClass} ${editor.isActive('italic') ? 'border-brand-secondary/50 text-brand-secondary' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <span className="text-sm font-semibold italic">I</span>
        </button>
        <button
          type="button"
          className={`${toolbarButtonClass} ${editor.isActive('strike') ? 'border-brand-secondary/50 text-brand-secondary' : ''}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strike-through"
        >
          <span className="text-sm font-semibold line-through">S</span>
        </button>
        <span className="mx-1 h-6 w-px bg-brand-neutral/20" aria-hidden="true" />
        <button
          type="button"
          className={`${toolbarButtonClass} ${editor.isActive('bulletList') ? 'border-brand-secondary/50 text-brand-secondary' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Toggle bullet list"
        >
          <span className="text-lg leading-none">•</span>
        </button>
        <button
          type="button"
          className={`${toolbarButtonClass} ${editor.isActive('orderedList') ? 'border-brand-secondary/50 text-brand-secondary' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Toggle ordered list"
        >
          <span className="text-xs font-semibold leading-none">1.</span>
        </button>
        <button
          type="button"
          className={`${toolbarButtonClass} ${editor.isActive('blockquote') ? 'border-brand-secondary/50 text-brand-secondary' : ''}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Toggle blockquote"
        >
          <span className="text-lg leading-none">“</span>
        </button>
        <span className="mx-1 h-6 w-px bg-brand-neutral/20" aria-hidden="true" />
        <button type="button" className={toolbarButtonClass} onClick={setLink} aria-label="Insert link">
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={toolbarButtonClass}
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          aria-label="Clear formatting"
        >
          <span className="text-xs font-semibold">CLR</span>
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor
