import { useState } from 'react'
import { Settings, Search, SlidersHorizontal, PlusCircle, Bell, LogOut, Moon, Sun } from 'lucide-react'
import Button from '../../../../components/Button/Button'

function DashboardHeader({
  user,
  initials,
  currentView,
  notifications,
  unreadCount,
  isDark,
  hasFilter,
  onSearchOpen,
  onRaiseQuery,
  onNotifOpen,
  onDarkToggle,
  onProfileSettings,
  onLogout,
}) {
  const [showNotif, setShowNotif]     = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  async function handleBellClick(e) {
    e.stopPropagation()
    const opening = !showNotif
    setShowNotif(opening)
    setShowUserMenu(false)
    if (opening) await onNotifOpen()
  }

  function handleUserMenuClick(e) {
    e.stopPropagation()
    setShowUserMenu(v => !v)
    setShowNotif(false)
  }

  function closeAll() {
    setShowNotif(false)
    setShowUserMenu(false)
  }

  return (
    <header
      className="relative flex items-center justify-between border-b border-[#c4c7c7] bg-white pl-8 pr-[10%] py-4"
      onClick={closeAll}
    >
      {/* Search trigger */}
      <button
        type="button"
        className={`flex w-90 items-center gap-2.5 rounded-lg border bg-[#f8f9fa] px-3 py-2 text-left transition hover:border-black ${
          hasFilter ? 'border-[#8c6a40]' : 'border-[#c4c7c7]'
        }`}
        onClick={e => { e.stopPropagation(); onSearchOpen() }}
      >
        <Search className="h-4 w-4 shrink-0 text-[#747878]" strokeWidth={1.8} />
        <span className={`flex-1 text-[12px] ${hasFilter ? 'text-[#191c1d]' : 'text-[#747878]'}`}>
          Search FAQs, categories, or status…
        </span>
        <div className="relative">
          <SlidersHorizontal
            className={`h-3.5 w-3.5 transition ${hasFilter ? 'text-[#8c6a40]' : 'text-[#c4c7c7]'}`}
            strokeWidth={1.8}
          />
          {hasFilter && (
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#8c6a40]" />
          )}
        </div>
      </button>

      <div className="relative flex items-center gap-4" onClick={e => e.stopPropagation()}>
        {currentView === 'dashboard' && (
          <Button variant="secondary" className="gap-2 text-[11px]" onClick={onRaiseQuery}>
            <PlusCircle className="h-3.5 w-3.5" strokeWidth={1.8} /> Raise Query
          </Button>
        )}

        {/* Bell */}
        <div className="relative">
          <button
            type="button"
            className="relative p-1 text-[#444748] transition hover:text-black"
            onClick={handleBellClick}
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {showNotif && (
            <div
              className="absolute right-0 top-9 z-50 w-80 overflow-hidden rounded-lg border border-[#c4c7c7] bg-white shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <p className="border-b border-[#c4c7c7] px-4 py-3 text-[13px] font-semibold text-[#191c1d]">
                Notifications
              </p>
              {notifications.length === 0 ? (
                <p className="px-4 py-5 text-center text-[12px] text-[#747878]">No notifications yet</p>
              ) : (
                notifications.map(n => (
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
              <div className="cursor-pointer bg-[#f8f9fa] py-2.5 text-center text-[11px] font-semibold text-[#191c1d] transition hover:bg-[#edeeef]">
                View All
              </div>
            </div>
          )}
        </div>

        {/* Dark mode */}
        <button
          type="button"
          className="p-1 text-[#444748] transition hover:text-black"
          onClick={e => { e.stopPropagation(); onDarkToggle() }}
        >
          {isDark
            ? <Sun  className="h-[18px] w-[18px]" strokeWidth={1.8} />
            : <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />}
        </button>

      </div>

      {/* User menu — centred inside rightmost 10% lane */}
      <div
        className="absolute right-0 top-0 flex h-full w-[10%] items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2.5"
            onClick={handleUserMenuClick}
          >
            <div className="text-right">
              <p className="text-[12px] font-semibold text-[#191c1d]">{user?.name || 'Student'}</p>
              <p className="text-[10px] font-medium uppercase tracking-wide text-[#747878]">{user?.role || 'USER'}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8c6a40] text-[12px] font-bold text-white">
              {initials}
            </div>
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 top-11 z-50 min-w-[160px] overflow-hidden rounded-lg border border-[#c4c7c7] bg-white shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-[11px] font-medium text-[#444748] transition hover:bg-[#f8f9fa]"
                onClick={() => { onProfileSettings(); setShowUserMenu(false) }}
              >
                <Settings className="h-3.5 w-3.5" strokeWidth={1.8} /> Profile Settings
              </button>
              <div className="h-px bg-[#c4c7c7]" />
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-[11px] font-medium text-red-600 transition hover:bg-[#f8f9fa]"
                onClick={onLogout}
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
