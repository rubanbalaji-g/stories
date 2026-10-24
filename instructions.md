# Book Ingestion & Formatting Instructions

> **Audience**: AI Agents & Automated Ingestion Scripts  
> **Purpose**: Standard operating procedure for converting public-domain literature into the format consumed by the Surrealist Web Reader.

---

## 1. Directory Structure Standard

When books are added to the reader, they must adhere to this directory hierarchy inside `/public/books/`:

```
public/books/
├── catalog.json                  <-- Master manifest index of all available books
└── {book-slug}/                  <-- Unique slug (e.g., 'the-invisible-man')
    ├── book.json                 <-- Book metadata & table of contents
    ├── cover.svg / cover.webp    <-- Surrealist cover art (optional)
    ├── en/                       <-- English Markdown chapters
    │   ├── 01_chapter_I.md
    │   └── ...
    └── ta/                       <-- Tamil Markdown chapters
        ├── 01_chapter_I.md
        └── ...
```

---

## 2. Master Catalog Manifest (`catalog.json`)

```json
{
  "$schema": "../books.schema.json",
  "books": [
    {
      "id": "the-invisible-man",
      "slug": "the-invisible-man",
      "title": {
        "en": "The Invisible Man",
        "ta": "உருவமற்ற மனிதன்"
      },
      "author": "H. G. Wells",
      "year": 1897,
      "license": "Public Domain",
      "genre": ["Science Fiction", "Classics", "Romance"],
      "totalChapters": 28,
      "coverStyle": "surreal-portal",
      "hasTamilTranslation": true
    }
  ]
}
```

---

## 3. Individual Book Manifest (`book.json`)

Each book folder must include a `book.json` specifying the chapter structure:

```json
{
  "id": "the-invisible-man",
  "title": {
    "en": "The Invisible Man",
    "ta": "உருவமற்ற மனிதன்"
  },
  "author": "H. G. Wells",
  "year": 1897,
  "chapters": [
    {
      "id": "ch-01",
      "index": 1,
      "title": {
        "en": "Chapter I: The Strange Man's Arrival",
        "ta": "அத்தியாயம் 1: விசித்திர மனிதனின் வருகை"
      },
      "file": {
        "en": "en/01_Chapter_I.md",
        "ta": "ta/01_Chapter_I.md"
      }
    }
  ]
}
```

---

## 4. Markdown Formatting Rules for AI Agents

1. **Clean Semantic Markdown**:
   - Begin each chapter with a level-1 heading `# {Chapter Number & Title}`.
   - Do **NOT** include redundant metadata blocks, author tags, or HTML `<br>` tags inside chapter bodies.
   - Separate paragraphs with a single blank line (`\n\n`).
2. **Tamil Literary Quality Standard**:
   - Translations must be in **Contemporary Literary Tamil** (நவீன செவ்விலக்கிய உரைநடை).
   - Reject literal word-for-word machine translation.
   - Retain poetic English idioms translated conceptually into natural Tamil expressions.
3. **Typography Hygiene**:
   - Use standard typographical quotes and em-dashes.
   - Preserve dialogue indentation and blockquotes (`>`) for letters, journal entries, and newspaper clippings.
