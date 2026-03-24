"use client";

import type { BlogPost } from "@/types/blog";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogBrowserProps {
  initialPosts: BlogPost[];
}

function getPostUrl(post: BlogPost) {
  return `/blog/${post.slug}`;
}

export function BlogBrowser({ initialPosts }: BlogBrowserProps) {
  return (
    <div className="w-full flex flex-col gap-12">
      {initialPosts.length > 0 ? (
        initialPosts.map((post) => (
          <article key={post.id} className="flex flex-col gap-4 pb-12 border-b border-gray-200 last:border-0">
            {post.categories && (
              <span className="text-gray-600 font-bold text-sm tracking-wide uppercase">
                {post.categories.name}
              </span>
            )}
            
            <Link href={getPostUrl(post)} className="group">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">
                {post.title}
              </h2>
            </Link>

            <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
              <time dateTime={post.published_at || post.created_at}>
                {formatDate(post.published_at || post.created_at)}
              </time>
            </div>

            {post.cover_image && (
              <Link href={getPostUrl(post)} className="overflow-hidden rounded-lg mb-4 block">
                <img 
                  src={post.cover_image} 
                  alt={post.title}
                  className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </Link>
            )}

            <div className="text-lg text-gray-700 leading-relaxed">
              <p>{post.excerpt || post.description}</p>
            </div>

            <div>
              <Link 
                href={getPostUrl(post)}
                className="inline-flex items-center mt-2 text-gray-900 font-bold hover:underline"
              >
                Continue Reading <span className="ml-1">→</span>
              </Link>
            </div>
          </article>
        ))
      ) : (
        <div className="py-20 text-center text-gray-500">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}