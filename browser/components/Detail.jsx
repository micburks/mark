import React from 'react'
import marked from 'marked'
import { join } from 'path'
import { sanitize } from 'dompurify'
import { readFileSync } from '../utils.js'
import { highlightAuto } from 'highlight.js'

export default function Detail (props) {
  let __html = 'No file selected'

  if (props.file) {
    const path = join(...props.path, props.file.name)
    const contents = readFileSync(path)
    const html = marked(contents, {
      highlight: code => highlightAuto(code).value
    })
    __html = sanitize(html)
  }

  return (
    <div id="Code" className="Detail Grid-cell--body markdown-body" dangerouslySetInnerHTML={{__html}}></div>
  )
}
