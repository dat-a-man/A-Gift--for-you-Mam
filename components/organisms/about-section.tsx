"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../atoms/button";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";

import { ContactForm } from "./contact-form";

export function AboutSection() {
  return (
    <section className="py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto px-4 sm:px-6"
      >
        <Avatar className="h-24 w-24 mb-6 ring-4 ring-gray-100">
          <AvatarImage src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2000&auto=format&fit=crop" alt="Author" className="object-cover" />
          <AvatarFallback>RF</AvatarFallback>
        </Avatar>

        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-2 font-serif">
          Reflections
        </h1>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl text-gray-600 mb-8 font-serif italic">
          Exploring the modern world at 80+
        </h2>

        <div className="space-y-6 text-gray-700 md:text-lg leading-relaxed max-w-3xl">
          <p>
            So here I am, past 80 and still finding my way around. I've travelled the world, written books, worked hard, and now I am blogging about the fun and nonsense of being ancient in a modern world.
          </p>
          <p>
            You might wonder what an 80+ year old is doing on the internet. Well, my curiosity wouldn't let me stay away. I love exploring how things are changing, the magic of everyday life, and sometimes, the sheer absurdity of it all. I want to share stories about ageing well, the odd problem, and challenge some of that unthinking ageism we see every day.
          </p>
          <p>
            Welcome to my little corner of the web. I hope you enjoy these reflections!
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-4 mt-10 mb-16 border-t border-gray-200 pt-8">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8" asChild>
            <Link href="/">Read My Posts</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50 text-gray-900 font-bold px-8" asChild>
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-2xl font-bold font-serif text-gray-900 mb-6">
            Get in Touch
          </h3>
          <ContactForm />
        </div>
      </motion.div>
    </section>
  );
}