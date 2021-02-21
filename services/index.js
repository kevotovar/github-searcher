import axios from 'axios';
import { SEARCH_USER } from '../endpoints';

export function searchUser({ q, per_page, page }) {
  return axios.get(SEARCH_USER, { params: { q, per_page, page } });
}
