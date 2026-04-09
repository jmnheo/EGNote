import { useState, useEffect, useCallback } from 'react';
import { fetchPatients, fetchProcedures } from '../lib/sheets';

function getTodayGroup() {
  const day = new Date().getDay(); // 0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토
  if (day === 0) return null;          // 일요일 → 전체
  if ([1, 3, 5].includes(day)) return '월수금';
  return '화목토';
}

function getDayLabel() {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[new Date().getDay()];
}

export function useSheets() {
  const [patients, setPatients] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const todayGroup = getTodayGroup();
  const dayLabel = getDayLabel();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, pr] = await Promise.all([fetchPatients(), fetchProcedures()]);
      setPatients(p);
      setProcedures(pr);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredPatients = todayGroup
    ? patients.filter((p) => p.group === todayGroup)
    : patients;

  const getProceduresFor = (name) =>
    procedures.filter((pr) => pr.name === name).sort((a, b) => b.date.localeCompare(a.date));

  return {
    patients: filteredPatients,
    getProceduresFor,
    loading,
    error,
    refetch: load,
    todayGroup,
    dayLabel,
  };
}
