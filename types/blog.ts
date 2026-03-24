/**
 * Unified blog post type for components.
 * Uses Sanity Portable Text via `body`.
 */

export interface Category {
  name: string
  slug: string
  description?: string | null
}

export interface BlogPost {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  content_tier?: "path" | "core" | null
  description?: string | null
  excerpt?: string | null
  content?: string | null
  body?: PortableTextBlock[] | null
  cover_image?: string | null
  author_name?: string | null
  author_avatar?: string | null
  tags?: string[] | null
  reading_time?: number | null
  published_at?: string | null
  categories?: Category | null
}

export type PortableTextBlock = {
  _type: string;
  _key: string;
  children?: { _type: string; _key: string; text?: string }[];
  [key: string]: unknown;
};
