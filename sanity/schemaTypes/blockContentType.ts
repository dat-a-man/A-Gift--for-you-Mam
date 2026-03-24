import { defineArrayMember, defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "code",
      title: "Code",
      fields: [
        {
          name: "language",
          type: "string",
          title: "Language",
          initialValue: "python",
          options: {
            list: [
              { title: "Python", value: "python" },
              { title: "Shell / Bash", value: "bash" },
              { title: "SQL", value: "sql" },
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "YAML", value: "yaml" },
              { title: "JSON", value: "json" },
              { title: "Dockerfile", value: "dockerfile" },
              { title: "Go", value: "go" },
              { title: "Rust", value: "rust" },
              { title: "Java", value: "java" },
              { title: "Scala", value: "scala" },
              { title: "Plain Text", value: "text" },
            ],
          },
        },
        {
          name: "code",
          type: "text",
          title: "Code",
          rows: 10,
        },
        {
          name: "filename",
          type: "string",
          title: "Filename (optional)",
          description: "e.g., main.py, script.sh",
        },
      ],
    }),
  ],
});
