import { notFound } from 'next/navigation';
import { getProjectBySlug, getAdjacentProjects, projects } from '@/lib/projects';
import CaseStudyClient from './CaseStudyClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Goat Scale`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Goat Scale`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: 'article',
      images: [{ url: project.heroImage, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Goat Scale`,
      description: project.summary,
      images: [project.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `https://goatscale.com/work/${project.slug}`,
    dateCreated: project.year,
    creator: { '@type': 'Organization', name: 'Goat Scale' },
    about: project.category,
    keywords: project.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyClient project={project} prev={prev} next={next} />
    </>
  );
}
