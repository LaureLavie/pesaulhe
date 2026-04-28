

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: 'Cormorant'; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 40px; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="font-weight: normal; font-style: italic; font-size: 24px; border-bottom: 1px solid #d4af37; display: inline-block; padding-bottom: 10px;">
          Pesaulhe & Noulibos
        </h2>
        <p style="text-transform: uppercase; font-size: 12px; letter-spacing: 2px; color: #888; margin-top: 10px;">
          Nouveau message de contact
        </p>
      </div>

      <div style="margin-bottom: 30px;">
        <p style="margin: 5px 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #d4af37;">Expéditeur :</strong><br/> ${name}</p>
        <p style="margin: 5px 0;"><strong style="text-transform: uppercase; font-size: 11px; color: #d4af37;">Email :</strong><br/> ${email}</p>
      </div>

      <div style="background-color: #fafafa; padding: 25px; border-left: 3px solid #d4af37; font-style: italic;">
        ${message.replace(/\n/g, '<br/>')}
      </div>

      <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #aaa; border-top: 1px solid #eee; padding-top: 20px;">
        Ce message a été envoyé depuis le formulaire de contact du site Pesaulhe & Noulibos.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nouveau message de ${name} - Site Pesaulhe & Noulibos`,
      text: `De: ${name} (${email})\n\nMessage: ${message}`,
      html: htmlContent,
    });
    return NextResponse.json({ message: "Sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}