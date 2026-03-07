/**
 * PlentyMarkets uyumlu görsel URL oluşturucu.
 * - Zaten tam URL ise (http/https) olduğu gibi döner
 * - document path ise baseUrl + /documents/ ile birleştirir
 * - DOCUMENT_BASE_URL tanımlıysa onu kullanır, yoksa domain (API_ENDPOINT)
 * - Boş veya geçersiz path için boş string döner
 */
export const useBuildImageUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  const docBase =
    (runtimeConfig.public as { documentBaseUrl?: string }).documentBaseUrl ||
    '';
  const documentBaseUrl = (docBase && docBase.trim()) ? docBase.replace(/\/+$/, '') : String(runtimeConfig.public.domain || '').replace(/\/+$/, '');

  const buildDocumentUrl = (path: string | null | undefined): string => {
    if (!path || typeof path !== 'string') return '';
    const trimmed = path.trim();
    if (!trimmed) return '';
    // Zaten tam URL
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    // / ile başlıyorsa baseUrl + path (örn: /documents/0/123/img.jpg)
    if (trimmed.startsWith('/')) return documentBaseUrl ? `${documentBaseUrl}${trimmed}` : trimmed;
    // Göreli path: baseUrl/documents/path
    const normalizedPath = trimmed.replace(/^\/+/, '');
    return documentBaseUrl ? `${documentBaseUrl}/documents/${normalizedPath}` : trimmed;
  };

  return { buildDocumentUrl };
};
