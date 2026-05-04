import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })

    await expect(page).toHaveTitle(/Muslim Impactors/)
    await expect(page.locator('main > section').first()).toHaveClass(/hero-figure/)
    await expect(page.locator('h1').first()).toHaveText('Muhammad Ali')
    await expect(page.locator('.portrait-tile')).toHaveCount(24)

    await page.locator('[data-person-slug="muhammad-ali"]').click()

    await expect(page.locator('.story-preview-dialog')).toBeVisible()
    await expect(page.locator('.story-preview-dialog h2')).toContainText(
      'American Muslim public life and humanity',
    )
    await expect(page.locator('.story-preview-dialog')).toContainText("Go to speaker's page")
  })

  test('story timestamps seek the embedded video', async ({ page }) => {
    await page.goto('http://localhost:3000/stories/american-muslim-public-life-and-humanity', {
      waitUntil: 'domcontentloaded',
    })

    await expect(page.locator('.speaker-video-frame iframe')).toHaveAttribute(
      'src',
      /start=0/,
    )

    await page.getByRole('button', { name: /Major works and public memory/ }).click()

    await expect(page.locator('.speaker-video-frame iframe')).toHaveAttribute(
      'src',
      /start=220/,
    )
  })
})
