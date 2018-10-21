import React from 'react'
import marked from 'marked'
import { sanitize } from 'dompurify'
import { highlightAuto } from 'highlight.js'
import './Markdown.css'

export default function Markdown ({ className, children, markdown }) {
  const html = marked(children || markdown || '', {
    highlight: code => highlightAuto(code).value
  })

  const __html = sanitize(html)

  // markdown-body is a class necessary for 'github-markdown-css'
  return (
    <div className={`Markdown markdown-body ${className}`}
      dangerouslySetInnerHTML={{__html}}
    ></div>
  )
}

Markdown.defaultProps = {
  className: ''
}
