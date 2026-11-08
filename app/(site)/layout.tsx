import { BannerBar } from '../components/Banner';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#contenu" className="skip">Aller au contenu</a>
      <BannerBar />
      <Nav />
      <main id="contenu">{children}</main>
      <Footer />
      <Reveal />
    </>
  );
}
