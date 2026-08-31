import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://gridline-day-one.doerksen-jordan.chatgpt.site'),
  title: 'Gridline — Day 1 Map Navigation',
  description:
    'A hands-on beginner trainer for topographic maps, grid references, contours, and field navigation.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Gridline / Day 01',
    description: 'Topographic map and grid navigation trainer.',
    images: [{ url: '/og.png', width: 1728, height: 909, alt: 'Gridline Day 01 topographic navigation trainer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gridline / Day 01',
    description: 'Topographic map and grid navigation trainer.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
