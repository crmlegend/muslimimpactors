'use client'

import React, { FormEvent, useState } from 'react'

const initialState = {
  affiliation: '',
  articleSummary: '',
  biography: '',
  email: '',
  expertise: '',
  name: '',
  password: '',
  proposedTopic: '',
  requestedRole: 'author',
  sourceOwnership: 'original',
  websiteOrSocial: '',
}

export default function ContributorSignupForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field: keyof typeof initialState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/contributor-signup', {
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const payload = (await response.json().catch(() => ({}))) as { message?: string }

      if (!response.ok) {
        throw new Error(payload.message || 'Signup failed')
      }

      setStatus(
        payload.message ||
          'Signup received. Your account and contributor application are now queued for review.',
      )
      setForm(initialState)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Signup could not be submitted.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <label>
        Name
        <input
          onChange={(event) => updateField('name', event.target.value)}
          required
          type="text"
          value={form.name}
        />
      </label>
      <label>
        Contact email
        <input
          onChange={(event) => updateField('email', event.target.value)}
          required
          type="email"
          value={form.email}
        />
      </label>
      <label>
        Password
        <input
          minLength={8}
          onChange={(event) => updateField('password', event.target.value)}
          required
          type="password"
          value={form.password}
        />
      </label>
      <label>
        Requested role
        <select
          onChange={(event) => updateField('requestedRole', event.target.value)}
          value={form.requestedRole}
        >
          <option value="author">Author</option>
          <option value="editor">Editor</option>
          <option value="subscriber">Subscriber</option>
        </select>
      </label>
      <label>
        Biography
        <textarea
          onChange={(event) => updateField('biography', event.target.value)}
          placeholder="Required for authors; shown publicly only after approval."
          required={form.requestedRole === 'author'}
          rows={4}
          value={form.biography}
        />
      </label>
      <label>
        Expertise
        <textarea
          onChange={(event) => updateField('expertise', event.target.value)}
          placeholder="Research background, writing focus, community role, or lived expertise."
          rows={3}
          value={form.expertise}
        />
      </label>
      <label>
        Proposed topic
        <input
          onChange={(event) => updateField('proposedTopic', event.target.value)}
          placeholder="Article, personality, source, or story idea"
          type="text"
          value={form.proposedTopic}
        />
      </label>
      <label>
        Article summary
        <textarea
          onChange={(event) => updateField('articleSummary', event.target.value)}
          placeholder="What would you like reviewers to consider?"
          rows={3}
          value={form.articleSummary}
        />
      </label>
      <label>
        Source ownership
        <select
          onChange={(event) => updateField('sourceOwnership', event.target.value)}
          value={form.sourceOwnership}
        >
          <option value="original">Original writing</option>
          <option value="licensed">Licensed material</option>
          <option value="public_domain">Public domain material</option>
          <option value="permission_granted">Permission granted</option>
          <option value="needs_review">Unsure / needs review</option>
        </select>
      </label>
      <label>
        Affiliation
        <input
          onChange={(event) => updateField('affiliation', event.target.value)}
          type="text"
          value={form.affiliation}
        />
      </label>
      <label>
        Website or social profile
        <input
          onChange={(event) => updateField('websiteOrSocial', event.target.value)}
          type="text"
          value={form.websiteOrSocial}
        />
      </label>
      <button disabled={submitting} type="submit">
        {submitting ? 'Submitting...' : 'Create account and submit for review'}
      </button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  )
}
