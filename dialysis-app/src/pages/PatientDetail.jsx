import { ProcedureList } from '../components/ProcedureList';

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-baseline py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800 text-right max-w-[60%]">
        {value || '-'}
      </span>
    </div>
  );
}

export function PatientDetail({ patient, procedures, onBack }) {
  const { name, birthdate, age, group, note } = patient;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-slate-100 px-4 pt-14 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-1 rounded-xl active:bg-slate-100 transition-colors"
            aria-label="뒤로가기"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800">{name}</h1>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="px-4 py-4 space-y-3 pb-8">
        {/* 기본 정보 */}
        <div className="bg-white rounded-2xl px-5 py-2 shadow-sm border border-slate-100">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-2">
            기본 정보
          </h2>
          <InfoRow label="생년월일" value={birthdate} />
          <InfoRow label="나이" value={age ? `${age}세` : null} />
          <InfoRow label="요일 그룹" value={group} />
          {note && <InfoRow label="부가정보" value={note} />}
        </div>

        {/* 시술 이력 */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
            시술 이력
          </h2>
          <ProcedureList procedures={procedures} />
        </div>
      </div>
    </div>
  );
}
