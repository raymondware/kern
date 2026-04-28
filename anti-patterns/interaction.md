# Interaction Anti-Patterns

Patterns that erode trust, confuse users, or waste time. Ordered roughly by severity.

---

## Dishonest CTAs

**What it is**: The button label says one thing and the action does something different or more expansive.

Examples:
- "Learn more" navigates to a pricing page
- "Get started" requires a credit card before the user starts anything
- "Try for free" has "for 14 days" visible only in footnote size
- "Continue" submits a form with non-obvious side effects
- "Save" saves AND publishes
- "Update" updates AND triggers a background job the user didn't expect

**Why it fails**: CTAs are a contract. When the action doesn't match the label, the user's trust breaks. They start reading everything skeptically. This has downstream effects on conversion and retention.

**Fix**: Label the action precisely. If "Save" publishes, the button should say "Save and publish." If there's a side effect, surface it in the button or immediately adjacent copy. Destructive or non-reversible actions need explicit framing.

```tsx
// Misleading
<Button>Get started</Button>  // actually: "Start your free trial -- credit card required"

// Honest
<Button>Start free trial</Button>
<p className="text-xs text-muted-foreground mt-1">No credit card required</p>
```

---

## Loading as Marketing

**What it is**: Loading states that display product copy, slogans, or feature highlights while the user waits.

Examples:
- "Did you know? Our AI processes 10x faster than competitors" during a 3-second load
- Animated tip carousels that play while the page loads
- "While you wait, check out our new [Feature]" messaging

**Why it fails**: The user is waiting because something is slow. They know something is slow. Filling that time with marketing does not make them feel better -- it reminds them they're waiting AND it's transparent. It communicates that you know the load time is bad enough to require distraction. The companies with genuinely fast products don't do this.

**Fix**: Minimize load time. If loading is unavoidable, use a spinner or skeleton that accurately reflects the content structure being loaded. Progress indicators are acceptable if they're real (not fake progress bars). Don't put copy in loading states unless it's relevant to what's loading.

---

## Motivational Copy in Empty States

**What it is**: Empty states that use encouraging, sales-y, or inspiring language instead of showing sample data or a clear action.

Examples:
- "Your canvas awaits! Start creating your first masterpiece."
- "No projects yet! Great things start with a single step."
- "It's quiet here... for now. Build something amazing."
- Illustrations of a person looking up at a horizon

**Why it fails**: Motivational empty states tell the user what they don't have instead of showing them what they could have. They're also condescending -- the user knows the space is empty, they're using the product for the first time. The job of an empty state is to demonstrate value and lower the barrier to the first action, not to cheerlead.

**Fix**: Show sample data by default if the product supports it. This is what Linear, Notion, and most well-designed tools do -- the first time you open them, there's already something there. If sample data isn't appropriate, the empty state should be: a description of what appears here + one clear CTA.

```tsx
// Motivational -- remove this
<EmptyState>
  <Illustration />
  <h3>No projects yet!</h3>
  <p>Great things start with a single step. Create your first project today.</p>
</EmptyState>

// Functional -- use this
<EmptyState>
  <h3>No projects</h3>
  <p>Projects track your work and team activity.</p>
  <Button>Create project</Button>
</EmptyState>
```

---

## Bouncy Interactions

**What it is**: Spring animations, overshoot effects, elastic easing, and physics simulations applied to UI transitions.

Examples:
- A modal that bounces when it opens
- A sidebar that overshoots its final position and springs back
- Buttons that "pop" when clicked
- Cards that scale up and down with elastic easing

**Why it fails**: Bounce animations draw attention to themselves rather than to the content they're animating. They read as playful, which is a specific register that doesn't fit most products. They also make the UI feel laggy at lower frame rates and on non-retina displays. After the first week of using a product, users want efficiency -- bounce animations work against that.

**Fix**: Linear or ease-out easing for most transitions. Duration under 200ms for small elements, under 300ms for page-level transitions. No overshoot. If you're using Framer Motion, `ease: "easeOut"` and `duration: 0.15` covers most cases.

```tsx
// Not this
<motion.div
  initial={{ scale: 0.5 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", bounce: 0.5 }}
>

// This
<motion.div
  initial={{ opacity: 0, y: 4 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.15, ease: "easeOut" }}
>
```

---

## Modal Fatigue

