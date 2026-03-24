"use client";

import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { Quote } from "lucide-react";
import type { PortableTextBlock } from "@/types/blog";

interface PortableTextProps {
  value: PortableTextBlock[] | null | undefined;
}

export function PortableText({ value }: PortableTextProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const codeTheme = isDark ? vscDarkPlus : oneLight;

  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="mb-4 mt-8 text-4xl font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-3 mt-6 text-3xl font-bold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-2 mt-4 text-2xl font-semibold">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-emerald-600 dark:border-emerald-500 bg-gray-50 dark:bg-gray-900/50 p-6 italic rounded-r-md">
          <div className="flex gap-4">
            <Quote className="h-8 w-8 -scale-x-100 text-emerald-500/50 flex-shrink-0" />
            <div className="text-lg text-muted-foreground">{children}</div>
          </div>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="my-2">{children}</li>,
      number: ({ children }) => <li className="my-2">{children}</li>,
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 underline underline-offset-4 hover:text-emerald-700 dark:hover:text-emerald-300"
        >
          {children}
        </a>
      ),
      code: ({ children }) => (
        <code className="rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-1.5 py-0.5 text-sm font-mono">
          {children}
        </code>
      ),
    },
    types: {
      code: ({ value }) => {
        const language = value?.language || "text";
        const code = value?.code || "";
        const filename = value?.filename;

        return (
          <div className="my-6 overflow-hidden rounded-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-4 py-2 text-xs">
              <span className="font-mono text-muted-foreground">
                {filename || language}
              </span>
              {filename && (
                <span className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-1 font-mono text-muted-foreground">
                  {language}
                </span>
              )}
            </div>

            <div className="overflow-x-auto">
              <SyntaxHighlighter
                style={codeTheme}
                language={language}
                PreTag="div"
                useInlineStyles={true}
                codeTagProps={{ className: "syntax-block" }}
                className="!m-0 !border-0 !bg-transparent !p-4 text-sm leading-relaxed"
                customStyle={{ margin: 0, background: "transparent" }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      },
      image: ({ value }) => {
        if (!value?.asset) return null;
        const builder = imageUrlBuilder(client);
        const src = builder.image(value).url();
        return (
          <img
            src={src}
            alt={value?.alt || ""}
            className="my-6 rounded-lg border shadow-sm"
            loading="lazy"
          />
        );
      },
    },
  };

  if (!value || value.length === 0) return null;

  return (
    <div className="max-w-none">
      <BasePortableText value={value} components={components} />
    </div>
  );
}
