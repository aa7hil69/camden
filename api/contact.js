import {
  sendContactMail,
  validateContactPayload,
} from "./_lib/sendContactMail.js";

function readJson(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === "object") {
      resolve(req.body);
      return;
    }
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const body = await readJson(req);
    const validated = validateContactPayload(body);
    if (!validated.ok) {
      res.status(validated.status).json({ ok: false, error: validated.error });
      return;
    }

    await sendContactMail(validated.fields, process.env);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err?.message || err);
    res.status(err?.status || 500).json({
      ok: false,
      error: "Unable to send message",
    });
  }
}
