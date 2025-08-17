declare namespace NodeJS {
  interface ProcessEnv {
    // OpenAI API
    OPENAI_API_KEY: string;

    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;

    // App Configuration
    NEXT_PUBLIC_APP_URL: string;
  }
}