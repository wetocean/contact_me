# Contact Me - Project Rules

## Project Overview
Domain purchase inquiry form built with Astro + TypeScript, deployed on Vercel. Uses Nodemailer with Gmail SMTP for email notifications.

## Stack
- **Framework**: Astro 5.x (SSR mode)
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js
- **Deployment**: Vercel (auto-deploy from master branch)
- **Email**: Nodemailer + Gmail SMTP
- **Package Manager**: pnpm

## Project Structure
```
src/
├── pages/
│   ├── index.astro          # Main contact form UI
│   └── api/
│       └── contact.ts       # Form submission API endpoint
public/                      # Static assets
.env                         # Gmail credentials (gitignored)
```

## Development Workflow

### Setup
```bash
pnpm install
# Configure .env with GMAIL_USER and GMAIL_APP_PASSWORD
pnpm dev
```

### Scripts
- `pnpm dev` - Start dev server at localhost:4321
- `pnpm build` - Production build to dist/
- `pnpm preview` - Preview production build locally

### Missing Scripts to Add
Following global rules, these scripts should be added to package.json:
- `check` - Run typecheck + lint (once ESLint/Prettier configured)
- `format` - Auto-format code (once Prettier configured)

## Code Standards

### TypeScript
- Strict mode enabled (`extends: "astro/tsconfigs/strict"`)
- Use `type` over `interface` unless merging/extending required
- Server-side code in `src/pages/api/*.ts`
- Type all function parameters and returns

### Astro-Specific
- SSR output mode (`output: 'server'`)
- Vercel adapter for deployment
- API routes return JSON responses
- Form handling via POST to `/api/contact`

## Email Configuration
- **SMTP**: Gmail App Password required (not regular password)
- **Recipient**: koolwebsites.com@gmail.com
- **Env Vars**: `GMAIL_USER`, `GMAIL_APP_PASSWORD`
- **2FA**: Must be enabled on Google account
- **Secrets**: Never commit .env; use placeholders like {{GMAIL_APP_PASSWORD}}

## Form Fields
Required:
- Domain Name (text)
- Offer Price (USD)
- Your Name (text)
- Your Email (email)

Optional:
- Additional Notes (textarea)

## Security & Validation
- Server-side validation in `api/contact.ts`
- Input sanitization for email content
- Environment variables for credentials only
- No secrets in logs/console output

## Deployment
- **Platform**: Vercel
- **Auto-deploy**: master branch → production
- **Build**: `pnpm run build` (configured in vercel.json)
- **Env Vars**: Set in Vercel Dashboard → Settings → Environment Variables
- **Production URL**: https://contact-42k86znfa-wetoceans-projects.vercel.app

## Dependencies
Core:
- astro@^5.14.7
- @astrojs/vercel@^8.2.10
- nodemailer@^7.0.9
- dotenv@^17.2.3

Dev (to add per global rules):
- ESLint + TypeScript plugin
- Prettier
- @types/* as needed

## Testing (To Implement)
Per global rules, add:
- Unit tests for API endpoint validation logic
- Integration tests for email sending
- E2E tests for form submission flow
- Target: 80%+ coverage for business logic

## Git Conventions
- **Branch**: master (current default)
- **Commits**: Use Conventional Commits format
  - `feat:` new features
  - `fix:` bug fixes
  - `chore:` maintenance
  - `docs:` documentation
- Atomic commits
- Never commit .env or secrets

## Observability (To Implement)
Per global rules, consider adding:
- Structured logging with correlation IDs
- Error tracking (Sentry/similar)
- Health check endpoint
- Email delivery monitoring

## Performance
- Astro static generation where possible
- Minimal JavaScript bundle (Astro default)
- Optimize form submission UX (loading states, error handling)
- Vercel edge functions for fast response times

## Future Improvements
1. Add ESLint + Prettier configuration
2. Add `check` and `format` npm scripts
3. Implement comprehensive test suite
4. Add rate limiting for API endpoint
5. Implement CSRF protection
6. Add structured logging
7. Consider TypeScript strict null checks
8. Add pre-commit hooks (lint-staged + husky)

## Agent Instructions
When working on this codebase:
- Use pnpm for all package operations
- Server-side code must use TypeScript with strict typing
- Email functionality must use placeholders for credentials
- Test email sending before committing API changes
- Follow Astro SSR patterns for new endpoints
- Maintain compatibility with Vercel adapter
- Run `pnpm build` to verify before deploying
