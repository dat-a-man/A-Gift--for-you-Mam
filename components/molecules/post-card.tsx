import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { getPostUrl } from "@/lib/post-url";
import { Card, CardContent, CardHeader } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={getPostUrl(post)} className="block group h-full">
      <Card className="flex h-full flex-col overflow-hidden border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors rounded-md shadow-sm">
        <CardHeader className="p-0">
          {post.cover_image && (
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={post.cover_image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {post.categories && (
              <Badge variant="secondary" className="text-[10px] uppercase bg-gray-100 text-gray-700">
                {post.categories.name}
              </Badge>
            )}
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] uppercase"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mb-2 flex items-center space-x-2 text-xs text-gray-500">
            <span>{formatDate(post.published_at || post.created_at)}</span>
            {post.reading_time && (
              <>
                <span>•</span>
                <span>{post.reading_time} min read</span>
              </>
            )}
          </div>
          <h3 className="mb-2 text-lg font-semibold leading-tight tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {post.description || post.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
