import { defineEventHandler, getRouterParam, createError } from 'h3';

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function getAdminToken(apiUrl: string, user: string, password: string): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.accessToken;
  }

  const response = await fetch(`${apiUrl}/rest/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password }),
  });

  if (!response.ok) {
    throw createError({ statusCode: 401, statusMessage: 'Plentymarkets admin login failed' });
  }

  const data = await response.json();
  cachedToken = {
    accessToken: data.access_token || data.accessToken,
    expiresAt: Date.now() + (data.expires_in || data.expiresIn || 86400) * 1000,
  };
  return cachedToken.accessToken;
}

export default defineEventHandler(async (event) => {
  const variationId = getRouterParam(event, 'variationId');
  if (!variationId || isNaN(Number(variationId))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid variationId' });
  }

  const config = useRuntimeConfig();
  const apiUrl = config.plentyApiEndpoint as string;
  const adminUser = config.plentyAdminUser as string;
  const adminPassword = config.plentyAdminPassword as string;

  if (!adminUser || !adminPassword) {
    return { netStock: null, stockPhysical: null, configured: false };
  }

  try {
    const token = await getAdminToken(apiUrl, adminUser, adminPassword);

    const stockResponse = await fetch(
      `${apiUrl}/rest/stockmanagement/stock?variationId=${variationId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!stockResponse.ok) {
      return { netStock: null, stockPhysical: null, configured: true };
    }

    const stockData = await stockResponse.json();
    const entries = stockData.entries || stockData || [];
    const stockEntries = Array.isArray(entries) ? entries : [];

    let totalNetStock = 0;
    let totalPhysical = 0;
    for (const entry of stockEntries) {
      totalNetStock += entry.stockNet ?? entry.netStock ?? 0;
      totalPhysical += entry.stockPhysical ?? 0;
    }

    return {
      netStock: totalNetStock,
      stockPhysical: totalPhysical,
      configured: true,
    };
  } catch {
    cachedToken = null;
    return { netStock: null, stockPhysical: null, configured: true };
  }
});
