"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-8">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container max-w-5xl mx-auto px-6 sm:px-8 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
          Reflections
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Exploring the modern world, sharing stories, and finding magic in the everyday.
        </p>
      </motion.div>
    </section>
  );
}