// Fetch from local API files instead of db.json
export async function fetchAPI(apiFile) {
  const apiUrl = new URL(`api/${apiFile}`, new URL(import.meta.env.BASE_URL, window.location.href));
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${apiFile}`);
  }

  return res.json();
}

// Keep old getDB for backward compatibility (fetches from db.json if needed)
export async function getDB() {
  const dbUrl = new URL("db.json", new URL(import.meta.env.BASE_URL, window.location.href));
  const res = await fetch(dbUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch db.json");
  }

  return res.json();
}
