import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nom, tel, email, prestation, lieu, date, heure, message } = await req.json();

  try {
    // Email à toi (notification de nouvelle demande)
    await resend.emails.send({
      from: "Slay Studio <onboarding@resend.dev>",
      to: "contact.slaystudio@gmail.com",
      subject: `Nouvelle demande de RDV — ${prestation || "Slay Studio"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #861519;">Nouvelle demande de rendez-vous</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nom</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${nom}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Téléphone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${tel || "Non renseigné"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Prestation</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${prestation || "Non renseignée"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Ville</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lieu || "Non renseignée"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Date souhaitée</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${date ? new Date(date).toLocaleDateString("fr-FR") : "Non renseignée"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Heure souhaitée</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${heure || "Non renseignée"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${message || "Aucun message"}</td></tr>
          </table>
        </div>
      `,
    });

    // Email de confirmation à la cliente
    await resend.emails.send({
      from: "Slay Studio <onboarding@resend.dev>",
      to: email,
      subject: "Ta demande de RDV a bien été reçue ✨",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #861519; font-size: 24px;">Bonjour ${nom} !</h2>
          <p style="color: #555; line-height: 1.6;">
            Ta demande de rendez-vous pour <strong>${prestation || "une prestation"}</strong> a bien été reçue. 🌸
          </p>
          <p style="color: #555; line-height: 1.6;">
            Je reviens vers toi très rapidement pour confirmer ta date et ton heure.
          </p>
          <div style="background: #f0efe9; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0; color: #1a1208; font-size: 14px;"><strong>Ta demande :</strong></p>
            <p style="margin: 8px 0 0; color: #555; font-size: 14px;">Prestation : ${prestation || "Non renseignée"}</p>
            <p style="margin: 4px 0 0; color: #555; font-size: 14px;">Ville : ${lieu || "Non renseignée"}</p>
            ${date ? `<p style="margin: 4px 0 0; color: #555; font-size: 14px;">Date souhaitée : ${new Date(date).toLocaleDateString("fr-FR")}</p>` : ""}
            ${heure ? `<p style="margin: 4px 0 0; color: #555; font-size: 14px;">Heure souhaitée : ${heure}</p>` : ""}
          </div>
          <p style="color: #555; line-height: 1.6;">À très vite,</p>
          <p style="color: #861519; font-weight: bold; font-size: 18px;">Slay Studio 💅</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 12px;">Instagram : @sl.aystudio</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
