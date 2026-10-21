'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  /** Id de l'élément dont le texte est copié. */
  target: string
}

/** Copie le texte ciblé ; si le presse-papiers est refusé, sélectionne le texte. */
export function CopyButton({ target }: Props) {
  const [label, setLabel] = useState('Copier')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const select = (el: HTMLElement) => {
    const range = document.createRange()
    range.selectNodeContents(el)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    setLabel('Sélectionné')
  }

  const onClick = () => {
    const el = document.getElementById(target)
    if (!el) return
    const text = el.textContent?.trim() ?? ''
    try {
      navigator.clipboard.writeText(text).then(
        () => {
          setLabel('Copié')
          clearTimeout(timer.current)
          timer.current = setTimeout(() => setLabel('Copier'), 1600)
        },
        () => select(el),
      )
    } catch {
      select(el)
    }
  }

  return (
    <button className="copy" type="button" onClick={onClick}>
      {label}
    </button>
  )
}
