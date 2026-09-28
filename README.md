# www.acyhuang v3

A minimalist linked-note site built with Astro, Markdown/MDX, and Tailwind CSS.

## Develop

```sh
npm install
npm run dev
```

## Add a note

Create a Markdown file in `src/content/notes`:

```md
---
title: My note
description: Optional summary
---

# My note

Write here and link to [another note](/notes/another-note).
```

The filename becomes the note URL. For example, `another-note.md` is linked as `/notes/another-note`.

Use `.mdx` when a note needs to import a custom component. Put reusable components in `src/components`.

Internal note links open a new panel. The path is saved in the URL so refresh, sharing, and browser navigation preserve it. On mobile, the newest panel fills the screen and exposes a Back button.
