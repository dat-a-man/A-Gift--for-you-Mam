import { getPostsByContentTier } from "@/lib/sanity.queries";
import Link from "next/link";
import { format } from "date-fns";
import type { BlogPost } from "@/types/blog";

export const revalidate = 0;

export default async function PathsPage() {
  const posts = await getPostsByContentTier("path");

  if (!posts || posts.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">No posts found</h1>
        <p className="text-muted-foreground mt-2">
          Check back later for new content.
        </p>
      </div>
    );
  }

  const groupedPosts: { date: string; posts: BlogPost[] }[] = [];

  posts.forEach((post) => {
    const date = new Date(post.published_at || post.created_at);
    const key = format(date, "MMMM yyyy");

    let group = groupedPosts.find((g) => g.date === key);
    if (!group) {
      group = { date: key, posts: [] };
      groupedPosts.push(group);
    }
    group.posts.push(post);
  });

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
          The Path
        </h1>
        <p className="text-muted-foreground">The path of data engineering.</p>
      </div>

      <div className="space-y-12">
        {groupedPosts.map((group) => (
          <section key={group.date} className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-gray-100 dark:border-gray-800 pb-2 text-emerald-900 dark:text-emerald-100">
              {group.date}
            </h2>
            <div className="grid gap-6">
              {group.posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group space-y-3 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50 p-6 rounded-md border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground/60">
                    <time dateTime={post.published_at || post.created_at}>
                      {format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
                    </time>
                    {post.reading_time && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{post.reading_time} min read</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
