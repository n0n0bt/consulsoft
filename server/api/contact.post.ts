export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email and message are required',
    })
  }

  try {
    const response = await fetch('https://www.joshevski.com/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Form-Key': '',
      },
      body: JSON.stringify({
        to: ['info@consulsoft.de'],
        subject: `Kontaktanfrage von ${body.name}${body.company ? ` (${body.company})` : ''}`,
        html: `
          <h2>Neue Kontaktanfrage über consulsoft.de</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>E-Mail:</strong> ${body.email}</p>
          ${body.company ? `<p><strong>Unternehmen:</strong> ${body.company}</p>` : ''}
          ${body.phone ? `<p><strong>Telefon:</strong> ${body.phone}</p>` : ''}
          <hr />
          <p>${body.message.replace(/\n/g, '<br />')}</p>
        `,
        text: `Neue Kontaktanfrage\n\nName: ${body.name}\nE-Mail: ${body.email}${body.company ? `\nUnternehmen: ${body.company}` : ''}${body.phone ? `\nTelefon: ${body.phone}` : ''}\n\n${body.message}`,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Email service error: ${errorText}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email',
    })
  }
})
