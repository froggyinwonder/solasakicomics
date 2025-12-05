// api/contact.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(s = "") {
  return String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // basic length & email sanity checks
    if (String(message).length > 5000) {
      return res.status(400).json({ error: "Message too long" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <hr />
        <div style="white-space:pre-wrap">${sanitize(message)}</div>
      </div>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "Solasaki Comics <no-reply@solasaki.com>",
      to: process.env.TO_EMAIL || "solasakicomics@gmail.com",
      subject: `Website contact from ${name}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact send error:", err);
    return res.status(500).json({ error: "Could not send message" });
  }
}
