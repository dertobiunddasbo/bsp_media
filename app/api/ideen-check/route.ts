import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, story, concern, email, attachmentName } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' },
        { status: 400 }
      )
    }

    const subject = `24h Ideen-Check: ${title || 'Neue Einreichung'}`
    const text = [
      `Neue Ideen-Check-Einreichung`,
      ``,
      `E-Mail: ${email}`,
      `Arbeitstitel / Thema: ${title || '–'}`,
      `Größte Sorge: ${concern || '–'}`,
      ``,
      `Story / Konzept (Text):`,
      story || '–',
      ``,
      attachmentName ? `Anhang (per E-Mail): ${attachmentName}` : '',
    ].filter(Boolean).join('\n')

    const recipientEmail = process.env.CONTACT_EMAIL || 'hallo@bsp-media.de'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@bsp-media.de'

    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ RESEND_API_KEY nicht gesetzt. Ideen-Check wird nur geloggt:', {
        to: recipientEmail,
        subject,
        text,
      })
      return NextResponse.json({
        success: true,
        message: 'E-Mail geloggt (RESEND_API_KEY fehlt – lokale Entwicklung)',
        development: true,
      })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject,
      text,
      html: `
        <h2>Neue 24h Ideen-Check-Einreichung</h2>
        <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Arbeitstitel / Thema:</strong> ${title || '–'}</p>
        <p><strong>Größte Sorge:</strong> ${concern || '–'}</p>
        <hr />
        <p><strong>Story / Konzept:</strong></p>
        <p>${(story || '–').replace(/\n/g, '<br />')}</p>
        ${attachmentName ? `<p><em>Anhang (per E-Mail): ${attachmentName}</em></p>` : ''}
      `,
    })

    if (error) {
      console.error('Resend error (ideen-check):', error)
      const message = error?.message || 'Unbekannter Fehler'
      return NextResponse.json(
        {
          success: false,
          error: 'E-Mail konnte nicht gesendet werden.',
          details: process.env.NODE_ENV === 'development' ? message : undefined,
          resendMessage: message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error: unknown) {
    console.error('Error processing ideen-check form:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Fehler beim Verarbeiten der Anfrage',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}
