import { HeroSection } from "@/components/organisms/hero-section";
import { Sidebar } from "@/components/organisms/sidebar";
import { getPosts } from "@/lib/sanity.queries";
import { BlogBrowser } from "@/components/organisms/blog-browser";

export const revalidate = 0;

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-4 pb-20 bg-[#faf9f6] min-h-screen">
      <HeroSection />

      {/* Main Content Area */}
      <main className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Feed */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
              Latest Posts
            </h2>
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