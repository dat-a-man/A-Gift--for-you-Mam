# Expected Sanity Schema for Blog Posts

Your Sanity Studio needs a `post` document type. Here's a schema that matches the GROQ queries in `lib/sanity.queries.ts`:

## Post Document

```javascript
// schemas/post.js
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() },
    { name: 'description', type: 'text' },
    { name: 'excerpt', type: 'text' },
    { name: 'mainImage', type: 'image' },
    { name: 'body', type: 'blockContent' },
    { name: 'authorName', type: 'string' },
    { name: 'authorImage', type: 'image' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'readingTime', type: 'number', description: 'Estimated reading time in minutes' },
  ],
}
```

## Category Document (optional)

```javascript
// schemas/category.js
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
  ],
}
```

## Block Content (for body)

```javascript
// schemas/blockContent.js
export default {
  name: 'blockContent',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'image' },
    {
      type: 'code',
      fields: [
        { name: 'language', type: 'string' },
        { name: 'code', type: 'text' },
      ],
    },
  ],
}
```

If your field names differ (e.g. `coverImage` instead of `mainImage`), update the GROQ queries in `lib/sanity.queries.ts` to match.
