#!/usr/bin/env bash
# kern render-check: Extract TSX from kern design output and validate it compiles.
#
# Usage:
#   bash tools/render-check.sh <path-to-kern-output.md>
#
# The markdown file must contain a ```tsx code block (the Generated TSX section).
# Extracts it, wraps it in type shims for Shadcn/ui and React, then runs tsc --noEmit.
# Requires: node + npx (Node >= 18). tsc is downloaded via npx if not in PATH.
#
# Exit codes:
#   0 — PASS (compiles cleanly)
#   1 — FAIL (TypeScript errors found)
#   2 — SKIP (no ```tsx block found)

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <kern-output.md>" >&2
  exit 1
fi

INPUT="$1"
if [[ ! -f "$INPUT" ]]; then
  echo "Error: File not found: $INPUT" >&2
  exit 1
fi

# Extract the first ```tsx ... ``` block
TSX=$(awk '/^```tsx$/{found=1; next} found && /^```/{exit} found{print}' "$INPUT")

if [[ -z "$TSX" ]]; then
  echo "SKIP: No \`\`\`tsx block found in $INPUT" >&2
  exit 2
fi

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

# Copy the TypeScript config for render checks
cp "$SCRIPT_DIR/tsconfig.render-check.json" "$TMPDIR/tsconfig.json"

# Write shim file: minimal ambient declarations so tsc can resolve types
# without any npm install. Covers the standard Shadcn/ui surface area used by kern.
cat > "$TMPDIR/Component.tsx" <<'SHIM'
// kern render-check shim — auto-generated, do not edit

// React ambient declaration (avoids needing @types/react installed)
declare const React: {
  createElement: (...args: any[]) => any;
  FC: any;
  ReactNode: any;
  useState: <T>(init: T) => [T, (v: T) => void];
  [key: string]: any;
};

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements { [elemName: string]: any }
  interface ElementAttributesProperty { props: {} }
  interface ElementChildrenAttribute { children: {} }
}

// Shadcn/ui ambient module declarations
declare module "@/components/ui/button" {
  export const Button: any;
  export type ButtonProps = any;
}
declare module "@/components/ui/card" {
  export const Card: any;
  export const CardHeader: any;
  export const CardContent: any;
  export const CardFooter: any;
  export const CardTitle: any;
  export const CardDescription: any;
}
declare module "@/components/ui/badge" {
  export const Badge: any;
  export type BadgeProps = any;
}
declare module "@/components/ui/input" {
  export const Input: any;
}
declare module "@/components/ui/label" {
  export const Label: any;
}
declare module "@/components/ui/separator" {
  export const Separator: any;
}
declare module "@/components/ui/avatar" {
  export const Avatar: any;
  export const AvatarFallback: any;
  export const AvatarImage: any;
}
declare module "@/components/ui/table" {
  export const Table: any;
  export const TableHeader: any;
  export const TableBody: any;
  export const TableRow: any;
  export const TableHead: any;
  export const TableCell: any;
  export const TableCaption: any;
}
declare module "@/components/ui/tabs" {
  export const Tabs: any;
  export const TabsList: any;
  export const TabsTrigger: any;
  export const TabsContent: any;
}
declare module "@/components/ui/select" {
  export const Select: any;
  export const SelectTrigger: any;
  export const SelectContent: any;
  export const SelectItem: any;
  export const SelectValue: any;
}
declare module "@/components/ui/dialog" {
  export const Dialog: any;
  export const DialogTrigger: any;
  export const DialogContent: any;
  export const DialogHeader: any;
  export const DialogTitle: any;
  export const DialogDescription: any;
  export const DialogFooter: any;
}
declare module "@/components/ui/dropdown-menu" {
  export const DropdownMenu: any;
  export const DropdownMenuTrigger: any;
  export const DropdownMenuContent: any;
  export const DropdownMenuItem: any;
  export const DropdownMenuSeparator: any;
  export const DropdownMenuLabel: any;
}
declare module "@/components/ui/checkbox" {
  export const Checkbox: any;
}
declare module "@/components/ui/switch" {
  export const Switch: any;
}
declare module "@/components/ui/progress" {
  export const Progress: any;
}
declare module "@/components/ui/skeleton" {
  export const Skeleton: any;
}
declare module "@/components/ui/tooltip" {
  export const Tooltip: any;
  export const TooltipTrigger: any;
  export const TooltipContent: any;
  export const TooltipProvider: any;
}
declare module "@/lib/utils" {
  export function cn(...inputs: any[]): string;
}
// Catch-all for any other @/components/ui/* imports
declare module "@/components/ui/*" {
  const Component: any;
  export default Component;
  export const [key: string]: any;
}
SHIM

# Append the extracted TSX after the shim
echo "" >> "$TMPDIR/Component.tsx"
echo "$TSX" >> "$TMPDIR/Component.tsx"

echo "Checking TSX compilation: $(basename "$INPUT")"

cd "$TMPDIR"
if command -v tsc &>/dev/null; then
  tsc --noEmit 2>&1
  EXIT=$?
else
  npx --yes typescript tsc --noEmit 2>&1
  EXIT=$?
fi

if [[ $EXIT -eq 0 ]]; then
  echo "PASS: TSX compiles without errors"
else
  echo ""
  echo "FAIL: TypeScript errors found (exit $EXIT)"
  exit 1
fi
