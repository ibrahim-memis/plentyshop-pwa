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
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('/')) return documentBaseUrl ? `${documentBaseUrl}${trimmed}` : trimmed;
    const normalizedPath = trimmed.replace(/^\/+/, '');
    return documentBaseUrl ? `${documentBaseUrl}/documents/${normalizedPath}` : trimmed;
  };

  return { buildDocumentUrl };
};
