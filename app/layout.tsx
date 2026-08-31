import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gridline — Day 1 Map Navigation',
  description:
    'A hands-on beginner trainer for topographic maps, grid references, contours, and field navigation.',
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
