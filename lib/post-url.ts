import type { BlogPost } from "@/types/blog";

/** Canonical URL for a post based on content tier (blog / path / core). */
export function getPostUrl(
  post: Pick<BlogPost, "slug" | "content_tier">,
): string {
  if (post.content_tier === "core") return `/core/${post.slug}`;
  if (post.content_tier === "path") return `/path/${post.slug}`;
  return `/blog/${post.slug}`;
}
