import axios from 'axios';
import {
  SEARCH_USER,
  USER,
  USER_REPOSITORIES,
  REPOSITORY,
  SEARCH_REPOSITORIES,
} from '../endpoints';

export function searchUser({ q, per_page, page }) {
  return axios.get(SEARCH_USER, { params: { q, per_page, page } });
}

export function searchRepositories({ q, per_page, page }) {
  return axios.get(SEARCH_REPOSITORIES, { params: { q, per_page, page } });
}

export function fetchUserDetail(userId) {
  return axios.get(USER(userId));
}

export function fetchUserRepositories(userId, { per_page, sort, order } = {}) {
  return axios.get(USER_REPOSITORIES(userId), {
    params: { per_page, sort, order },
  });
}

export function fetchRepository(userId, repositoryId) {
  return axios.get(REPOSITORY(userId, repositoryId));
}
