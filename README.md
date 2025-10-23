# Contact Me - Domain Purchase Inquiry Form

> Created with ❤️ by [Wet Ocean](https://wetocean.com)

A clean, responsive contact form for handling domain purchase inquiries. Built with Astro + TypeScript and deployed on Vercel.

**Free to use** • **MIT Licensed** • **Support via [WetOcean.com](https://wetocean.com)**

## Features

- 📝 Dynamic contact form with validation
- 📧 Email notifications via Gmail SMTP (Nodemailer)
- 🎨 Clean, responsive design
- ⚡ Fast and lightweight (Astro SSR)
- 🔒 Environment variable security
- 🚀 Vercel deployment ready

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd contact_me
pnpm install
```

### 2. Configure Email (Required)

**Copy the environment template:**
```bash
cp .env.example .env
```

**Set up Gmail App Password:**

1. Enable **Two-Factor Authentication** on your Google account
2. Go to [Google Account App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new App Password:
   - Select app: **Mail**
   - Select device: **Other (Custom name)** → enter "Contact Form"
4. Copy the 16-character password (remove spaces)

**Update `.env` with your credentials:**

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Optional: Override domain name display
DOMAIN_NAME=example.com
```

⚠️ **Important:** Never commit your `.env` file to Git. It's already in `.gitignore`.

### 3. Start Development Server

```bash
pnpm dev
```

Open http://localhost:4321 in your browser.

## Email Configuration Details

This app uses **Nodemailer** with Gmail SMTP to send inquiry emails.

**Requirements:**
- Gmail account with 2FA enabled
- Gmail App Password (NOT your regular Gmail password)
- Environment variables configured in `.env`

**How it works:**
- Form submissions are sent via POST to `/api/contact`
- Server-side API endpoint validates data and sends email
- Email is sent to the address specified in `GMAIL_USER`

## Form Fields

- **Domain Name** (required): The domain being offered for purchase
- **Offer Price** (required): Price in USD
- **Your Name** (required): Contact person's name  
- **Your Email** (required): Contact email for reply
- **Additional Notes** (optional): Extra details about the offer

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`     |
| `pnpm build`              | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm test`               | Run unit & integration tests                     |
| `pnpm test:e2e`           | Run end-to-end tests                             |
| `pnpm test:all`           | Run all tests                                    |
| `pnpm check`              | TypeScript & Astro type checking                 |
| `pnpm format`             | Format code with Prettier                        |

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **Import to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Vercel will auto-detect Astro settings

3. **Configure Environment Variables:**
   - In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
   - Add the following variables:
     ```
     GMAIL_USER=your-email@gmail.com
     GMAIL_APP_PASSWORD=your-16-character-app-password
     ```
   - Save changes

4. **Deploy:**
   - Vercel will automatically deploy
   - Future pushes to `master` branch will trigger auto-deployments

### Environment Variables Checklist

- [ ] `.env.example` exists in repo (template for developers)
- [ ] `.env` is gitignored (never commit secrets)
- [ ] Local `.env` configured for development
- [ ] Vercel environment variables configured for production

## Customization

### Change Domain Name Display

🎯 **How It Works**

The form title uses this priority order:

1. **Query parameter** (highest): `?domain=example.com`
2. **Environment variable**: `DOMAIN_NAME=example.com` in `.env`
3. **Hostname fallback** (lowest): Automatically detected from current URL

**Use Cases:**
- **Query params**: Multiple domains on same deployment
- **Environment variable**: Set a default domain
- **Hostname fallback**: Automatic detection for simplicity

**Examples:**
```bash
# Example 1: Using query parameter
https://yoursite.com/?domain=premium-domain.com
# Shows: "premium-domain.com Contact Form"

# Example 2: Using environment variable
DOMAIN_NAME=mydomain.com
# Shows: "mydomain.com Contact Form"

# Example 3: No configuration
# Shows: "localhost Contact Form" (or your hostname)
```

### Modify Form Fields

Edit `src/pages/index.astro` to add/remove fields. Update the API endpoint in `src/pages/api/contact.ts` accordingly.

### Change Email Recipient

Emails are sent to the address in `GMAIL_USER` environment variable. To send to a different recipient, modify `src/pages/api/contact.ts`.

## Testing

✅ **36/36 tests passing** - This template includes comprehensive test coverage:

- **Unit Tests (8)**: Validation logic, email format, price validation
- **Integration Tests (10)**: API endpoints, request/response structure
- **E2E Tests (18)**: Full user flows, responsive design, accessibility

```bash
pnpm test:all    # Run all tests
```

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## Attribution & Support

### Footer Link Policy

This template includes a footer link: **"Created with ❤️ by WetOcean.com"**

- ✅ **Free to use** with attribution link intact
- 💰 **Remove the link** by making a one-time donation of **$10+** (or more based on how useful you find this template)
- 🙏 Keeping the link helps others discover this free template

**Make a donation:** Visit [WetOcean.com](https://wetocean.com) to support this project.

### Need Custom Features?

If you need customization or have feature requests, contact us:
- 🌐 **Website:** [WetOcean.com](https://wetocean.com)
- 📧 **Email:** im@wetocean.com

We offer:
- Custom form implementations
- Integration with other email services (SendGrid, AWS SES, etc.)
- Additional features and functionality
- Technical support and consulting

## License

MIT License - Free to use with attribution.

Created and maintained by [Wet Ocean](https://wetocean.com).
