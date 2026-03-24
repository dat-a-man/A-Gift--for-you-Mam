"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Tag,
  Quote,
} from "lucide-react";
import type { BlogPost } from "@/types/blog";
import type { AdjacentPostRef } from "@/lib/sanity.queries";
import { getPostUrl } from "@/lib/post-url";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { Separator } from "../atoms/separator";
import { cn, formatDate } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { PortableText } from "../molecules/portable-text";
import { PostCard } from "../molecules/post-card";

interface BlogPostTemplateProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
  adjacentPosts?: {
    prev: AdjacentPostRef | null;
    next: AdjacentPostRef | null;
  };
}

export function BlogPostTemplate({
  post,
  relatedPosts = [],
  adjacentPosts,
}: BlogPostTemplateProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const codeTheme = isDark ? vscDarkPlus : oneLight;

  return (
    <div className="py-2 md:py-4">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button variant="ghost" size="sm" asChild className="mb-6 pl-0">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </motion.div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {post.categories && (
            <Link href={`/categories/${post.categories.slug}`}>
              <Badge variant="default" className="gap-1 text-sm cursor-pointer">
                <Tag className="h-3 w-3" />
                {post.categories.name}
              </Badge>
            </Link>
          )}
          {post.tags && post.tags.length > 0 && (
            <>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Badge variant="secondary" className="gap-1 cursor-pointer">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(post.published_at || post.created_at)}
            </time>
          </div>
          {post.reading_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.reading_time} min read</span>
            </div>
          )}
        </div>

        <Separator className="mb-8" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="blog-content max-w-none"
      >
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="mb-4 mt-8 text-4xl font-bold" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="mb-3 mt-6 text-3xl font-bold" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="mb-2 mt-4 text-2xl font-semibold" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-gray-900 underline underline-offset-4 hover:text-gray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="my-6 overflow-hidden rounded-xl border border-border/70 bg-muted/30">
                    <div className="flex items-center justify-between border-b border-border/70 px-3 py-2 text-xs">
                      <span className="font-medium text-muted-foreground">
                        Code
                      </span>
                      <span className="rounded bg-background/80 px-2 py-1 font-mono text-muted-foreground">
                        {match[1]}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <SyntaxHighlighter
                        {...props}
                        style={codeTheme}
                        language={match[1]}
                        PreTag="div"
                        useInlineStyles={true}
                        codeTagProps={{ className: "syntax-block" }}
                        className="!m-0 !border-0 !bg-transparent !p-4 text-sm leading-relaxed"
                        customStyle={{ margin: 0, background: "transparent" }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                ) : (
                  <code
                    className="rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-1.5 py-0.5 text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              blockquote: ({ node, children, ...props }) => (
                <blockquote
                  className="my-8 border-l-4 border-gray-400 bg-gray-50 p-6 italic rounded-r-md"
                  {...props}
                >
                  <div className="flex gap-4">
                    <Quote className="h-8 w-8 -scale-x-100 text-gray-400 flex-shrink-0" />
                    <div className="text-lg text-gray-700">
                      {children}
                    </div>
                  </div>
                </blockquote>
              ),
              ul: ({ node, ...props }) => (
                <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img
                  className="my-6 rounded-lg border shadow-sm"
                  loading="lazy"
                  {...props}
                />
              ),
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        )}
      </motion.div>

      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Related Reads
            </h2>
            <p className="mt-2 text-gray-600">
              Continue exploring similar topics.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* Previous / Next post (by publish date: older = Previous, newer = Next) */}
      {adjacentPosts &&
        (adjacentPosts.prev || adjacentPosts.next) && (
          <nav
            className={cn(
              "mt-12 flex flex-col gap-4 sm:flex-row sm:items-stretch",
              adjacentPosts.prev && adjacentPosts.next && "sm:justify-between",
              adjacentPosts.prev && !adjacentPosts.next && "sm:justify-start",
              !adjacentPosts.prev && adjacentPosts.next && "sm:justify-end",
            )}
            aria-label="Adjacent posts"
          >
            {adjacentPosts.prev ? (
              <Link
                href={getPostUrl(adjacentPosts.prev)}
                className="group flex max-w-full flex-col rounded-md border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 hover:bg-gray-50 sm:max-w-[min(100%,28rem)]"
              >
                <span className="mb-1 flex items-center text-xs font-medium uppercase tracking-wide text-gray-500">
                  <ChevronLeft className="mr-1 h-3.5 w-3.5" />
                  Previous
                </span>
                <span className="line-clamp-2 font-sans text-sm font-semibold text-gray-900 group-hover:text-gray-600">
                  {adjacentPosts.prev.title}
                </span>
              </Link>
            ) : null}
            {adjacentPosts.next ? (
              <Link
                href={getPostUrl(adjacentPosts.next)}
                className="group flex max-w-full flex-col rounded-md border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300 hover:bg-gray-50 sm:max-w-[min(100%,28rem)] sm:text-right"
              >
                <span className="mb-1 flex items-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:justify-end">
                  Next
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </span>
                <span className="line-clamp-2 font-sans text-sm font-semibold text-gray-900 group-hover:text-gray-600">
                  {adjacentPosts.next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        )}

      {/* Footer Separator */}
      <Separator className="my-12" />

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
      >
        <Button variant="outline" size="lg" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Posts
          </Link>
        </Button>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Tags:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Badge variant="outline" className="cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
