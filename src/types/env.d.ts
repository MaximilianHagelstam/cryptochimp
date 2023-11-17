declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    CMC_API_KEY: string;
    CRON_SECRET: string;
  }
}
