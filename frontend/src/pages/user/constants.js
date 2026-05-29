import {
  Info, Banknote, ShieldCheck, DoorOpen,
  Users, ClipboardList, FileText, GraduationCap,
  TrendingUp, Link as LinkIcon,
} from 'lucide-react'

export const STATUS_CONFIG = {
  Active:        { color: '#8c6a40' },
  'In Progress': { color: '#4b5563' },
  Resolved:      { color: '#16a34a' },
}

export const SEARCH_CATEGORIES = [
  { Icon: Info,           title: 'Internship Info',     count: 45, color: '#8c6a40', bg: '#eff6ff' },
  { Icon: Banknote,       title: 'Stipend & Benefits', count: 32, color: '#9a3412', bg: '#ffedd5' },
  { Icon: ShieldCheck,    title: 'NOC Requirements',   count: 28, color: '#c2410c', bg: '#ffedd5' },
  { Icon: DoorOpen,       title: 'Lab Access',          count: 67, color: '#7e22ce', bg: '#f3e8ff' },
  { Icon: Users,          title: 'Work Culture',        count: 19, color: '#be123c', bg: '#ffe4e6' },
  { Icon: ClipboardList,  title: 'Project Allocation',  count: 38, color: '#1d4ed8', bg: '#eff6ff' },
  { Icon: FileText,       title: 'Final Report',         count: 24, color: '#374151', bg: '#f3f4f6' },
  { Icon: GraduationCap,  title: 'Academic Credits',     count: 15, color: '#b45309', bg: '#fef3c7' },
]

export const CONTRIBUTION_ITEMS = [
  { color: '#16a34a', title: 'Resolved: Hostel Wi-Fi downtime',   time: 'RESOLVED 10 MINS AGO' },
  { color: '#3b82f6', title: 'Commented: CMS102 Grade Upload',   time: '2 HOURS AGO'          },
  { color: '#3b82f6', title: 'Commented: Portal Elective Reg…',  time: 'YESTERDAY'            },
]

export const FAQ_CATEGORIES = [
  { num: '01', title: 'Selection & Onboarding', meta: '420 UPVOTES • 12 QUERIES' },
  { num: '02', title: 'NOC Requirements',        meta: '310 UPVOTES • 8 QUERIES'  },
  { num: '03', title: 'Project Allocation',      meta: '195 UPVOTES • 5 QUERIES'  },
]
