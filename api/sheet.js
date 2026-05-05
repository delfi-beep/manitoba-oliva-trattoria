export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const SHEET_ID = process.env.SHEET_ID;
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch sheet');
    const csv = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
