import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface EmailCopyButtonProps {
  email: string
}

/**
 * Email — одновременно mailto-ссылка (честный фолбэк, CLAUDE.md раздел 9) и
 * кнопка копирования в один клик. Если Clipboard API недоступен (небезопасный
 * контекст, старый браузер), mailto-ссылка рядом продолжает работать.
 */
export default function EmailCopyButton({ email }: EmailCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API недоступен — mailto-ссылка рядом остаётся рабочим способом связаться.
    }
  }

  return (
    <div className="inline-flex items-center gap-3 border border-steel px-4 py-3">
      <a
        href={`mailto:${email}`}
        className="mono text-sm text-ice transition-colors duration-150 ease-out hover:text-signal"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Email скопирован' : 'Скопировать email'}
        className="text-haze transition-colors duration-150 ease-out hover:text-signal"
      >
        {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
      </button>
    </div>
  )
}
