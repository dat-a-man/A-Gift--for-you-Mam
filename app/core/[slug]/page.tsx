import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogPostTemplate } from "@/components/templates/blog-post-template";
import {
  getAdjacentPostsForPost,
  getPostBySlug,
  getPostSlugs,
  getRelatedPostsForPost,
} from "@/lib/sanity.queries";

export const revalidate = 0; // Revalidate immediately for dev

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post || post.content_tier !== "core") {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  const description = post.description || post.excerpt || "";
  const tags = post.tags ?? [];

  return {
    title: post.title,
    description,
    authors: post.author_name ? [{ name: post.author_name }] : undefined,
    keywords: tags.length > 0 ? tags : undefined,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
      publishedTime: post.published_at || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  // Ideally we should filter by tier here, but getPostSlugs returns all.
  // For now we map all, and rely on notFound() for incorrect tiers.
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function CoreBlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post || post.content_tier !== "core") {
    notFound();
  }

  const [relatedPosts, adjacentPosts] = await Promise.all([
    getRelatedPostsForPost(post, 4),
    getAdjacentPostsForPost(post),
  ]);

  return (
    <BlogPostTemplate
      post={post}
      relatedPosts={relatedPosts}
      adjacentPosts={adjacentPosts}
    />
  );
}
