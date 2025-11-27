use crate::settings::PostProcessProvider;
use async_openai::{config::OpenAIConfig, Client};

/// Create an OpenAI-compatible client configured for the given provider
pub fn create_client(
    provider: &PostProcessProvider,
    api_key: String,
) -> Result<Client<OpenAIConfig>, String> {
    let base_url = provider.base_url.trim_end_matches('/');

    // For Ollama, use a dummy API key since it doesn't require authentication
    // but async-openai requires a non-empty key
    let effective_api_key = if provider.id == "ollama" && api_key.is_empty() {
        "ollama".to_string() // Ollama ignores this but async-openai needs something
    } else {
        api_key
    };

    let config = OpenAIConfig::new()
        .with_api_base(base_url)
        .with_api_key(effective_api_key);

    // Create client with Anthropic-specific header if needed
    let client = if provider.id == "anthropic" {
        let mut headers = reqwest::header::HeaderMap::new();
        headers.insert(
            "anthropic-version",
            reqwest::header::HeaderValue::from_static("2023-06-01"),
        );

        let http_client = reqwest::Client::builder()
            .default_headers(headers)
            .build()
            .map_err(|e| format!("Failed to build HTTP client: {}", e))?;

        Client::with_config(config).with_http_client(http_client)
    } else {
        Client::with_config(config)
    };

    Ok(client)
}
