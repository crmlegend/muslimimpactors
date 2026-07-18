'use client'

import React, { useState } from 'react'

type Operation = {
  details: string
  status: 'blocked' | 'completed' | 'preview'
  title: string
}

type CommandResult = {
  canExecute: boolean
  message: string
  operations: Operation[]
  warnings: string[]
}

const examples = [
  'Change Keith Ellison, Ilhan Omar, and Rashida Tlaib archive track to American civic impact.',
  'Set external video URL for Jawed Karim to https://www.youtube.com/watch?v=jNQXAC9IVRw',
  'Set display region to North America and homepage priority to 025 for names: Keith Ellison, Ilhan Omar.',
  'Set hover banner for Keith Ellison to "Public service, law, and civic representation in Minnesota and the United States."',
  'Add Emirates Airline as sponsor.',
  'Create source records for https://example.com/report and https://example.com/profile.',
]

export default function AdminAICommandCenter({ userLabel }: { userLabel: string }) {
  const [prompt, setPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<CommandResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submitCommand = async (mode: 'execute' | 'preview') => {
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin-ai', {
        body: JSON.stringify({ mode, prompt }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const payload = await response.json()

      if (!response.ok) {
        setError(payload.message || 'Command failed.')
        return
      }

      setResult(payload)
    } catch {
      setError('Command failed. Check the network and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="admin-ai-page">
      <section className="admin-ai-hero">
        <div>
          <span>Super admin command center</span>
          <h1>AI-assisted live CMS operations with controlled execution.</h1>
          <p>
            Preview bulk database changes, source drafts, sponsor drafts, and content updates before
            executing. Code, schema, deployment, secret, and permission changes are captured as
            implementation requests instead of being changed directly from production.
          </p>
        </div>
        <aside>
          <small>Signed in as</small>
          <strong>{userLabel}</strong>
          <p>Execution is restricted to super admins and every request is stored in AI Jobs.</p>
        </aside>
      </section>

      <section className="admin-ai-workbench">
        <div className="admin-ai-command-panel">
          <label htmlFor="admin-ai-prompt">Command</label>
          <textarea
            id="admin-ai-prompt"
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Example: Change Keith Ellison and Ilhan Omar archive track to American civic impact."
            value={prompt}
          />
          <div className="admin-ai-actions">
            <button
              disabled={isSubmitting || !prompt.trim()}
              onClick={() => submitCommand('preview')}
            >
              Preview
            </button>
            <button
              className="danger"
              disabled={isSubmitting || !prompt.trim()}
              onClick={() => submitCommand('execute')}
            >
              Execute
            </button>
          </div>
          <p className="admin-ai-footnote">
            Execute is for whitelisted CMS operations only. Use Preview first for bulk edits.
          </p>
        </div>

        <aside className="admin-ai-examples">
          <span>Try commands</span>
          {examples.map((example) => (
            <button key={example} onClick={() => setPrompt(example)}>
              {example}
            </button>
          ))}
        </aside>
      </section>

      {error ? <div className="admin-ai-error">{error}</div> : null}

      {result ? (
        <section className="admin-ai-result">
          <div className="panel-heading">
            <span>{result.canExecute ? 'Command result' : 'Needs review'}</span>
            <h2>{result.message}</h2>
          </div>
          {result.warnings.length ? (
            <div className="admin-ai-warning">
              {result.warnings.map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          ) : null}
          <div className="admin-ai-operation-list">
            {result.operations.map((operation) => (
              <article key={`${operation.title}-${operation.details}`}>
                <small>{operation.status}</small>
                <h3>{operation.title}</h3>
                <p>{operation.details}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
