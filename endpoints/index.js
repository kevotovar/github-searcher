export const BASE = `https://api.github.com/`;
export const SEARCH_USER = `${BASE}search/users`;
export const SEARCH_REPOSITORIES = `${BASE}search/repositories`;
export const USERS = `${BASE}users`;
export const USER = (userId) => `${USERS}/${userId}`;
export const USER_REPOSITORIES = (userId) => `${USER(userId)}/repos`;
export const REPOSITORIES = `${BASE}repos`;
export const REPOSITORY = (userId, repoId) =>
  `${REPOSITORIES}/${userId}/${repoId}`;
