"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/types/blog";
import Link from "next/link";
import { Badge } from "@/components/atoms/badge";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  // Take only the 5 most recent posts
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-border/50 bg-card/50 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
        <h2 className="text-xl font-bold text-emerald-500">Most Recent</h2>
      </div>

      <ul className="space-y-4">
        {recentPosts.map((post, index) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group flex items-start"
          >
            <span className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50 group-hover:bg-emerald-500 transition-colors" />
            <Link 
              href={`/blog/${post.slug}`}
              className="text-lg text-muted-foreground hover:text-emerald-500 transition-colors line-clamp-1"
            >
              {post.title}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
