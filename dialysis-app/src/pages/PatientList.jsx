import { PatientCard, PatientCardSkeleton } from '../components/PatientCard';

function formatDate(date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function PatientList({ patients, loading, error, refetch, todayGroup, dayLabel, onSelect }) {
  const today = new Date();
  const groupLabel = todayGroup || '전체';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-slate-100 px-5 pt-14 pb-4 sticky top-0 z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">오늘의 환자</p>
            <h1 className="text-xl font-bold text-slate-800">
              {formatDate(today)} {dayLabel}요일
            </h1>
            <span className="inline-block mt-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5">
              {groupLabel} 그룹
            </span>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="mt-1 p-2.5 rounded-xl bg-slate-100 active:bg-slate-200 transition-colors disabled:opacity-50"
            aria-label="새로고침"
          >
            <svg
              className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="px-4 py-4 space-y-3 pb-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm">
            <p className="font-semibold">데이터를 불러오지 못했습니다</p>
            <p className="mt-1 text-red-500">{error}</p>
          </div>
        )}

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <PatientCardSkeleton key={i} />)
        ) : !error && patients.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">📋</p>
            <p>오늘 해당하는 환자가 없습니다.</p>
          </div>
        ) : (
          patients.map((patient) => (
            <PatientCard
              key={patient.name + patient.birthdate}
              patient={patient}
              onClick={() => onSelect(patient)}
            />
          ))
        )}
      </div>
    </div>
  );
}
