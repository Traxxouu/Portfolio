import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { imageUrl } from '@/lib/sanity.client';

type Img = { asset?: unknown; alt?: string; caption?: string };
type Code = { code?: string; filename?: string; language?: string };

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: Img }) => {
      const src = imageUrl(value as never, 1400);
      if (!src) return null;
      return (
        <figure>
          <div className="cut" style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: 'var(--panel)' }}>
            <Image src={src} alt={value.alt || ''} fill sizes="(max-width: 900px) 100vw, 44rem" className="cover" />
          </div>
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    code: ({ value }: { value: Code }) => (
      <figure>
        {value.filename && <figcaption style={{ marginTop: 0, marginBottom: '.5rem' }}>{value.filename}</figcaption>}
        <pre>
          <code>{value.code}</code>
        </pre>
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href || '#';
      const ext = href.startsWith('http');
      return (
        <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    },
  },
};

export function PortableBody({ value }: { value?: unknown[] }) {
  if (!value?.length) return null;
  return (
    <div className="prose">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
