import { Briefcase, CheckCircle, Clock, FileText } from 'lucide-react'

const stages = [
  { label: 'Submitted', value: 28, Icon: FileText, className: 'bg-blue-50 text-blue-700' },
  { label: 'In Review', value: 14, Icon: Clock, className: 'bg-amber-50 text-amber-700' },
  { label: 'Approved', value: 9, Icon: CheckCircle, className: 'bg-emerald-50 text-emerald-700' },
]

function SpurtiManagementView() {
  return (
    <div className="flex-1 overflow-y-auto p-5 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-[24px] font-semibold text-[#111827]">
          Spurti Management
        </h1>
        <p className="mt-2 text-[13px] text-[#4b5563]">Application pipeline overview.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {stages.map(({ label, value, Icon, className }) => (
          <div key={label} className="rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${className}`}>
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <Briefcase className="h-4 w-4 text-[#9ca3af]" strokeWidth={1.8} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">{label}</p>
            <p className="mt-2 text-[28px] font-semibold text-[#111827]">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[16px] font-bold text-[#111827]">Application queue</h2>
        <div className="grid gap-3">
          {['Transcript verification', 'Mentor approval', 'Final offer preparation'].map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-lg border border-[#e5e7eb] px-4 py-3"
            >
              <div>
                <p className="text-[13px] font-semibold text-[#111827]">{item}</p>
                <p className="mt-1 text-[11px] text-[#6b7280]">Batch SP-{4600 + index}</p>
              </div>
              <span className="rounded bg-[#f3f4f6] px-2 py-1 text-[10px] font-bold uppercase text-[#6b7280]">
                Active
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SpurtiManagementView
