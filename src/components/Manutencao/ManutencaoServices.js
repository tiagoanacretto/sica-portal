import { getToken } from '../../services/Auth.js';
import axios from 'axios';

export const buscarTodos = async () => {
  const request_config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/manutencoes`
  return axios.get(
    url,
    request_config
  );
}