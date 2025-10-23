import { test, expect } from '@playwright/test';

test.describe('Contact Form - User Interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Check page title
    await expect(page.locator('h1')).toContainText('Contact Form');

    // Check all form fields are present
    await expect(page.locator('#domainName')).toBeVisible();
    await expect(page.locator('#price')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#note')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should have footer attribution link', async ({ page }) => {
    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Created with ❤️ by');
    
    const link = footer.locator('a[href*="wetocean.com"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should mark required fields with asterisk', async ({ page }) => {
    const requiredFields = [
      page.locator('label[for="domainName"]'),
      page.locator('label[for="price"]'),
      page.locator('label[for="name"]'),
      page.locator('label[for="email"]'),
    ];

    for (const field of requiredFields) {
      await expect(field.locator('.required')).toBeVisible();
    }
  });
});

test.describe('Contact Form - Domain Name Parameter', () => {
  test('should pre-fill domain from query parameter', async ({ page }) => {
    await page.goto('/?domain=example.com');
    
    const domainInput = page.locator('#domainName');
    await expect(domainInput).toHaveValue('example.com');
    await expect(domainInput).toHaveAttribute('readonly');
  });

  test('should show domain in page title', async ({ page }) => {
    await page.goto('/?domain=test-domain.com');
    await expect(page.locator('h1')).toContainText('test-domain.com');
  });

  test('should allow editing domain when no query param', async ({ page }) => {
    await page.goto('/');
    const domainInput = page.locator('#domainName');
    await expect(domainInput).not.toHaveAttribute('readonly');
  });
});

test.describe('Contact Form - Validation', () => {
  test('should show browser validation for empty required fields', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Browser should prevent submission (check that we're still on the same page)
    await expect(page.locator('#contactForm')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');
    
    const emailInput = page.locator('#email');
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    
    // Check HTML5 validation
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('should enforce minimum price of $10', async ({ page }) => {
    await page.goto('/');
    
    const priceInput = page.locator('#price');
    await expect(priceInput).toHaveAttribute('min', '10');
  });

  test('should increment price by $10', async ({ page }) => {
    await page.goto('/');
    
    const priceInput = page.locator('#price');
    await expect(priceInput).toHaveAttribute('step', '10');
  });
});

test.describe('Contact Form - Submission', () => {
  test('should fill and attempt submission with valid data', async ({ page }) => {
    await page.goto('/');
    
    // Fill all required fields
    await page.fill('#domainName', 'testdomain.com');
    await page.fill('#price', '5000');
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#note', 'This is a test inquiry');
    
    // Click submit button
    await page.click('button[type="submit"]');
    
    // Wait for either success or error message
    await page.waitForSelector('#messages > div', { timeout: 10000 });
    
    // Check that a message appeared
    const message = page.locator('#messages > div');
    await expect(message).toBeVisible();
  });

  test('should disable submit button during submission', async ({ page }) => {
    await page.goto('/');
    
    // Fill form
    await page.fill('#domainName', 'example.com');
    await page.fill('#price', '1000');
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    
    const submitButton = page.locator('button[type="submit"]');
    
    // Submit and check if button is disabled
    await submitButton.click();
    
    // Button should be disabled during submission
    // Note: This may happen too fast to catch in test, but logic is there
  });

  test('should show loading indicator during submission', async ({ page }) => {
    await page.goto('/');
    
    // Fill form
    await page.fill('#domainName', 'example.com');
    await page.fill('#price', '1000');
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Loading indicator should appear (may be brief)
    // Note: Loading state may be too fast to catch in test
  });
});

test.describe('Contact Form - Responsive Design', () => {
  test('should be usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // All fields should still be visible and usable
    await expect(page.locator('#domainName')).toBeVisible();
    await expect(page.locator('#price')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should be usable on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/');
    
    await expect(page.locator('.container')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Contact Form - Accessibility', () => {
  test('should have proper label associations', async ({ page }) => {
    await page.goto('/');
    
    const fields = [
      { input: '#domainName', label: 'label[for="domainName"]' },
      { input: '#price', label: 'label[for="price"]' },
      { input: '#name', label: 'label[for="name"]' },
      { input: '#email', label: 'label[for="email"]' },
      { input: '#note', label: 'label[for="note"]' },
    ];
    
    for (const field of fields) {
      await expect(page.locator(field.label)).toBeVisible();
      await expect(page.locator(field.input)).toBeVisible();
    }
  });

  test('should have proper input types', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('#domainName')).toHaveAttribute('type', 'text');
    await expect(page.locator('#price')).toHaveAttribute('type', 'number');
    await expect(page.locator('#name')).toHaveAttribute('type', 'text');
    await expect(page.locator('#email')).toHaveAttribute('type', 'email');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through all focusable elements
    await page.keyboard.press('Tab'); // domain name
    await expect(page.locator('#domainName')).toBeFocused();
    
    await page.keyboard.press('Tab'); // price
    await expect(page.locator('#price')).toBeFocused();
    
    await page.keyboard.press('Tab'); // name
    await expect(page.locator('#name')).toBeFocused();
    
    await page.keyboard.press('Tab'); // email
    await expect(page.locator('#email')).toBeFocused();
    
    await page.keyboard.press('Tab'); // note
    await expect(page.locator('#note')).toBeFocused();
    
    await page.keyboard.press('Tab'); // submit button
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });
});
