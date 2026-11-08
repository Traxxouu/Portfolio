import type { Metadata } from 'next';
import Image from 'next/image';
import { PROFILE } from '@/lib/content';
import { ContactForm } from '../../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contacter Maël Barbe pour un site, une application ou une collaboration.',
};

export default function ContactPage() {
  return (
    <section className="contact">
      <div className="wrap contact-in">
        <div className="contact-side">
          <div className="sec-tab">
            <span className="label">04 // Contact</span>
            <span className="f-jp">連絡</span>
          </div>
          <h1 className="f-display contact-title">
            On construit
            <br />
            <span className="red">quoi ?</span>
          </h1>
          <p className="sec-intro">Un site, une application, une collaboration ou juste une question : écris-moi, je réponds en général dans la journée.</p>
          <ul className="contact-list">
            <li>
              <span className="label dim">Email</span>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </li>
            <li>
              <span className="label dim">LinkedIn</span>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">maelbarbe ↗</a>
            </li>
            <li>
              <span className="label dim">GitHub</span>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">Traxxouu ↗</a>
            </li>
            <li>
              <span className="label dim">CV</span>
              <a href={PROFILE.cv} target="_blank" rel="noopener noreferrer">Télécharger (PDF) ↓</a>
            </li>
            <li>
              <span className="label dim">Agence</span>
              <a href={PROFILE.yourweb} target="_blank" rel="noopener noreferrer">yourweb.fr ↗</a>
            </li>
          </ul>
          <div className="contact-photo cut">
            <Image src="/images/eiffel.webp" alt="La tour Eiffel la nuit, photo de Maël" fill sizes="(max-width: 900px) 100vw, 40vw" className="cover" />
          </div>
        </div>
        <div className="contact-form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
