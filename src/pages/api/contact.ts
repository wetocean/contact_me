import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config();

type ContactFormData = {
  domainName: string;
  price: string;
  name: string;
  email: string;
  note?: string;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.domainName || !data.price || !data.name || !data.email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate price is a positive number
    const price = parseFloat(data.price);
    if (isNaN(price) || price <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid price format' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Format price as currency
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);

    // Email content
    const emailSubject = `Domain Purchase Inquiry: ${data.domainName}`;
    const emailBody = `
New Domain Purchase Inquiry

Domain Name: ${data.domainName}
Offered Price: ${formattedPrice}

Contact Information:
Name: ${data.name}
Email: ${data.email}

${data.note ? `Additional Notes:\n${data.note}` : 'No additional notes provided.'}

---
This inquiry was submitted via the contact form at ${new Date().toISOString()}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'koolwebsites.com@gmail.com',
      subject: emailSubject,
      text: emailBody,
      replyTo: data.email,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email. Please try again later.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};