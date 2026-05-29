import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { TrendingUp, Link as LinkIcon, X } from 'lucide-react'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import { SEARCH_CATEGORIES, CONTRIBUTION_ITEMS, FAQ_CATEGORIES } from '../../constants'
import { fetchQuestions, voteQuestion, normalizeQuestion } from '../../service'

function DashboardPage() {
  const navigate = useNavigate()
  const { user, sidebarNav, setCurrentView } = useOutletContext()

  const [queries, setQueries]               = useState([])
  const [loadingQueries, setLoadingQueries] = useState(true)
  const [searchQuery, setSearchQuery]       = useState('')
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [activeTab, setActiveTab]           = useState('All Queries')

  const loadQuestions = useCallback(async () => {
    setLoadingQueries(true)
    try {
      const sort = activeTab === 'Trending' ? 'trending' : 'latest'
      const my   = sidebarNav === 'My Queries'
      const data = await fetchQuestions({ search: searchQuery, sort, my })
      setQueries((data.questions || []).map(q => normalizeQuestion(q, user?.userId)))
    } catch {
      setQueries([])
    } finally {
      setLoadingQueries(false)
    }
  }, [activeTab, sidebarNav, searchQuery, user?.userId])

  useEffect(() => { loadQuestions() }, [loadQuestions])

  async function handleUpvote(id) {
    setQueries(qs =>
      qs.map(q =>
        q.id === id
          ? { ...q, hasUpvoted: !q.hasUpvoted, upvotes: q.hasUpvoted ? q.upvotes - 1 : q.upvotes + 1 }
          : q,
      ),
    )
    try {
      const result = await voteQuestion(id)
      setQueries(qs => qs.map(q => q.id === id ? { ...q, upvotes: result.upvotes, hasUpvoted: result.hasVoted } : q))
    } catch {
      setQueries(qs =>
        qs.map(q =>
          q.id === id
            ? { ...q, hasUpvoted: !q.hasUpvoted, upvotes: q.hasUpvoted ? q.upvotes - 1 : q.upvotes + 1 }
            : q,
        ),
      )
    }
  }

  const filtered = queries.filter(q => {
    if (activeTab === 'Resolved'    && q.status !== 'Resolved')                      return false
    if (activeTab === 'Unanswered'  && !['Active', 'In Progress'].includes(q.status)) return false
    return true
  })

  return (
    <>
      <div className="flex gap-10 p-8">
        {/* Left column */}
        <div className="min-w-0 flex-1">
          {sidebarNav === 'My Queries' && (
            <h2 className="font-display mb-6 text-[18px] font-semibold text-[#191c1d]">My Queries</h2>
          )}

          {/* Tabs */}
          <div className="mb-6 flex items-center border-b border-[#c4c7c7] pb-4">
            <div className="flex gap-7">
              {['All Queries', 'Trending', 'Recent', 'Unanswered', 'Resolved'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`mb-[-17px] pb-4 text-[13px] font-semibold transition ${
                    activeTab === tab
                      ? 'border-b-2 border-[#8c6a40] text-[#8c6a40]'
                      : 'text-[#6b7280] hover:text-[#374151]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loadingQueries && <p className="mt-5 text-[13px] text-[#747878]">Loading questions…</p>}
          {!loadingQueries && filtered.length === 0 && (
            <p className="mt-5 text-[13px] text-[#747878]">
              No matching queries found{searchQuery ? ` for "${searchQuery}"` : ''}.
            </p>
          )}

          {filtered.map(query => (
            <QuestionCard key={query.id} query={query} onUpvote={handleUpvote} />
          ))}

          <p className="mt-10 pb-10 text-center text-[11px] text-[#747878]">
            © 2026 Rogāre Internship Hub. All rights reserved.
          </p>
        </div>

        {/* Right column */}
        <div className="flex w-[300px] shrink-0 flex-col gap-6">
          <div className="rounded-xl border border-[#c4c7c7] bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-md bg-[#8c6a40] p-1.5 text-white">
                <TrendingUp className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <span className="font-display text-[16px] font-semibold text-[#191c1d]">Top FAQ Categories</span>
            </div>
            <ul className="mb-4 space-y-5">
              {FAQ_CATEGORIES.map(item => (
                <li key={item.num} className="flex cursor-pointer items-start gap-3 transition hover:opacity-70">
                  <span className="font-display text-[20px] leading-none text-[#9ca3af]">{item.num}</span>
                  <div>
                    <h5 className="text-[13px] font-medium text-[#191c1d]">{item.title}</h5>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-[#747878]">{item.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="w-full rounded-md border border-[#8c6a40] py-2.5 text-[12px] font-semibold text-[#8c6a40] transition hover:bg-[#8c6a40] hover:text-white"
            >
              View All Categories
            </button>
          </div>

          <div className="rounded-xl border border-[#c4c7c7] bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-md bg-[#8c6a40] p-1.5 text-white">
                <LinkIcon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <span className="font-display text-[16px] font-semibold text-[#191c1d]">Your Contribution</span>
            </div>
            <div className="relative pl-5">
              <div className="absolute bottom-2.5 left-1 top-2.5 w-px bg-[#d1d5db]" />
              {CONTRIBUTION_ITEMS.map((item, i) => (
                <div key={i} className="relative mb-6 cursor-pointer transition hover:opacity-70">
                  <div className="absolute -left-5 top-1.5 h-2 w-2 rounded-full" style={{ background: item.color }} />
                  <h5 className="text-[13px] font-medium text-[#191c1d]">{item.title}</h5>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-[#747878]">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search modal portal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-start justify-center bg-black/50 pt-[120px] backdrop-blur-sm"
          onClick={() => setSearchModalOpen(false)}
        >
          <div className="flex w-[1000px] max-w-[95vw] flex-col rounded-2xl bg-white p-10 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="mb-10 flex justify-center">
              <div className="flex w-[65%] items-center gap-4 rounded-lg border-2 border-blue-600 bg-white px-6 py-4 shadow-sm">
                <TrendingUp className="h-6 w-6 shrink-0 text-[#6b7280]" strokeWidth={1.8} />
                <input
                  autoFocus
                  className="flex-1 bg-transparent text-[18px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
                  placeholder="Search FAQs, categories, or status…"
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="button" onClick={() => setSearchModalOpen(false)}>
                  <X className="h-6 w-6 text-[#6b7280] transition hover:text-black" strokeWidth={1.8} />
                </button>
              </div>
            </div>
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#6b7280]">Categories</span>
                <div className="h-px flex-1 bg-[#e5e7eb]" />
              </div>
              <div className="grid grid-cols-8 gap-4">
                {SEARCH_CATEGORIES.map((cat, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`flex h-[140px] flex-col items-center justify-center rounded-lg border p-2 text-center transition hover:-translate-y-0.5 hover:border-2 hover:border-[#8c6a40] hover:shadow-md ${
                      i === 0 ? 'border-2 border-[#8c6a40]' : 'border-[#e5e7eb]'
                    }`}
                    onClick={() => { setSearchQuery(cat.title); setSearchModalOpen(false) }}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: cat.bg, color: cat.color }}>
                      <cat.Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h4 className="mb-3 text-[11px] font-bold leading-snug text-[#111827]">{cat.title}</h4>
                    <span className={`rounded px-2 py-1 text-[9px] font-extrabold ${i === 0 ? 'bg-[#8c6a40] text-white' : 'bg-[#f3f4f6] text-[#4b5563]'}`}>
                      {cat.count} FAQS
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardPage
