// components/RichText.tsx
import {
    RichText as PayloadRichText,
  } from '@payloadcms/richtext-lexical/react'
  import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
  
  export function RichText({ content }: { content: SerializedEditorState }) {
    return (
      <PayloadRichText
        data={content}
        className="prose prose-invert prose-lg max-w-none break-words
          prose-headings:font-bold prose-headings:text-foreground
          prose-p:text-foreground/70 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-primary prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:max-w-full prose-pre:overflow-x-auto
          prose-blockquote:border-primary prose-blockquote:text-foreground/60"
      />
    )
  }