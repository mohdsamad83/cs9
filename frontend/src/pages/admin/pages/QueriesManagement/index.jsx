import { Filter, MessageSquare } from 'lucide-react'

function QueriesManagementView({ dashboardData, searchQuery }) {
  const queries = dashboardData?.recent?.questions || []
  const normalizedSearch = searchQuery.trim().toLowerCase()
  const visibleQueries = normalizedSearch
    ? queries.filter((query) =>
        `${query.title || ''} ${query.kind || ''} ${query.status || ''}`
          .toLowerCase()
          .includes(normalizedSearch),
      )
    : queries

  return (
    <div className="flex-1 overflow-y-auto p-5 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-semibold text-[#111827]">
            Queries Management
          </h1>
          <p className="mt-2 text-[13px] text-[#4b5563]">Review recent platform questions.</p>
        </div>
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 text-[12px] font-semibold text-[#374151] transition hover:border-black hover:text-black"
        >
          <Filter className="h-4 w-4" strokeWidth={1.8} />
          Filter
        </button>
      </div>

      <section className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        <div className="border-b border-[#e5e7eb] px-5 py-4">
          <h2 className="flex items-center gap-2 text-[16px] font-bold text-[#111827]">
            <MessageSquare className="h-4 w-4 text-[#8c6a40]" strokeWidth={1.8} />
            Recent queries
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Kind</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Author</th>
              </tr>
            </thead>
            <tbody>
              {visibleQueries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[#747878]">
                    No recent queries match this view.
                  </td>
                </tr>
              ) : (
                visibleQueries.map((query) => (
                  <tr key={query.question_id} className="border-b border-[#f3f4f6] last:border-b-0">
                    <td className="px-5 py-4 font-bold text-[#111827]">
                      #{query.question_id?.slice(0, 8)}
                    </td>
                    <td className="max-w-[420px] truncate px-5 py-4 font-medium text-[#111827]">
                      {query.title}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase text-blue-700">
                        {query.kind || 'community'}
                      </span>
                    </td>
                    <td className="px-5 py-4 capitalize text-[#374151]">{query.status}</td>
                    <td className="px-5 py-4 text-[#6b7280]">
                      {query.author_id?.slice(0, 8) || 'Unknown'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default QueriesManagementView