**What it is**: Using modals for things that don't require modals. Signs: there are multiple modals in your app that appear in sequence, or modals appear for informational content that could be inline or in a sheet.

Examples:
- A "confirm your settings" modal that appears after a settings save dialog
- A modal to show a form that has fewer than 3 fields
- Onboarding modals that must be dismissed before using the app
- A modal to confirm reading a notification

**Why it fails**: Modals block everything. They are an interrupt. Most things in an app are not worth interrupting the user for. When modals appear too frequently, users start closing them immediately without reading them -- which defeats the purpose.

**Fix**: Inline editing for small forms. Sheets/drawers for contextual content that needs to stay visible while the user works. Modals only for: destructive confirmations, critical interrupts, and flows that genuinely require focus. In Shadcn: prefer `Sheet` over `Dialog` for forms, and `Popover` or `DropdownMenu` for short inline interactions.

---

## Toast Spam

**What it is**: Toasting every action the user takes, including non-destructive, non-notable, and trivially reversible actions.

Examples:
- "Saved!" toast after every keystroke (or after every autosave)
- Toast after every checkbox tick
- "Profile updated!" toast when the user changes their name
- Multiple toasts stacked on screen simultaneously

**Why it fails**: Toasts are designed to communicate meaningful system feedback. When used for confirmations that are obvious (the form submitted, the user can see the result), they become visual noise. When multiple toasts stack, users learn to ignore them. This is the toast equivalent of the car alarm nobody responds to.

**Fix**: Toast only when: the action happened out of the user's direct view (background job, async operation), the result is non-obvious from the UI state change, or something failed. Use inline state changes for synchronous actions the user can see. For autosave: a small "Saved" indicator near the save area is better than a toast.

---

## Dark Patterns

**What it is**: Design choices that benefit the product at the user's expense. Not an exhaustive list -- just the ones that appear most in dev-built products.

**Roach motel**: Easy to sign up, hard to cancel. Cancel buried in account settings, requiring multiple confirmation steps, with a "we're sad to see you go" interstitial.

**Fix**: The cancel flow should be as direct as the signup flow.

**Confirm-shaming**: Opt-out button labeled to make the user feel bad for opting out.

Examples:
- "No thanks, I don't want to save money" (decline button)
- "No, I'll figure it out myself" (decline button for onboarding)

**Fix**: Label decline buttons neutrally. "No thanks" or "Skip" is fine.

**Hidden costs**: Free plan limitations that only appear when the user hits them, not before.

**Fix**: Surface plan limits before the user creates content they'll need to delete. Show limits in the settings and wherever the limited feature is accessed.

**Forced account**: Requiring account creation before the user can evaluate the product.

**Fix**: Let the user try before they sign up whenever technically feasible.

---

## Unnecessary Confirmations

**What it is**: Confirmation dialogs for actions that are trivially reversible or not destructive.

Examples:
- "Are you sure you want to log out?" (just log out)
- "Confirm: you're about to mark this notification as read."
- "This will close the dialog. Continue?" (that is what the X button does)
- Confirmation for adding a tag, favoriting an item, or switching a toggle

**Why it fails**: Every confirmation dialog costs the user a click and a second of attention. For non-destructive actions, this cost provides no value. After a few unnecessary confirmations, users start clicking "confirm" on everything automatically -- including the confirmations that matter.

**Fix**: Only confirm actions that: delete data permanently, affect other users, cost money, or cannot be undone without support intervention. For everything else, just do the action and offer an undo if needed. An undo toast ("Item deleted. Undo.") is better than a confirmation dialog for most soft deletes.

```tsx
// Unnecessary confirmation -- remove
<AlertDialog>
  <AlertDialogContent>
    <AlertDialogTitle>Log out?</AlertDialogTitle>
    <AlertDialogDescription>You will need to log in again.</AlertDialogDescription>
    <AlertDialogAction>Log out</AlertDialogAction>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
  </AlertDialog>
</AlertDialog>

// Destructive confirmation -- keep
<AlertDialog>
  <AlertDialogContent>
    <AlertDialogTitle>Delete project "{project.name}"?</AlertDialogTitle>
    <AlertDialogDescription>
      This deletes all tasks, comments, and history. There is no recovery.
    </AlertDialogDescription>
    <AlertDialogAction className="bg-destructive">Delete project</AlertDialogAction>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
  </AlertDialog>
</AlertDialog>
```
