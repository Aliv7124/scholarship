import { handler as backendHandler } from "../backend/index.js";

export default function dispatch(req, res) {
  const incoming = new URL(req.url, `https://${req.headers.host || "localhost"}`);
  const route = incoming.searchParams.get("_route");
  if (!route) {
    res.writeHead(400, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "API route is missing." }));
    return;
  }

  incoming.searchParams.delete("_route");
  const query = incoming.searchParams.toString();
  const apiPath = route.startsWith("/") ? route : `/${route}`;
  req.url = `/api${apiPath}${query ? `?${query}` : ""}`;
  return backendHandler(req, res);
}