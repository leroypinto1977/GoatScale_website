import { notFound } from 'next/navigation';
import Link from 'next/link';
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
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(slug);
  return <CaseStudyClient project={project} prev={prev} next={next} />;
}
