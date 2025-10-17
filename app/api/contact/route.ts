import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Email vérifié de Resend
      to: ['pro.mael.dev@gmail.com'],
      replyTo: email, // Pour pouvoir répondre directement
      subject: `Nouveau message de ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Nouveau message depuis ton portfolio 🚀</h2>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong style="color: #666;">Nom:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong style="color: #666;">Email:</strong> ${email}</p>
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}