function CategorySection({ category, procedures }) {
  const icon = category === '혈관' ? '🩸' : category === '심장' ? '❤️' : '📋';

  return (
    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {icon} {category}
      </h3>
      <div className="space-y-3">
        {Object.entries(procedures).map(([procName, entries]) => (
          <div key={procName}>
            <span className="text-xs font-semibold text-slate-500">{procName}</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {entries.map(({ date, memo }, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-sm bg-slate-100 text-slate-700 rounded-lg px-2.5 py-0.5">
                    {date}
                  </span>
                  {memo && (
                    <span className="text-xs text-slate-400">{memo}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProcedureList({ grouped }) {
  const categories = Object.keys(grouped);

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 text-sm text-slate-400">
        시술 이력 없음
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <CategorySection key={cat} category={cat} procedures={grouped[cat]} />
      ))}
    </div>
  );
}
