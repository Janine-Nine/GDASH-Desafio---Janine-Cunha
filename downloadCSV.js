export async function downloadCsv(token) {
  const res = await fetch('/api/weather/export.csv', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'weather.csv';
  a.click();
  URL.revokeObjectURL(url);
}