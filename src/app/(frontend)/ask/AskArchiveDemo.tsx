'use client'

import React, { FormEvent, useMemo, useState } from 'react'

type AskArchiveDemoProps = {
  compact?: boolean
  helpMode?: boolean
}

type AskResponse = {
  answer: string
  citations: { href: string; label: string; type: string }[]
}

const DAILY_LIMIT = 5

const getLimitKey = () => {
  const today = new Date().toISOString().slice(0, 10)
  return `muslim-impactors-ai-ask-count-${today}`
}

export default function AskArchiveDemo({ compact = false, helpMode = false }: AskArchiveDemoProps) {
  const [answer, setAnswer] = useState<AskResponse | null>(null)
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') {
      return 0
    }

    const stored = window.localStorage.getItem(getLimitKey())
    return stored ? Number(stored) || 0 : 0
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState(
    helpMode
      ? 'I need help finding where to submit an article.'
      : 'Which American Muslim profiles are connected to public service?',
  )

  const remaining = useMemo(() => Math.max(DAILY_LIMIT - count, 0), [count])

  const submitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!question.trim()) {
      setError('Please write a question first.')
      return
    }

    if (remaining <= 0) {
      setError('Daily demo limit reached. Please try again tomorrow or sign in when accounts open.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/ask', {
        body: JSON.stringify({ helpMode, question }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const payload = (await response.json()) as AskResponse
      const nextCount = count + 1
      window.localStorage.setItem(getLimitKey(), String(nextCount))
      setCount(nextCount)
      setAnswer(payload)
    } catch {
      setError('The archive assistant could not answer just now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`ask-widget ${compact ? 'is-compact' : ''}`}>
      <form onSubmit={submitQuestion}>
        <label htmlFor={compact ? 'help-ask-question' : 'ask-question'}>
          {helpMode ? 'Ask the help assistant' : 'Ask from approved archive content'}
        </label>
        <textarea
          id={compact ? 'help-ask-question' : 'ask-question'}
          onChange={(event) => setQuestion(event.target.value)}
          rows={compact ? 3 : 5}
          value={question}
        />
        <div className="ask-widget-actions">
          <button disabled={loading || remaining <= 0} type="submit">
            {loading ? 'Answering...' : helpMode ? 'Ask and queue help' : 'Ask archive'}
          </button>
          <small>{remaining} of {DAILY_LIMIT} questions left today</small>
        </div>
      </form>

      {error ? <p className="form-status is-error">{error}</p> : null}

      {answer ? (
        <article className="ask-answer">
          <span>Grounded answer</span>
          <p>{answer.answer}</p>
          <div>
            {answer.citations.map((citation) => (
              <a href={citation.href} key={`${citation.type}-${citation.href}`}>
                {citation.type}: {citation.label}
              </a>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  )
}
