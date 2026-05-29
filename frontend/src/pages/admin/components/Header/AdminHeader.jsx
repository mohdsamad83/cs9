import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { Bell, LogOut, Search, Settings, User } from 'lucide-react'
import Button from '../../../../components/Button/Button'

function AdminHeader({
  user,
  initials,
  searchQuery,
  notifications,
  unreadCount,
  onSearchChange,
  onSearchSubmit,
  onNotificationsOpen,
  onLanding,
  onLogout,
}) {
  return (
    <header className="relative flex min-h-[72px] items-center justify-between border-b border-[#d9dadb] bg-white px-5 py-4 lg:px-8">
      <form
        className="flex h-10 w-full max-w-[420px] items-center gap-2 rounded-lg bg-[#f3f4f6] px-3 text-[#747878] transition focus-within:ring-1 focus-within:ring-[#8c6a40]"
        onSubmit={onSearchSubmit}
      >
        <Search className="h-4 w-4 shrink-0" strokeWidth={1.8} />
        <input
          className="min-w-0 flex-1 bg-transparent text-[13px] text-[#191c1d] outline-none placeholder:text-[#9ca3af]"
          placeholder="Search queries, FAQs, or status..."
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </form>

      <div className="ml-4 flex items-center gap-4 lg:gap-6">
        <Button
          variant="secondary"
          className="hidden min-h-9 px-4 text-[11px] font-bold uppercase tracking-wide sm:inline-flex"
          onClick={onLanding}
        >
          Landing
        </Button>

        <Popover className="relative">
          <PopoverButton
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#444748] transition hover:bg-[#f3f4f6] hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            onClick={() => onNotificationsOpen?.()}
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            )}
          </PopoverButton>

          <PopoverPanel className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-lg border border-[#d9dadb] bg-white shadow-lg focus:outline-none">
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
              <p className="text-[13px] font-semibold text-[#191c1d]">Notifications</p>
              <span className="rounded-full bg-[#f3f4f6] px-2 py-0.5 text-[10px] font-bold text-[#747878]">
                {unreadCount}
              </span>
            </div>
            {notifications.length === 0 ? (
              <p className="px-4 py-5 text-center text-[12px] text-[#747878]">
                No notifications yet
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.notification_id || notification.id}
                  className={`border-b border-[#f3f4f6] px-4 py-3 ${
                    notification.is_read ? 'bg-white' : 'bg-[#f0f9ff]'
                  }`}
                >
                  <p className="mb-1 text-[12px] font-semibold leading-snug text-[#191c1d]">
                    {notification.title || 'Admin notification'}
                  </p>
                  <p className="text-[11px] leading-5 text-[#747878]">
                    {notification.body || 'New platform activity is available.'}
                  </p>
                </div>
              ))
            )}
          </PopoverPanel>
        </Popover>

        <span className="hidden h-8 w-px bg-[#d9dadb] sm:block" />

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-3 focus:outline-none">
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-[13px] font-semibold capitalize text-[#191c1d]">
                {user?.name || 'Admin'}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#747878]">
                {user?.role || 'ADMIN'}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c6a40] text-[12px] font-bold text-white">
              {initials}
            </div>
          </MenuButton>

          <MenuItems className="absolute right-0 top-12 z-50 min-w-[190px] overflow-hidden rounded-lg border border-[#d9dadb] bg-white shadow-lg focus:outline-none">
            <div className="border-b border-[#e5e7eb] px-3 py-3">
              <p className="text-[12px] font-semibold text-[#191c1d]">{user?.name || 'Admin'}</p>
              <p className="mt-1 text-[10px] text-[#747878]">{user?.email || 'admin session'}</p>
            </div>
            <MenuItem>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-[13px] font-medium text-[#444748] transition data-focus:bg-[#f8f9fa]"
              >
                <User className="h-3.5 w-3.5" strokeWidth={1.8} /> Admin Profile
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-[13px] font-medium text-[#444748] transition data-focus:bg-[#f8f9fa]"
              >
                <Settings className="h-3.5 w-3.5" strokeWidth={1.8} /> Settings
              </button>
            </MenuItem>
            <div className="h-px bg-[#e5e7eb]" />
            <MenuItem>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-[13px] font-medium text-red-600 transition data-focus:bg-[#f8f9fa]"
                onClick={onLogout}
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} /> Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  )
}

export default AdminHeader
