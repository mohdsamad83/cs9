# LeftPane

Sidebar navigation panel for the student dashboard. Fixed-width (`w-[240px]`) left sidebar with brand logo, section label, and nav items.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sidebarNav` | `string` | ✅ | Current sidebar nav label (matches `NAV_ITEMS` keys) |
| `currentView` | `string` | ✅ | Active view name — `'dashboard'` activates nav |
| `onNavigate` | `function` | ✅ | Callback with nav label to switch views |

## Nav Items

| Label | Icon | Behaviour |
|-------|------|-----------|
| `Dashboard` | `LayoutGrid` | Sets sidebar nav + switches to dashboard |
| `My Queries` | `MessageSquare` | Sets sidebar nav (view switch handled by parent) |

## Active State Styling

Active nav item (both `sidebarNav` matches AND `currentView === 'dashboard'`):
- `border-r-2 border-[#8c6a40]`
- `bg-[#8c6a40]/10`
- `font-semibold text-[#8c6a40]`

Hover state (inactive):
- `hover:bg-[#8c6a40]/10 hover:text-[#8c6a40]`

Inactive default: `text-[#444748]`

## Visual Elements

- Vertical connector line between nav items (dotted `bg-[#d9dadb]`)
- Brand section at top: "Rogāre" in `#8c6a40` bold + "Internship Hub" subtitle
- Section label: "Navigation" with sub-label "Student portal"
- Background: `#f8f9fa` (light gray, distinct from content area)

## Notes

- Clicking the brand logo navigates to `'Dashboard'`
- Width is fixed at `240px` — not responsive (md+ screens only)
- The vertical connector line uses `absolute` positioning from the nav container
