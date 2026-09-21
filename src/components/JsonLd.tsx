import { useEffect } from 'react'

interface JsonLdProps {
  data: Record<string, unknown>
}

/** Инжектит <script type="application/ld+json"> на время жизни страницы и убирает при уходе. */
export default function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [data])

  return null
}
