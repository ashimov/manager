import {
  COLD_ARCHIVE_STATES as STATES,
  REGION as DEFAULT_REGION,
} from '../../cold-archives.constants';

export const COLD_ARCHIVE_STATES = STATES;
export const COLD_ARCHIVE_DEFAULT_REGION = DEFAULT_REGION;
export const OBJECT_CONTAINER_USER_ROLE_ADMIN = 'admin';
export const OBJECT_CONTAINER_USER_ROLE_DENY = 'deny';
export const OBJECT_CONTAINER_USER_ROLE_READ_ONLY = 'readOnly';
export const OBJECT_CONTAINER_USER_ROLE_READ_WRITE = 'readWrite';
export const OBJECT_CONTAINER_USER_ROLES = [
  OBJECT_CONTAINER_USER_ROLE_ADMIN,
  OBJECT_CONTAINER_USER_ROLE_READ_WRITE,
  OBJECT_CONTAINER_USER_ROLE_READ_ONLY,
  OBJECT_CONTAINER_USER_ROLE_DENY,
];
