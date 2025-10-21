# Contact Me - Domain Purchase Inquiry Form

A clean, responsive contact form for handling domain purchase inquiries. Built with Astro + TypeScript.

## Features

- 📝 Contact form with validation
- 📧 Email notifications via Gmail SMTP
- 🎨 Clean, responsive design
- ⚡ Fast and lightweight (Astro)

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure email settings:**
   - Copy `.env.example` to `.env`
   - Set up Gmail App Password:
     1. Go to [Google Account Settings](https://myaccount.google.com/apppasswords)
     2. Generate a new App Password for "Mail"
     3. Copy the 16-character password
   - Update `.env` with your credentials:
     ```
     GMAIL_USER=koolwebsites.com@gmail.com
     GMAIL_APP_PASSWORD=your-16-character-app-password
     ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

## Email Configuration

The app uses Nodemailer with Gmail SMTP to send emails to `koolwebsites.com@gmail.com`. You'll need:

1. **Gmail App Password** (not your regular password)
2. **Two-factor authentication** enabled on your Google account
3. Environment variables set in `.env` file

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

## Deployment

For production deployment, ensure environment variables are set in your hosting platform.
