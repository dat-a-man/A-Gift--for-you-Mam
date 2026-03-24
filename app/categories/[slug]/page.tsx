import { notFound } from "next/navigation";
import { BlogBrowser } from "@/components/organisms/blog-browser";
import { Sidebar } from "@/components/organisms/sidebar";
import {
  getCategories,
  getCategorySlugs,
  getPostsByCategorySlug,
} from "@/lib/sanity.queries";

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const decodedSlug = decodeURIComponent(params.slug);
  const [categories, posts] = await Promise.all([
    getCategories(),
    getPostsByCategorySlug(decodedSlug),
  ]);

  const category = categories.find((item) => item.slug === decodedSlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 pb-20 bg-[#faf9f6] min-h-screen pt-12">
      <main className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Feed */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-8 border-b border-gray-200 pb-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">
                Category:{" "}
                <span className="text-gray-600">
                  {category.name}
                </span>
              </h1>
              <p className="text-gray-600 mt-2">
                {posts.length} {posts.length === 1 ? "post" : "posts"} found.
              </p>
            </div>

            <BlogBrowser initialPosts={posts} />
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[320px] flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}