import type { Languages } from './types';

export class SystemConfiguration {
  private readonly environment: Record<string, string | undefined>;

  constructor(env: Record<string, string | undefined>) {
    this.environment = env;
  }

  getFaviconUrl(): string {
    return this.environment.FAVICON || '';
  }

  getLogoUrl(): string {
    return this.environment.LOGO || '';
  }

  getLanguages(): Languages {
    return {
      default: this.environment.DEFAULTLANGUAGE || 'de',
      activated: this.environment.LANGUAGELIST || 'de',
    };
  }
}
