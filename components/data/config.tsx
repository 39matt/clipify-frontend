import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { FaInstagram, FaTiktok } from 'react-icons/fa6';
import { FiCheck } from 'react-icons/fi';
import { Logo } from './logo';
import {Metadata} from "next";

export interface HeaderLink {
  id: string;
  label: string;
  href: string;
  variant?: string;
}

export interface SignupFeature {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}

export interface FooterLinkItem {
  href: string;
  label: React.ReactNode;
}

export interface SiteConfig {
  logo: React.ComponentType<any>;
  seo: Metadata;
  termsUrl: string;
  privacyUrl: string;
  header: {
    links: HeaderLink[];
  };
  footer: {
    copyright: React.ReactNode;
    links: FooterLinkItem[];
  };
  signup: {
    title: string;
    features: SignupFeature[];
  };
}

const siteConfig: SiteConfig = {
  logo: Logo,
  seo: {
    title: 'Clipify',
    description: 'Povezujemo kreatore i klip editore za viralni sadržaj',
    openGraph: {
      title: 'Clipify',
      description: 'Povezujemo kreatore i klip editore za viralni sadržaj',
      siteName: 'Clipify',
      type: 'website',
    },
  } as Metadata,
  termsUrl: '/uslovi-koriscenja',
  privacyUrl: '/politika-privatnosti',
  header: {
    links: [
      {
        id: 'login',
        label: 'Zaradi kao kliper',
        href: '/signup',
      },
      {
        id: 'register',
        label: 'Pokreni svoju kampanju',
        href: '#kontakt2',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: `Clipify © ${new Date().getFullYear()}`,
    links: [
      {
        href: '/kontakt',
        label: 'Kontakt',
      },
      {
        href: 'https://www.tiktok.com/@clipify.rs',
        label: React.createElement(FaTiktok, { size: 24 }),
      },
      {
        href: 'https://www.instagram.com/clipify.rs/',
        label: React.createElement(FaInstagram, { size: 24 }),
      },
      {
        href: 'https://discord.com/invite/clipifyrs',
        label: React.createElement(FaDiscord, { size: 24 }),
      },
    ],
  },
  signup: {
    title: 'Zašto odabrati našu platformu?',
    features: [
      {
        icon: FiCheck,
        title: 'Besplatno za sve korisnike',
        description: 'Kreirajte ili editujte bez ikakvih skrivenih troškova.',
      },
      {
        icon: FiCheck,
        title: 'Brza i Sigurna Isplata',
        description: 'Brza i sigurna isplata u najkraćem roku.',
      },
      {
        icon: FiCheck,
        title: 'Efikasna Komunikacija',
        description:
            'Aktivno komuniciramo i pružamo podršku svakome kome je potrebna.',
      },
      {
        icon: FiCheck,
        title: 'Jednostavnost Korišćenja',
        description:
            'Korak po korak instrukcije olakšavaju korišćenje i onima koji se prvi put susreću sa platformom.',
      },
    ],
  },
};

export default siteConfig;