// Fetch from local API files instead of db.json
export async function fetchAPI(apiFile) {
  const res = await fetch(`./api/${apiFile}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${apiFile}`);
  }

  return res.json();
}

// Keep old getDB for backward compatibility (fetches from db.json if needed)
export async function getDB() {
  const res = await fetch("./db.json");

  if (!res.ok) {
    throw new Error("Failed to fetch db.json");
  }

  return res.json();
}