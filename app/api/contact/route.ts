import { NextResponse } from 'next/server';
import { Resend } from 'resend';


// Échappe le HTML pour ne pas injecter le contenu du formulaire tel quel dans l'email
const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const firstName = esc(raw.firstName).slice(0, 80);
    const lastName = esc(raw.lastName).slice(0, 80);
    const email = String(raw.email ?? '').trim().slice(0, 200);
    const subject = esc(raw.subject).slice(0, 160);
    const message = esc(raw.message).slice(0, 5000).replace(/\n/g, '<br/>');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;

    // Validation basique
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Formulaire indisponible pour le moment, écris-moi directement par email.' }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Email vérifié de Resend
      to: ['pro.mael.dev@gmail.com'],
      replyTo: email, // Pour pouvoir répondre directement
      subject: `${subject} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Nouveau message depuis ton portfolio</h2>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong style="color: #666;">Prénom:</strong> ${firstName}</p>
              <p style="margin: 5px 0;"><strong style="color: #666;">Nom:</strong> ${lastName}</p>
              <p style="margin: 5px 0;"><strong style="color: #666;">Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong style="color: #666;">Objet:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #fff; border-left: 4px solid #4F46E5; padding: 15px; margin: 20px 0;">
              <p style="color: #666; margin: 0;"><strong>Message:</strong></p>
              <p style="color: #333; margin-top: 10px; line-height: 1.6;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #888; font-size: 14px; text-align: center; margin: 0;">
              Tu peux répondre directement en cliquant sur "Répondre" à cet email
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ Email envoyé avec succès!', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}