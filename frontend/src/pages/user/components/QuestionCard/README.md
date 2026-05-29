# QuestionCard

Reusable question/query card component for the student dashboard.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `object` | ✅ | Normalized question object from `normalizeQuestion()` |
| `onUpvote` | `function` | ✅ | Callback receiving `questionId` on upvote click |

## `query` Shape

```ts
{
  id:         string        // question_id
  upvotes:    number
  hasUpvoted: boolean
  tags:       Array<{ label: string }>
  meta:       string        // e.g. "2h ago • Category Name"
  title:      string
  desc:       string        // body text
  comments:   number        // answer count
  status:     'Active' | 'In Progress' | 'Resolved'
}
```

## Visual Structure

- **Upvote button** (left) — tall vertical pill with chevron icon and count; background turns `#8c6a40` when upvoted, `#d1d5db` when not
- **Content** (right):
  - **Tags** — black (`bg-black text-white`) rounded pills
  - **Meta** — timestamp/category on top right
  - **Title** — 18px semibold
  - **Description** — 13px, gray
  - **Footer** — comment count (navigates to detail) + status badge with color from `STATUS_CONFIG`

## Usage

```jsx
import QuestionCard from '../../components/QuestionCard/QuestionCard'

{filtered.map(query => (
  <QuestionCard key={query.id} query={query} onUpvote={handleUpvote} />
))}
```
