"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Category } from "@/types/blog"

interface CategoryBrowserProps {
  categories: Category[]
}

export function CategoryBrowser({ categories }: CategoryBrowserProps) {
  if (!categories || categories.length === 0) return null

  return (
    <section className="container max-w-3xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
          Browse by Category
        </h2>
      </div>

      <div className="grid gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/category/${category.slug}`} className="block group">
              <div className="relative overflow-hidden rounded-xl border border-emerald-900/10 bg-emerald-950 p-8 transition-all hover:bg-emerald-900 hover:shadow-lg dark:border-emerald-500/20">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {category.name}
                  </h3>
                  <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    View all
                  </span>
                </div>
                
                {category.description && (
                  <p className="text-emerald-200/80 text-base leading-relaxed">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
