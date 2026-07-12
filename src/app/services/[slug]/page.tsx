import { notFound } from 'next/navigation';
import { getServiceBySlug, getOtherServices, servicePillars } from '@/lib/services';
import { projects } from '@/lib/projects';
import ServiceClient from './ServiceClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return servicePillars.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };
  const title = `${service.kicker} — ${service.title} | Goat Scale`;
  return {
    title,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description: service.tagline,
      url: `/services/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.tagline,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = service.relatedSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = getOtherServices(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.kicker} — ${service.title}`,
    description: service.tagline,
    url: `https://goatscale.com/services/${service.slug}`,
    provider: { '@type': 'Organization', name: 'Goat Scale', url: 'https://goatscale.com' },
    serviceType: service.offerings.map((o) => o.name).join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceClient service={service} related={related} others={others} />
    </>
  );
}
