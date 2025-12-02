import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, subject, message, recaptcha } = body

    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' // Test key
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${recaptcha}`,
    })

    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA-Verifizierung fehlgeschlagen' },
        { status: 400 }
      )
    }

    // Send email using nodemailer or your email service
    // For now, we'll use a simple approach with nodemailer
    const emailContent = `
Neue Kontaktanfrage von ${name}

E-Mail: ${email}
${company ? `Unternehmen: ${company}` : ''}
Betreff: ${subject}

Nachricht:
${message}
    `.trim()

    // In production, use nodemailer or a service like Resend, SendGrid, etc.
    // For now, we'll log it and you can set up email sending
    console.log('Contact form submission:', {
      to: 'hallo@bsp-media.de',
      subject: `Kontaktanfrage: ${subject}`,
      text: emailContent,
    })

    // TODO: Implement actual email sending
    // Example with nodemailer:
    // const transporter = nodemailer.createTransport({...})
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: 'hallo@bsp-media.de',
    //   subject: `Kontaktanfrage: ${subject}`,
    //   text: emailContent,
    //   replyTo: email,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Anfrage' },
      { status: 500 }
    )
  }
}

