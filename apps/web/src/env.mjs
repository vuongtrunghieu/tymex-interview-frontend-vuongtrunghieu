import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {},
  shared: {},
  server: {
    API_ENDPOINT: z.string().url({ message: 'Must be a valid URL' }),
  },
  runtimeEnv: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
