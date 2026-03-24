import { client } from "./sanity";
import type { BlogPost, Category } from "@/types/blog";
import { dummyPosts, dummyCategories } from "./dummyData";

// Use dummy data (5 Grandma Williams–style posts) until Sanity is explicitly enabled
const useDummyData = () =>
  process.env.NEXT_PUBLIC_USE_SANITY !== "true";

const isConfigured = () =>
  !useDummyData() &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id";

/**
 * GROQ query: Fetch all published posts for listing.
 * Adjust field names to match your Sanity schema (e.g. mainImage vs cover_image).
 */
export const postsQuery = `
  *[_type == "post" && defined(slug.current) && publishedAt != null] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "content_tier": contentTier,
    description,
    excerpt,
    "cover_image": mainImage.asset->url,
    "author_name": coalesce(author->name, authorName),
    "author_avatar": coalesce(author->image.asset->url, authorImage.asset->url),
    tags,
    "published_at": publishedAt,
    "created_at": _createdAt,
    "updated_at": _updatedAt,
    "reading_time": readingTime,
    category->{
      name,
      "slug": slug.current,
      "description": coalesce(description, Description)
    }
  }
`;

/**
 * GROQ query: Fetch a single post by slug.
 */
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug && publishedAt != null][0] {
    _id,
    title,
    "slug": slug.current,
    "content_tier": contentTier,
    description,
    excerpt,
    "cover_image": mainImage.asset->url,
    "author_name": coalesce(author->name, authorName),
    "author_avatar": coalesce(author->image.asset->url, authorImage.asset->url),
    tags,
    "published_at": publishedAt,
    "created_at": _createdAt,
    "updated_at": _updatedAt,
    "reading_time": readingTime,
    body,
    category->{
      name,
      "slug": slug.current,
      "description": coalesce(description, Description)
    }
  }
`;

/**
 * GROQ query: Fetch all post slugs for static params.
 */
export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current) && publishedAt != null]{ "slug": slug.current }
`;

/** GROQ query: Fetch all categories */
export const categoriesWithCountQuery = `
  *[_type == "category" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "count": count(*[_type == "post" && publishedAt != null && references(^._id)])
  }
`;

/** GROQ query: Fetch category slugs for static params */
export const categorySlugsQuery = `
  *[_type == "category" && defined(slug.current)]{ "slug": slug.current }
`;

/**
 * GROQ query: Fetch all categories.
 */
export const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    name,
    "slug": slug.current,
    "description": coalesce(description, Description)
  }
