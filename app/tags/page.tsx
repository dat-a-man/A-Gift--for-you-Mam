import { getTags } from "@/lib/sanity.queries";
import Link from "next/link";
import { Badge } from "@/components/atoms/badge";
import { Tag } from "lucide-react";

export const revalidate = 0;

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
          Tags
        </h1>
        <p className="text-muted-foreground">
          Browse posts by topic ({tags.length} total).
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Link key={tag.slug} href={`/tags/${tag.slug}`}>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-base hover:bg-secondary/80 transition-colors cursor-pointer gap-2"
            >
              <Tag className="w-4 h-4" />
              {tag.name}
              <span className="text-xs text-muted-foreground">
                ({tag.count})
              </span>
            </Badge>
          </Link>
        ))}
        {tags.length === 0 && (
          <p className="text-muted-foreground">No tags found.</p>
        )}
      </div>
    </div>
  );
}
