import nodemailer from "nodemailer";

function readBodyFields(data = {}) {
  return {
    name: String(data.name ?? "").trim(),
    email: String(data.email ?? "").trim(),
    message: String(data.message ?? "").trim(),
    website: String(data.website ?? "").trim(),
  };
}

export function validateContactPayload(data) {
  const fields = readBodyFields(data);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);

  if (fields.website) {
    return { ok: false, status: 422, error: "Invalid submission" };
  }
  if (!fields.name || !emailOk || !fields.message) {
    return { ok: false, status: 422, error: "Invalid submission" };
  }
  return { ok: true, fields };
}

export async function sendContactMail(fields, env = process.env) {
  const user = env.SMTP_USER;
  const pass = env.SMTP_PASS;
  const inbox = env.CONTACT_INBOX;

  if (!user || !pass || !inbox) {
    const err = new Error("Mail configuration missing");
    err.status = 500;
    throw err;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || "smtp.gmail.com",
    port: Number(env.SMTP_PORT || 465),
    secure: String(env.SMTP_SECURE ?? "true") !== "false",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Website" <${user}>`,
    to: inbox,
    replyTo: `"${fields.name}" <${fields.email}>`,
    subject: `New message from ${fields.name}`,
    text: `From: ${fields.name} <${fields.email}>\n\n${fields.message}`,
  });
}