`

export async function getPosts(): Promise<BlogPost[]> {
  if (!isConfigured()) return dummyPosts;
  const items = await client.fetch<SanityPostListItem[]>(postsQuery);
  return items.map((item) => toBlogPost(item)!);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isConfigured()) return dummyPosts.find(p => p.slug === slug) || null;
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  return toBlogPost(post, post?.body ?? null);
}

export async function getPostSlugs() {
  if (!isConfigured()) return dummyPosts.map(p => ({ slug: p.slug }));
  const result = await client.fetch<{ slug: string }[]>(postSlugsQuery);
  return result ?? [];
}

export async function getCategories(): Promise<Category[]> {
  if (!isConfigured()) return dummyCategories;
  const result = await client.fetch<Category[]>(categoriesQuery)
  return result ?? []
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Get unique tags from all posts with usage count. Slug = lowercase, spaces to hyphens */
export async function getTags(): Promise<
  { name: string; slug: string; count: number }[]
> {
  if (!isConfigured()) {
    const tagSet = new Map<string, { name: string; count: number }>();
    for (const item of dummyPosts) {
      for (const name of item.tags ?? []) {
        const s = slugify(name);
        const existing = tagSet.get(s);
        if (existing) existing.count += 1;
        else tagSet.set(s, { name, count: 1 });
      }
    }
    return Array.from(tagSet.entries())
      .map(([slug, value]) => ({ name: value.name, slug, count: value.count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  const items = await client.fetch<{ tags?: string[] }[]>(
    `*[_type == "post" && publishedAt != null && defined(tags)]{ tags }`,
  );
  const tagSet = new Map<string, { name: string; count: number }>();
  for (const item of items) {
    for (const name of item.tags ?? []) {
      const s = slugify(name);
      const existing = tagSet.get(s);
      if (existing) {
        existing.count += 1;
      } else {
        tagSet.set(s, { name, count: 1 });
      }
    }
  }
  return Array.from(tagSet.entries())
    .map(([slug, value]) => ({ name: value.name, slug, count: value.count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Get posts that have a tag matching the given slug */
export async function getPostsByTagSlug(slug: string): Promise<BlogPost[]> {
  if (!isConfigured()) return dummyPosts.filter(p => p.tags?.some(t => slugify(t) === slug));
  const items = await client.fetch<SanityPostListItem[]>(postsQuery);
  const filtered = items.filter((p) =>
    p.tags?.some((t) => slugify(t) === slug),
  );
  return filtered.map((item) => toBlogPost(item)!);
}

export async function getCategoriesWithCount(): Promise<
  { name: string; slug: string; count: number }[]
> {
  if (!isConfigured()) {
    return dummyCategories.map(c => ({
      name: c.name,
      slug: c.slug,
      count: dummyPosts.filter(p => p.categories?.slug === c.slug).length
    }));
  }
  const items =
    await client.fetch<{ name: string; slug: string; count: number }[]>(
      categoriesWithCountQuery,
    );
  return items ?? [];
}

export async function getCategorySlugs(): Promise<{ slug: string }[]> {
  if (!isConfigured()) return dummyCategories.map(c => ({ slug: c.slug }));
  const items = await client.fetch<{ slug: string }[]>(categorySlugsQuery);
  return items ?? [];
}

export async function getPostsByCategorySlug(
  slug: string,
): Promise<BlogPost[]> {
  if (!isConfigured()) return dummyPosts.filter(p => p.categories?.slug === slug);
  const items = await client.fetch<SanityPostListItem[]>(postsQuery);
  const filtered = items.filter((post) => post.category?.slug === slug);
  return filtered.map((item) => toBlogPost(item)!);
}

export async function getPostsByContentTier(
  tier: "path" | "core",
): Promise<BlogPost[]> {
  if (!isConfigured()) return [];
  const items = await client.fetch<SanityPostListItem[]>(postsQuery);
  const filtered = items.filter((post) => post.content_tier === tier);
  return filtered.map((item) => toBlogPost(item)!);
}

/** Smaller post ref for prev/next navigation */
export interface AdjacentPostRef {
  title: string;
  slug: string;
  content_tier?: "path" | "core" | null;
}

const adjacentPostsQuery = `{
  "prev": *[_type == "post" && publishedAt != null && publishedAt < $publishedAt] | order(publishedAt desc) [0] {
    title,
    "slug": slug.current,
    "content_tier": contentTier
  },
  "next": *[_type == "post" && publishedAt != null && publishedAt > $publishedAt] | order(publishedAt asc) [0] {
    title,
    "slug": slug.current,
    "content_tier": contentTier
  }
}`;

/**
 * Older post = "Previous" (published before current).
 * Newer post = "Next" (published after current).
 */
export async function getAdjacentPostsForPost(
  post: BlogPost,
): Promise<{ prev: AdjacentPostRef | null; next: AdjacentPostRef | null }> {
  if (!isConfigured()) {
    const idx = dummyPosts.findIndex(p => p.slug === post.slug);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx < dummyPosts.length - 1 ? { title: dummyPosts[idx+1].title, slug: dummyPosts[idx+1].slug } : null,
      next: idx > 0 ? { title: dummyPosts[idx-1].title, slug: dummyPosts[idx-1].slug } : null,
    };
  }
  const publishedAt = post.published_at ?? post.created_at;
  if (!publishedAt) {
    return { prev: null, next: null };
  }
  const result = await client.fetch<{
    prev: AdjacentPostRef | null;
    next: AdjacentPostRef | null;
  }>(adjacentPostsQuery, { publishedAt });
  return {
    prev: result?.prev ?? null,
    next: result?.next ?? null,
  };
}

export async function getRelatedPostsForPost(
  post: BlogPost,
  limit = 4,
): Promise<BlogPost[]> {
  if (!isConfigured()) {
    return dummyPosts.filter(p => p.slug !== post.slug).slice(0, limit);
  }

  const allPosts = await getPosts();
  const currentTags = post.tags ?? [];

  const scored = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = 0;

      if (
        post.categories?.slug &&
        candidate.categories?.slug &&
        post.categories.slug === candidate.categories.slug
      ) {
        score += 3;
      }

      const candidateTags = candidate.tags ?? [];
      const sharedTagCount = candidateTags.filter((tag) =>
        currentTags.includes(tag),
      ).length;
      score += sharedTagCount;

      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        new Date(b.candidate.published_at ?? b.candidate.created_at).getTime() -
        new Date(a.candidate.published_at ?? a.candidate.created_at).getTime()
      );
    })
    .slice(0, limit)
    .map((item) => item.candidate);

  return scored;
}

/** Raw Sanity post (list item - no body) */
export interface SanityPostListItem {
  _id: string;
  title: string;
  slug: string;
  content_tier?: "path" | "core" | null;
  description?: string | null;
  excerpt?: string | null;
  cover_image?: string | null;
  author_name?: string | null;
  author_avatar?: string | null;
  tags?: string[] | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  reading_time?: number | null;
  category?: Category | null;
}

/** Sanity post with body (Portable Text blocks) */
export interface SanityPost extends SanityPostListItem {
  body?: PortableTextBlock[] | null;
}

export type PortableTextBlock = {
  _type: string;
  _key: string;
  children?: { _type: string; _key: string; text?: string }[];
  [key: string]: unknown;
};

/** Map Sanity post to unified BlogPost format */
export function toBlogPost(
  item: SanityPostListItem | null,
  body?: PortableTextBlock[] | null,
): BlogPost | null {
  if (!item) return null;
  return {
    id: item._id,
    created_at: item.created_at,
    updated_at: item.updated_at,
    title: item.title,
    slug: item.slug,
    content_tier: item.content_tier ?? null,
    description: item.description,
    excerpt: item.excerpt,
    cover_image: item.cover_image,
    author_name: item.author_name,
    author_avatar: item.author_avatar,
    tags: item.tags,
    reading_time: item.reading_time,
    published_at: item.published_at,
    categories: item.category ?? null,
    body: body ?? null,
  };
}