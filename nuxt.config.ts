import { env } from 'node:process';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    databaseFilePath: env.DATABASE_PATH,
  },
});
