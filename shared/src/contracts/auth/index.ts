import { API_MOUNT as PARENT_API_MOUNT } from '../index.js';
export const API_MOUNT = `${PARENT_API_MOUNT}/auth`;

export * from './login.js';
export * from './register.js';
