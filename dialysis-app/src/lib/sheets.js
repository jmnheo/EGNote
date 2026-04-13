const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values`;

async function fetchRange(range) {
  const url = `${BASE_URL}/${encodeURIComponent(range)}?key=${API_KEY}&valueRenderOption=FORMATTED_VALUE`;

  console.log('[Sheets] fetch 시작:', range);
  console.log('[Sheets] SPREADSHEET_ID:', SPREADSHEET_ID ? SPREADSHEET_ID.slice(0, 8) + '...' : '❌ 없음');
  console.log('[Sheets] API_KEY:', API_KEY ? API_KEY.slice(0, 8) + '...' : '❌ 없음');

  let res;
  try {
    res = await fetch(url);
  } catch (networkErr) {
    console.error('[Sheets] 네트워크 오류:', networkErr);
    throw new Error(`네트워크 오류: ${networkErr.message}`);
  }

  console.log('[Sheets] 응답 status:', res.status, res.statusText);

  if (!res.ok) {
    const body = await res.text();
    console.error('[Sheets] 오류 응답 body:', body);
    let message = `HTTP ${res.status} ${res.statusText}`;
    try {
      const json = JSON.parse(body);
      message = json?.error?.message || message;
      console.error('[Sheets] 오류 상세:', json?.error);
    } catch (_) {}
    throw new Error(message);
  }

  const data = await res.json();
  console.log('[Sheets] 수신 행 수:', (data.values || []).length, `(${range})`);
  return data.values || [];
}

export async function fetchPatients() {
  const rows = await fetchRange('환자목록!A4:E');
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
  const rows = await fetchRange('시술이력!A4:E');
  return rows
    .filter((row) => row[0]?.trim())
    .map((row) => ({
      name: row[0]?.trim() || '',
      date: row[1]?.trim() || '',
      category: row[2]?.trim() || '',
      procedure: row[3]?.trim() || '',
      memo: row[4]?.trim() || '',
    }));
}
