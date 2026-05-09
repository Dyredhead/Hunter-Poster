import { z } from 'zod';
import { API_MOUNT as PARENT_API_MOUNT } from './index.js';
const API_MOUNT = `${PARENT_API_MOUNT}/login`;

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const loginContract = {
  mount: API_MOUNT,
  routes: {
    login: {
      method: 'POST',
      pattern: '/',
      build: () => API_MOUNT,

      request: {
        params: z.object({
          id: z.int(),
        }),
      },

      response: z.object({
        // user: UserSchema,
      }),
    },
  },
} as const;
