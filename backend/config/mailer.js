
const sendMail = async ({ to, subject, html, text }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.EMAIL_FROM;

  if (!apiKey || !sender) {
    throw new Error("RESEND_API_KEY or EMAIL_FROM is missing");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || `Resend email failed: ${response.status}`
    );
  }

  return result;
};

module.exports = { sendMail };
