import { Droplet, Heart, Pill, FlaskConical, Stethoscope } from 'lucide-react';

const CATEGORY_ICONS = {
  혈관: Droplet,
  심장: Heart,
  투약: Pill,
  검사: FlaskConical,
};

function CategorySection({ category, procedures }) {
  const Icon = CATEGORY_ICONS[category] || Stethoscope;

  return (
    <div>
      {/* 카테고리 구분선 */}
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
        <span className="text-sm font-bold text-slate-600">{category}</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* 시술명별 목록 */}
      <div className="space-y-5">
        {Object.entries(procedures).map(([procName, entries]) => (
          <div key={procName}>
            <p className="text-sm font-semibold text-slate-500 mb-2">{procName}</p>
            <div className="flex flex-wrap gap-2">
              {entries.map(({ date, memo }, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-base font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-xl px-4 py-2 min-w-[96px] text-center">
                    {formatDate(date)}
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

function formatDate(dateStr) {
  if (!dateStr) return dateStr;
  const match = dateStr.match(/^(\d{2})\d{2}-(\d{2})-(\d{2})$/);
  if (match) return `${match[1]}.${match[2]}.${match[3]}`;
  return dateStr;
}

export function ProcedureList({ grouped }) {
  const categories = Object.keys(grouped);

  if (categories.length === 0) {
    return (
      <div className="text-sm text-slate-400 py-2 px-1">시술 이력 없음</div>
    );
  }

  return (
    <div className="bg-white rounded-2xl px-5 py-5 shadow-sm border border-slate-100 space-y-6">
      {categories.map((cat) => (
        <CategorySection key={cat} category={cat} procedures={grouped[cat]} />
      ))}
    </div>
  );
}
