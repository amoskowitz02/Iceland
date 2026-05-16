export default async function handler(req, res) {
  const { q, placeid } = req.query;
  const key = process.env.PLACES_API_KEY;

  if (!key) return res.status(500).json({ error: 'API key not configured' });

  if (placeid) {
    const r = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeid)}&fields=geometry,name&key=${key}`);
    const data = await r.json();
    return res.json(data);
  }

  if (q) {
    const r = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(q)}&components=country:is&key=${key}`);
    const data = await r.json();
    return res.json(data);
  }

  res.status(400).json({ error: 'Missing q or placeid' });
}
