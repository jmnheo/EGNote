function ProcedureSection({ title, icon, items }) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {icon} {title}
      </h3>
      {items.length === 0 ? (
        <p className="text-slate-400 text-sm">-</p>
      ) : (
        <div className="space-y-2">
          {items.map(({ label, dates }) => (
            <div key={label}>
              <span className="text-xs font-medium text-slate-500 uppercase">{label}</span>
              {dates.length === 0 ? (
                <p className="text-slate-400 text-sm mt-0.5">-</p>
              ) : (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {dates.map((d) => (
                    <span key={d} className="text-sm bg-slate-100 text-slate-700 rounded-lg px-2.5 py-0.5">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProcedureList({ procedures }) {
  const extractDates = (key) =>
    procedures.filter((p) => p[key]).map((p) => p.date);

  const vascularItems = [
    { label: 'Sono', dates: extractDates('sono') },
    { label: 'Fistulogram', dates: extractDates('fistulogram') },
  ].filter((item) => item.dates.length > 0);

  const cardiacItems = [
    { label: 'Thrombectomy', dates: extractDates('thrombectomy') },
    { label: 'PTA', dates: extractDates('pta') },
    { label: 'Stent', dates: extractDates('stent') },
  ].filter((item) => item.dates.length > 0);

  return (
    <div className="space-y-3">
      <ProcedureSection
        title="혈관 시술"
        icon="🩸"
        items={vascularItems.length > 0 ? vascularItems : [{ label: '이력 없음', dates: [] }]}
      />
      <ProcedureSection
        title="심장 시술"
        icon="❤️"
        items={cardiacItems.length > 0 ? cardiacItems : [{ label: '이력 없음', dates: [] }]}
      />
    </div>
  );
}
