import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { nombre, email, asunto, mensaje } = await request.json()

  if (!nombre || !email || !asunto || !mensaje) {
    return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'PS-ELAB <contacto@ps-elab.com>',
    to: ['contacto@ps-elab.com'],
    replyTo: email,
    subject: `[PS-ELAB] ${asunto} — ${nombre}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#CC00FF">Nuevo mensaje desde PS-ELAB</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;font-weight:bold;width:100px">Nombre</td><td style="padding:8px">${nombre}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Asunto</td><td style="padding:8px">${asunto}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px">
          <strong>Mensaje:</strong>
          <p style="white-space:pre-wrap;margin-top:8px">${mensaje}</p>
        </div>
      </div>
    `,
  })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
