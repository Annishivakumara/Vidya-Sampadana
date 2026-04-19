const PRIMARY_NEET_UPDATES_URL =
  process.env.REACT_APP_NEET_UPDATES_URL || "http://localhost:8084/api/neet-updated";

function asArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.updates)) return payload.updates;
  return [];
}

export async function fetchNeetUpdates() {
  const tryUrls = [PRIMARY_NEET_UPDATES_URL];

  if (PRIMARY_NEET_UPDATES_URL.includes("neet-updated")) {
    tryUrls.push(PRIMARY_NEET_UPDATES_URL.replace("neet-updated", "neet-updates"));
  }

  let lastError;

  for (const url of tryUrls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();
      return asArray(json);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to fetch NEET updates.");
}

