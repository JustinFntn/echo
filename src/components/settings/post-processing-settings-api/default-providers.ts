// Default base URLs for post-process providers
// These should match the defaults defined in src-tauri/src/settings.rs
export const DEFAULT_PROVIDER_BASE_URLS: Record<string, string> = {
  openai: "https://api.openai.com/v1",
  openrouter: "https://openrouter.ai/api/v1",
  anthropic: "https://api.anthropic.com/v1",
  ollama: "http://localhost:11434/v1",
  custom: "http://localhost:8080/v1",
};

export const getDefaultBaseUrl = (providerId: string): string | undefined =>
  DEFAULT_PROVIDER_BASE_URLS[providerId];
