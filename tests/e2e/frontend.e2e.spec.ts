import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'load' })

    await expect(page).toHaveTitle(/Muslim Impactors/)
    await expect(page.locator('main > section').first()).toHaveClass(/review-home-grid/)
    await expect(page.locator('.golden-age-rail h2')).toContainText('Golden Age')
    await expect(page.locator('.sponsor-ad-card')).toHaveCount(4)
    await expect.poll(() => page.locator('.portrait-tile').count()).toBeGreaterThanOrEqual(20)

    await page.locator('.portrait-tile').first().click()

    await expect(page.locator('.story-preview-dialog')).toBeVisible()
    await expect(page.locator('.story-preview-dialog h2')).not.toBeEmpty()
    await expect(page.locator('.story-preview-dialog')).toContainText("Go to speaker's page")
  })

  test('story timestamps update the active chapter', async ({ page }) => {
    await page.goto('http://localhost:3000/stories/american-muslim-public-life-and-humanity', {
      waitUntil: 'load',
    })

    const videoFrame = page.locator('.speaker-video-frame iframe')
    const videoPlaceholder = page.locator('.speaker-video-frame .video-placeholder')

    if (await videoFrame.count()) {
      await expect(videoFrame).toHaveAttribute('src', /start=0/)
    } else {
      await expect(videoPlaceholder).toContainText('Video awaiting editorial approval')
    }

    const secondChapter = page.locator('.chapter-list button').nth(1)
    await expect(secondChapter).toContainText('Major works and public memory')
    await secondChapter.click()
    await expect(secondChapter).toHaveClass(/is-active/)

    if (await videoFrame.count()) {
      await expect(videoFrame).toHaveAttribute('src', /start=220/)
    } else {
      await expect(videoPlaceholder).toContainText('Video awaiting editorial approval')
    }
  })
})
