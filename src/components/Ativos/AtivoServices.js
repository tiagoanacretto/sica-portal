import { getToken } from '../../services/Auth.js';
import axios from 'axios';

const request_config = {
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
};

export const buscarAtivos = async () => {
  return axios.get(
    'http://localhost:8080/api/ativos',
    request_config
  );
}

export const adicionarAtivo = async (ativo) => {
  const url = `http://localhost:8080/api/ativos`;
  return axios.post(url, ativo, request_config);
}
