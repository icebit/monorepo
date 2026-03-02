import { Redis } from "@upstash/redis";

// Initialized lazily so the app still works locally without env vars
let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  redis = new Redis({ url, token });
  return redis;
}

const DATA_KEY = "daily-app-data";

export async function getData(): Promise<unknown | null> {
  const kv = getRedis();
  if (!kv) return null;
  return kv.get(DATA_KEY);
}

export async function setData(data: unknown): Promise<void> {
  const kv = getRedis();
  if (!kv) return;
  await kv.set(DATA_KEY, data);
}
