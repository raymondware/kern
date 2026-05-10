---
date: 2026-04-16
ai_tool: Lovable, Bolt.new, v0, Cursor (all generate only the success/loaded state)
sources:
  - platform: reddit
    context: r/webdev, r/reactjs -- multiple threads on vibe-coding quality
    quote: "AI generates the perfect happy path every time. No loading state, no empty state, no error state. Ship it and users see blank screens when the API is slow. Every. Single. Time."
  - platform: hn
    context: HN threads on vibe-coded app quality, AI development tools
    quote: "The implementation tends to be shallow, missing states and edge cases. Load state, error state, empty state -- none of these are in the first AI pass. The AI optimizes for the demo screenshot, not the shipped product."
additional_sources: 4
---

# Happy Path Only: Missing Loading, Error, and Empty States

**Pattern**: AI generates only the ideal, data-filled, fully-loaded state of every screen. The dashboard has real numbers. The list has real items. The form submits successfully. Missing entirely: loading skeletons or spinners during data fetch, empty states when lists have no items, error messages when APIs fail, validation feedback on form fields, 404 pages, offline states. The component renders directly from the data without any conditional state handling.

**Why it fails** (from community): One developer who shipped a vibe-coded app described the exact failure: "AI forgets that APIs take time, causing users to see blank screens or broken UI." The AI optimizes for the success state because that's what appears in training data (documentation screenshots, UI library demos, Dribbble shots -- all show the populated, loaded, happy state). Real product usage hits every other state constantly. Empty states in particular "leave a significant impression" -- a well-designed empty state guides the user to first value; a blank div signals abandonment.

Community language: "blank screen syndrome," "vibe-coded only the demo," "happy path trap."

**Fix**: After any AI-generated component, explicitly add all required states before shipping. The minimum set for any data-fetching component: loading skeleton (not a spinner), empty state with a next action, error state with a retry. This is the difference between a prototype and a product.

```tsx
// Not this -- happy path only
function UserList({ userId }: { userId: string }) {
  const data = useUsers(userId);
  return (
    <ul>
      {data.users.map(u => <UserCard key={u.id} user={u} />)}
    </ul>
  );
}

// This -- all states handled
function UserList({ userId }: { userId: string }) {
  const { data, isLoading, error, refetch } = useUsers(userId);

  if (isLoading) return <UserListSkeleton />;

  if (error) return (
    <div className="text-center py-12">
      <p className="text-sm text-zinc-500 mb-3">Couldn't load team members.</p>
      <button onClick={refetch} className="text-sm text-zinc-400 underline">Try again</button>
    </div>
  );

  if (!data.users.length) return (
    <div className="text-center py-12">
      <p className="text-sm text-zinc-500 mb-3">No team members yet.</p>
      <Button size="sm">Invite someone</Button>
    </div>
  );

  return (
    <ul>
      {data.users.map(u => <UserCard key={u.id} user={u} />)}
    </ul>
  );
}
```

## Sources

- atarim.io: "10 Most Common Vibe Coding Mistakes" -- no loading/error states as top mistake
- uxplanet.org: "AI-generated UI: The implementation tends to be shallow, missing states and edge cases"
- raw.studio: "Empty States, Error States, Onboarding: The Hidden UX Moments Users Notice"
- Reddit r/webdev: "Every vibe-coded app ships without error states" (2025, 150+ upvotes)
- HN: Multiple threads where reviewers of "Show HN" vibe-coded apps note missing state handling
- dev.to: "Your Vibe-Coded App Looks Ugly" -- blank screens on data fetch named explicitly
