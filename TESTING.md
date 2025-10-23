# Testing Documentation

This project includes comprehensive test coverage to ensure the contact form works flawlessly.

## Test Structure

```
tests/
├── unit/                    # Unit tests for validation logic
│   └── validation.test.ts
├── integration/             # Integration tests for API endpoints
│   └── api-contact.test.ts
└── e2e/                     # End-to-end tests with Playwright
    └── contact-form.spec.ts
```

## Test Coverage

### Unit Tests (8 tests)
- ✅ Email validation (valid/invalid formats)
- ✅ Price validation (positive numbers, error cases)
- ✅ Required fields validation
- ✅ Domain name format validation
- ✅ Currency formatting

### Integration Tests (10 tests)
- ✅ API endpoint validation logic
- ✅ Request body structure
- ✅ Email content formatting
- ✅ Environment variable requirements
- ✅ Response format (success/error)

### E2E Tests (18 tests)
- ✅ UI elements visibility and layout
- ✅ Footer attribution link
- ✅ Required field indicators
- ✅ Domain parameter handling (?domain=example.com)
- ✅ Form validation (browser validation)
- ✅ Email format validation
- ✅ Price increment controls ($10 steps)
- ✅ Form submission flow
- ✅ Loading states
- ✅ Responsive design (mobile/tablet)
- ✅ Accessibility (labels, input types, keyboard navigation)

## Running Tests

### All Tests
```bash
pnpm test:all
```

### Unit & Integration Tests
```bash
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:ui           # Interactive UI
pnpm test:coverage     # With coverage report
```

### End-to-End Tests
```bash
pnpm test:e2e          # Run E2E tests
pnpm test:e2e:ui       # Interactive UI mode
```

### Type Checking
```bash
pnpm check             # TypeScript + Astro check
```

### Format Code
```bash
pnpm format            # Prettier format
```

## Test Results

**Current Status: ✅ ALL TESTS PASSING**

- Unit Tests: 8/8 ✅
- Integration Tests: 10/10 ✅
- E2E Tests: 18/18 ✅
- **Total: 36/36 tests passing**

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run unit tests
        run: pnpm test
      
      - name: Install Playwright
        run: pnpm exec playwright install chromium --with-deps
      
      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          GMAIL_USER: ${{ secrets.GMAIL_USER }}
          GMAIL_APP_PASSWORD: ${{ secrets.GMAIL_APP_PASSWORD }}
      
      - name: Type check
        run: pnpm check
```

## Test Scenarios Covered

### 1. Form Validation
- Empty required fields
- Invalid email format
- Negative/zero prices
- Missing fields

### 2. Domain Parameter
- Pre-fill from URL query parameter
- Readonly when parameter present
- Editable when no parameter
- Page title updates

### 3. User Experience
- Loading indicators
- Success/error messages
- Button disabled state during submission
- Form reset after success

### 4. Responsive Design
- Mobile viewport (375x667)
- Tablet viewport (768x1024)
- Desktop viewport (1920x1080)

### 5. Accessibility
- Proper label associations
- Keyboard navigation
- Correct input types
- Required field indicators

### 6. Security
- Server-side validation
- Email format sanitization
- Price validation
- No secrets in tests

## Adding New Tests

### Unit Test Example
```typescript
// tests/unit/new-feature.test.ts
import { describe, it, expect } from 'vitest';

describe('New Feature', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });
});
```

### E2E Test Example
```typescript
// tests/e2e/new-feature.spec.ts
import { test, expect } from '@playwright/test';

test('should display new feature', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#new-feature')).toBeVisible();
});
```

## Debugging Tests

### Unit Tests
```bash
# Run specific test file
pnpm vitest tests/unit/validation.test.ts

# Run tests matching pattern
pnpm vitest -t "Email Validation"

# Debug with UI
pnpm test:ui
```

### E2E Tests
```bash
# Run specific test file
pnpm exec playwright test tests/e2e/contact-form.spec.ts

# Run with headed browser
pnpm exec playwright test --headed

# Debug mode
pnpm exec playwright test --debug

# View report
pnpm exec playwright show-report
```

## Coverage Goals

- **Unit Tests**: 80%+ for business logic
- **Integration Tests**: 100% for API endpoints
- **E2E Tests**: Critical user journeys covered

## Known Limitations

- E2E tests require environment variables for actual email sending
- Tests mock email sending to avoid external dependencies
- Performance tests not included (consider adding k6 or similar)

## Maintenance

- Update tests when adding new features
- Keep test data realistic but safe
- Run full test suite before deployment
- Review failed tests in CI/CD pipelines

---

**Created by [Wet Ocean](https://wetocean.com)**
