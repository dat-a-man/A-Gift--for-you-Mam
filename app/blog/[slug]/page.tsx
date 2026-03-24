import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogPostTemplate } from "@/components/templates/blog-post-template";
import { Sidebar } from "@/components/organisms/sidebar";
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

  if (!post) {
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
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const [relatedPosts, adjacentPosts] = await Promise.all([
    getRelatedPostsForPost(post, 4),
    getAdjacentPostsForPost(post),
  ]);

  return (
    <div className="flex flex-col gap-4 pb-20 bg-[#faf9f6] min-h-screen pt-12">
      <main className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content Area */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm overflow-hidden">
            <BlogPostTemplate
              post={post}
              relatedPosts={relatedPosts}
              adjacentPosts={adjacentPosts}
            />
          </div>

          {/* Sidebar Area */}
          <div className="w-full md:w-[320px] flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}