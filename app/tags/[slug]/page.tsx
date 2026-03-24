import { getTags, getPostsByTagSlug } from "@/lib/sanity.queries";
import { BlogList } from "@/components/organisms/blog-list";
import { notFound } from "next/navigation";

export const revalidate = 0;

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map(({ slug }) => ({ slug }));
}

export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  const decodedSlug = decodeURIComponent(params.slug);
  const [tags, posts] = await Promise.all([
    getTags(),
    getPostsByTagSlug(decodedSlug),
  ]);
  const tag = tags.find((t) => t.slug === decodedSlug);

  if (!tag) {
    notFound();
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-12 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
          Posts tagged{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            #{tag.name}
          </span>
        </h1>
        <p className="text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found.
        </p>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}
