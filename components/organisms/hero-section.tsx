"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] overflow-hidden">
          <Image
            src="/images/reflections-cover-daffodils-living.png"
            alt="Reflections cover"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}