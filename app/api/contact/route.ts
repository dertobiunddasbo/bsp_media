import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, subject, message, recaptcha } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error('Missing required fields:', { name, email, subject, message })
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA (optional in development)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' // Test key
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.RECAPTCHA_SECRET_KEY
    
    if (recaptcha && !isDevelopment) {
      try {
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${recaptchaSecret}&response=${recaptcha}`,
        })

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success) {
          console.warn('reCAPTCHA verification failed:', recaptchaData)
          // In development, we allow it to pass
          if (!isDevelopment) {
            return NextResponse.json(
              { error: 'reCAPTCHA-Verifizierung fehlgeschlagen' },
              { status: 400 }
            )
          }
        }
      } catch (recaptchaError) {
        console.error('reCAPTCHA verification error:', recaptchaError)
        // In development, continue without reCAPTCHA
        if (!isDevelopment) {
          return NextResponse.json(
            { error: 'Fehler bei der reCAPTCHA-Verifizierung' },
            { status: 500 }
          )
        }
      }
    }

    // Prepare email content
    const emailSubject = `Kontaktanfrage: ${subject}`
    
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
          subject: emailSubject,
          text: emailContent,
          replyTo: email,
        })
        return NextResponse.json({ 
          success: true, 
          message: 'E-Mail geloggt (RESEND_API_KEY fehlt - lokale Entwicklung)',
          development: true
        })
      }

      // Initialize Resend only when API key is available
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      const htmlContent = `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Von:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
        ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ''}
        <p><strong>Betreff:</strong> ${subject}</p>
        <hr />
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        replyTo: email,
        subject: emailSubject,
        text: emailContent,
        html: htmlContent,
      })

      if (error) {
        console.error('Resend error:', error)
        // Fallback: log the email if sending fails
        console.log('Fallback: E-Mail wird geloggt:', {
          to: recipientEmail,
          subject: emailSubject,
          text: emailContent,
        })
        return NextResponse.json({ 
          success: true, 
          message: 'E-Mail-Versand fehlgeschlagen, wurde geloggt',
          error: error.message || 'Unknown error'
        })
      }

      return NextResponse.json({ 
        success: true, 
        messageId: data?.id,
        message: 'E-Mail erfolgreich gesendet'
      })
    } catch (emailError: any) {
      console.error('Error sending email:', emailError)
      // Fallback: log the email if sending fails
      console.log('Fallback: E-Mail wird geloggt:', {
        to: recipientEmail,
        subject: emailSubject,
        text: emailContent,
      })
      return NextResponse.json({ 
        success: true, 
        message: 'E-Mail-Versand fehlgeschlagen, wurde geloggt',
        error: emailError?.message || 'Unknown error'
      })
    }
  } catch (error: any) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { 
        error: 'Fehler beim Verarbeiten der Anfrage',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

