const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values`;

async function fetchRange(range) {
  const url = `${BASE_URL}/${encodeURIComponent(range)}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Sheets API 오류 (${res.status})`);
  }
  const data = await res.json();
  return data.values || [];
}

export async function fetchPatients() {
  const rows = await fetchRange('환자목록!A3:E');
  return rows
    .filter((row) => row[0]?.trim())
    .map((row) => ({
      name: row[0]?.trim() || '',
      birthdate: row[1]?.trim() || '',
      age: row[2]?.trim() || '',
      group: row[3]?.trim() || '',
      note: row[4]?.trim() || '',
    }));
}

export async function fetchProcedures() {
  const rows = await fetchRange('시술이력!A3:G');
  return rows
    .filter((row) => row[0]?.trim())
    .map((row) => ({
      name: row[0]?.trim() || '',
      date: row[1]?.trim() || '',
      sono: row[2]?.trim() === 'O',
      fistulogram: row[3]?.trim() === 'O',
      thrombectomy: row[4]?.trim() === 'O',
      pta: row[5]?.trim() === 'O',
      stent: row[6]?.trim() === 'O',
    }));
}
