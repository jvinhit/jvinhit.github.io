import { SITE } from './site-config';

/**
 * Structured-data (JSON-LD) builders.
 *
 * Functions return plain objects; the layout serializes them into
 * `<script type="application/ld+json">`. Stable `@id` anchors let the post
 * graph reference the shared Person/WebSite nodes instead of duplicating them.
 */
type JsonLd = Record<string, unknown>;

const personId = (siteUrl: string) => `${siteUrl}#person`;
const websiteId = (siteUrl: string) => `${siteUrl}#website`;

/** Author identity — reused as both author and publisher of posts. */
export function personSchema(siteUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(siteUrl),
    name: SITE.author.name,
    url: siteUrl,
    jobTitle: SITE.author.title,
    sameAs: SITE.socials.map((s) => s.href),
  };
}

/** Site-level node. */
export function websiteSchema(siteUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(siteUrl),
    url: siteUrl,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.lang,
    publisher: { '@id': personId(siteUrl) },
  };
}

export interface BlogPostingInput {
  /** Canonical absolute URL of the post. */
  url: string;
  /** Absolute origin (no trailing slash), e.g. `https://jvinhit.github.io`. */
  siteUrl: string;
  title: string;
  description: string;
  /** Absolute URL to the OG image. */
  image: string;
  /** ISO 8601 string. */
  datePublished: string;
  /** ISO 8601 string. */
  dateModified?: string;
  tags?: readonly string[];
}

export function blogPostingSchema(input: BlogPostingInput): JsonLd {
  const { url, siteUrl, title, description, image, datePublished } = input;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    datePublished,
    dateModified: input.dateModified ?? datePublished,
    inLanguage: SITE.lang,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: { '@id': personId(siteUrl) },
    publisher: { '@id': personId(siteUrl) },
    isPartOf: { '@id': websiteId(siteUrl) },
    ...(input.tags && input.tags.length > 0
      ? { keywords: input.tags.join(', ') }
      : {}),
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Absolute URL. */
  url: string;
}

export function breadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
