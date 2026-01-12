import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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

    // Prepare email content
    const emailContent = `
Neue Kontaktanfrage von ${name}

E-Mail: ${email}
${company ? `Unternehmen: ${company}` : ''}
Betreff: ${subject}

Nachricht:
${message}
    `.trim()

    // Send email using Resend
    const recipientEmail = process.env.CONTACT_EMAIL || 'hallo@bsp-media.de'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@bsp-media.de'

      try {
      // If RESEND_API_KEY is not set, log the email instead (for development)
      if (!process.env.RESEND_API_KEY) {
        console.log('⚠️ RESEND_API_KEY nicht gesetzt. E-Mail wird nur geloggt:')
        console.log({
          to: recipientEmail,
          from: fromEmail,
          subject: `Kontaktanfrage: ${subject}`,
          text: emailContent,
          replyTo: email,
        })
        return NextResponse.json({ success: true, message: 'E-Mail geloggt (RESEND_API_KEY fehlt)' })
      }

      // Initialize Resend only when API key is available
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        replyTo: email,
        subject: `Kontaktanfrage: ${subject}`,
        text: emailContent,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Von:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ''}
          <p><strong>Betreff:</strong> ${subject}</p>
          <hr />
          <p><strong>Nachricht:</strong></p>
          <p>${message.replace(/\n/g, '<br />')}</p>
        `,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { error: 'Fehler beim Versenden der E-Mail' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, messageId: data?.id })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Fallback: log the email if sending fails
      console.log('Fallback: E-Mail wird geloggt:', {
        to: recipientEmail,
        subject: `Kontaktanfrage: ${subject}`,
        text: emailContent,
      })
      return NextResponse.json({ success: true, message: 'E-Mail-Versand fehlgeschlagen, wurde geloggt' })
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Anfrage' },
      { status: 500 }
    )
  }
}

