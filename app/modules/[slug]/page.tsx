import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModuleContent } from '@/components/course/ModuleContent';
import { ModuleShell } from '@/components/course/ModuleShell';
import training from '@/data/training.json';
import lessons from '@/data/module-lessons.json';

type ModuleSlug = keyof typeof lessons;
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return training.modules.map((courseModule) => ({ slug: courseModule.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const courseModule = training.modules.find((item) => item.slug === slug);
  if (!courseModule) return { title: 'Module not found — Gridline' };
  const title = `${courseModule.number} / ${courseModule.title} — Gridline`;
  return {
    title,
    description: courseModule.summary,
    alternates: { canonical: `/modules/${courseModule.slug}` },
    openGraph: { title, description: courseModule.summary, images: [] },
    twitter: { card: 'summary', title, description: courseModule.summary, images: [] },
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { slug } = await params;
  const courseModule = training.modules.find((item) => item.slug === slug);
  if (!courseModule || !(courseModule.slug in lessons)) notFound();
  const lesson = lessons[courseModule.slug as ModuleSlug];
  return <ModuleShell module={courseModule} lesson={lesson}><ModuleContent slug={courseModule.slug} /></ModuleShell>;
}
