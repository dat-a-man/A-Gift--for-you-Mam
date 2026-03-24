"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../atoms/dropdown-menu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/contact", label: "Contact" },
  { href: "/press", label: "Press & Features" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#faf9f6]">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 max-w-4xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-gray-900 font-serif tracking-tight">
          Reflections
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-base" aria-label="Main navigation">
          {navItems.map((item, i) => (
            <span key={item.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-400">•</span>}
              <Link
                href={item.href}
                className="text-gray-700 hover:text-gray-900 hover:underline transition-colors"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Open navigation menu">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
