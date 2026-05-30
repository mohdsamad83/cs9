import { useState, useRef, useEffect } from 'react'
import {
  Popover, PopoverButton, PopoverPanel,
  Menu, MenuButton, MenuItems, MenuItem,
} from '@headlessui/react'
import {
  Settings, Search, SlidersHorizontal, PlusCircle, Bell, LogOut,
  Moon, Sun, X,
} from 'lucide-react'

/**
 * User dashboard header.
 *
 * Props:
 *  - searchQuery       — current search value (controlled)
 *  - onSearchChange    — called on every keystroke
 *  - notifications     — array of notification items
 *  - unreadCount       — number of unread notifications
 *  - isDark            — current dark mode state
 *  - toggleDark        — fn, toggles dark mode via useThemeStore
 *  - selectedTags      — string[], currently selected filter tags from header
 *  - onTagsChange      — fn, called with new string[] when tags are toggled
 *  - onNotifViewAll    — fn, called when "View All" is clicked
 *  - user              — { name, role }
 *  - initials          — string, two-letter initials
 *  - onLanding         — fn, navigate to public FAQ page
 *  - onLogout          — fn, log out user
 *  - onProfileSettings — fn, open profile settings
 */

const ALL_TAGS = ['DSA', 'Web Dev', 'CP', 'AI/ML', 'Systems', 'OS', 'DBMS', 'OOP', 'Aptitude', 'Interview Exp']

function DashboardHeader({
  searchQuery = '',
  onSearchChange,
  notifications = [],
  unreadCount = 0,
  isDark,
  toggleDark,
  selectedTags = [],
  onTagsChange,
  onNotifViewAll,
  user,
  initials,
  onLanding,
  onLogout,
  onProfileSettings,
}) {
  const [searchInput, setSearchInput] = useState(searchQuery)
  const searchTimeout = useRef(null)

  // Sync external changes (e.g. clear from parent)
  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  function handleSearchChange(e) {
    const val = e.target.value
    setSearchInput(val)
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      onSearchChange?.(val)
    }, 300)
  }

  function handleSearchClear() {
    setSearchInput('')
    onSearchChange?.('')
  }

  function toggleTag(tag) {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    onTagsChange?.(next)
  }

  const tagCount = selectedTags.length

  return (
    <header className="sticky top-0 z-40 border-b border-[#dde1e3] bg-white px-4 py-2.5 shadow-sm">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3">

        {/* Logo / brand */}
        <div className="flex shrink-0 cursor-pointer items-center gap-2" onClick={onLanding}>
          <img src="/logo.svg" alt="QueryHub" className="h-8 w-8" />
          <span className="text-[15px] font-bold text-[#111827]">QueryHub</span>
        </div>

        {/* Search bar — inline, live */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-[480px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              size={15}
              strokeWidth={2}
            />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search queries…"
              className="w-full rounded-lg border border-[#dde1e3] bg-[#f8f9fa] py-2 pl-9 pr-8 text-[13px] text-[#191c1d] placeholder-[#9ca3af] transition focus:border-[#8c6a40] focus:outline-none focus:ring-1 focus:ring-[#8c6a40]"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#444748]"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Tag filter — small popover */}
          <Popover>
            <PopoverButton as="div" className="relative cursor-pointer">
              <div className="flex h-[38px] items-center gap-1.5 rounded-lg border border-[#dde1e3] bg-white px-3 text-[13px] text-[#444748] transition hover:border-[#8c6a40] hover:text-[#8c6a40]">
                <SlidersHorizontal size={14} strokeWidth={2} />
                <span className="hidden sm:inline">Filter</span>
                {tagCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8c6a40] text-[10px] font-bold text-white">
                    {tagCount}
                  </span>
                )}
              </div>

              <PopoverPanel
                className="absolute right-0 top-10 z-50 w-64 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-xl focus:outline-none"
              >
                <p className="border-b border-[#f3f4f6] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#9ca3af]">
                  Filter by tag
                </p>
                <div className="flex flex-wrap gap-1.5 p-3">
                  {ALL_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-2.5 py-1 text-[12px] font-medium transition ${
                        selectedTags.includes(tag)
                          ? 'border-[#8c6a40] bg-[#8c6a40] text-white'
                          : 'border-[#dde1e3] text-[#444748] hover:border-[#8c6a40] hover:text-[#8c6a40]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {tagCount > 0 && (
                  <div className="border-t border-[#f3f4f6] px-3 py-2">
                    <button
                      type="button"
                      onClick={() => onTagsChange?.([])}
                      className="text-[11px] font-semibold text-[#8c6a40] hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </PopoverPanel>
            </PopoverButton>
          </Popover>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1">
          {/* Notification bell */}
          <Popover>
            <PopoverButton className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#444748] transition hover:bg-black/5">
              <Bell size={18} strokeWidth={1.8} />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </PopoverButton>
            <PopoverPanel className="absolute right-0 top-10 z-50 w-80 overflow-hidden rounded-lg border border-[#c4c7c7] bg-white shadow-lg focus:outline-none">
              <p className="border-b border-[#c4c7c7] px-4 py-3 text-[13px] font-semibold text-[#191c1d]">
                Notifications
              </p>
              {notifications.length === 0 ? (
                <p className="px-4 py-5 text-center text-[12px] text-[#747878]">No notifications yet</p>
              ) : (
                notifications.slice(0, 3).map(n => (
                  <div
                    key={n.notification_id || n.id}
                    className={`border-b border-[#f3f4f6] px-4 py-3 ${n.is_read ? 'bg-white' : 'bg-[#f0f9ff]'}`}
                  >
                    <p className="mb-1 text-[12px] leading-snug text-[#444748]">{n.body || n.title}</p>
                    <span className="text-[10px] font-medium text-[#9ca3af]">
                      {n.created_at ? new Date(n.created_at).toLocaleString() : ''}
                    </span>
                  </div>
                ))
              )}
              {notifications.length > 3 && (
                <button
                  type="button"
                  onClick={onNotifViewAll}
                  className="w-full cursor-pointer bg-[#f8f9fa] py-2.5 text-center text-[11px] font-semibold text-[#8c6a40] transition hover:bg-[#edeeef]"
                >
                  View All
                </button>
              )}
            </PopoverPanel>
          </Popover>

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#444748] transition hover:bg-black/5"
          >
            {isDark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
          </button>

          {/* Ask / Raise button */}
          <button
            type="button"
            onClick={() => window.location.href = '/ask'}
            className="hidden sm:flex h-9 items-center gap-1.5 rounded-lg bg-[#8c6a40] px-3 text-[13px] font-semibold text-white transition hover:bg-[#7a5c38]"
          >
            <PlusCircle size={15} strokeWidth={2} />
            Raise New Query
          </button>

          {/* User menu */}
          <Menu as="div" className="relative">
            <MenuButton className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1528] text-[13px] font-bold text-white transition hover:opacity-90">
              {initials}
            </MenuButton>
            <MenuItems className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xl focus:outline-none">
              <MenuItem>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={onProfileSettings}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] ${focus ? 'bg-[#f8f9fa] text-[#111827]' : 'text-[#444748]'}`}
                  >
                    <Settings size={14} />
                    Profile Settings
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={onLanding}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] ${focus ? 'bg-[#f8f9fa] text-[#111827]' : 'text-[#444748]'}`}
                  >
                    <Globe size={14} />
                    View Public FAQ
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={onLogout}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] ${focus ? 'bg-[#f8f9fa] text-red-600' : 'text-red-500'}`}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  )
}

// Needed for the "View Public FAQ" menu item
import { Globe } from 'lucide-react'

export default DashboardHeader