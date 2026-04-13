import { useState } from 'react';
import { useSheets } from './hooks/useSheets';
import { PatientList } from './pages/PatientList';
import { PatientDetail } from './pages/PatientDetail';

export default function App() {
  const { patients, getProceduresFor, loading, error, refetch, todayGroup, dayLabel } = useSheets();
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <PatientDetail
        patient={selected}
        grouped={getProceduresFor(selected.name)}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <PatientList
      patients={patients}
      loading={loading}
      error={error}
      refetch={refetch}
      todayGroup={todayGroup}
      dayLabel={dayLabel}
      onSelect={setSelected}
    />
  );
}
