import Link from "next/link";
import { FolderTree } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { getCategoriesWithCount } from "@/lib/sanity.queries";

export const revalidate = 0;

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCount();

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
          Categories
        </h1>
        <p className="text-muted-foreground">
          Browse posts by category ({categories.length} total).
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-base hover:bg-secondary/80 transition-colors cursor-pointer gap-2"
            >
              <FolderTree className="w-4 h-4" />
              {category.name}
              <span className="text-xs text-muted-foreground">
                ({category.count})
              </span>
            </Badge>
          </Link>
        ))}

        {categories.length === 0 && (
          <p className="text-muted-foreground">No categories found.</p>
        )}
      </div>
    </div>
  );
}
