
import { createServer } from "node:http";

const API_KEY = process.env.TMDB_API_KEY;
const PORT = 3001;
const HOST = "127.0.0.1";

if (!API_KEY) {
  console.error("TMDB_API_KEY is missing");
  process.exit(1);
}

const rateLimits = new Map();
const cache = new Map();

function sendJSON(res, status, data, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });

  res.end(JSON.stringify(data));
}

function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",").at(-1).trim();
  }

  return req.socket.remoteAddress || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  let bucket = rateLimits.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + 60_000 };
  }

  bucket.count++;
  rateLimits.set(ip, bucket);

  if (rateLimits.size > 5000) {
    for (const [key, value] of rateLimits) {
      if (value.resetAt <= now) rateLimits.delete(key);
    }
  }

  if (bucket.count > 60) {
    return Math.ceil((bucket.resetAt - now) / 1000);
  }

  return 0;
}

async function getTMDB(endpoint, query = "") {
  const url = new URL(
    `https://api.themoviedb.org/3${endpoint}`
  );

  url.searchParams.set("api_key", API_KEY);

  if (query) {
    url.searchParams.set("query", query);
  }

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error(`TMDB error: HTTP ${response.status}`);
    throw new Error("TMDB request failed");
  }

  return response.json();
}

const server = createServer(async (req, res) => {
  try {
    if (req.method !== "GET") {
      return sendJSON(res, 405, { error: "Method not allowed" });
    }

    const url = new URL(req.url, "http://localhost");

    let endpoint;
    let query = "";

    if (url.pathname === "/api/movies/popular") {
      endpoint = "/movie/popular";
    } else if (url.pathname === "/api/movies/search") {
      query = (url.searchParams.get("query") || "").trim();

      if (!query || query.length > 100) {
        return sendJSON(res, 400, { error: "Invalid search query" });
      }

      endpoint = "/search/movie";
    } else {
      return sendJSON(res, 404, { error: "Not found" });
    }

    const retryAfter = checkRateLimit(getClientIP(req));

    if (retryAfter > 0) {
      return sendJSON(
        res,
        429,
        { error: "Too many requests" },
        { "Retry-After": String(retryAfter) }
      );
    }

    const cacheKey = `${endpoint}:${query}`;
    const cached = cache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      return sendJSON(res, 200, cached.data);
    }

    const data = await getTMDB(endpoint, query);

    cache.set(cacheKey, {
      data,
      expiresAt: Date.now() + 30_000,
    });

    return sendJSON(res, 200, data);
  } catch (error) {
    console.error("Movie API error:", error.message);

    const status = error.name === "TimeoutError" ? 504 : 502;

    return sendJSON(res, status, {
      error: "Movie service temporarily unavailable",
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Movie API running at http://${HOST}:${PORT}`);
});
