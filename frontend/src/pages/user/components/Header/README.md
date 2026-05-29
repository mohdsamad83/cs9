# DashboardHeader

Top navigation bar for the authenticated student dashboard.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `user` | `object` | ✅ | User object with `name` and `role` |
| `initials` | `string` | ✅ | 2-letter initials for avatar |
| `currentView` | `string` | ✅ | Current view name (`'dashboard'`, etc.) |
| `notifications` | `array` | ✅ | Array of notification objects |
| `unreadCount` | `number` | ✅ | Count of unread notifications |
| `isDark` | `boolean` | ✅ | Dark mode toggle state |
| `onSearchOpen` | `function` | ✅ | Opens the search modal |
| `onRaiseQuery` | `function` | ✅ | Navigates to raise query view |
| `onNotifOpen` | `function` | ✅ | Fetches/loads notifications |
| `onDarkToggle` | `function` | ✅ | Toggles dark mode |
| `onProfileSettings` | `function` | ✅ | Opens profile settings view |
| `onLogout` | `function` | ✅ | Triggers logout flow |

## Layout

- **Left slot** — Search trigger button (opens modal on click)
- **Center-right** — `Raise Query` button (shown only on dashboard view), bell icon with unread badge, dark mode toggle
- **Far right (10% lane)** — User avatar + name/role chip, opens user dropdown on click (Profile Settings, Logout)

## Notifications Dropdown

Triggered by bell icon. Shows:
- Unread items in `#f0f9ff` blue-tinted background
- Read items in white
- "View All" footer link
- Unread dot indicator on bell icon when `unreadCount > 0`

## User Menu Dropdown

Triggered by clicking the avatar/name area. Contains:
- **Profile Settings** — opens `ProfileSettingsView`
- **Logout** — calls `onLogout`

## Notes

- Header itself handles `showNotif` and `showUserMenu` local state
- Clicking the header background closes both dropdowns
- Avatar uses `#8c6a40` background with white initials
