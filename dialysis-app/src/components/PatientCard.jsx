export function PatientCard({ patient, onClick }) {
  const { name, birthdate, age, note } = patient;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 active:bg-slate-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-800">{name}</span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <div className="mt-1 text-sm text-slate-500">
        {birthdate} {age ? `· ${age}세` : ''}
      </div>
      {note && (
        <div className="mt-2 text-sm text-blue-600 bg-blue-50 rounded-lg px-3 py-1.5 inline-block">
          {note}
        </div>
      )}
    </button>
  );
}

export function PatientCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 bg-slate-200 rounded" />
        <div className="h-4 w-4 bg-slate-200 rounded" />
      </div>
      <div className="mt-2 h-4 w-40 bg-slate-100 rounded" />
    </div>
  );
}
