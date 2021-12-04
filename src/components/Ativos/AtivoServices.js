import { getToken } from '../../services/Auth.js';
import axios from 'axios';

export const buscarAtivos = async () => {
  const request_config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/ativos`
  return axios.get(
    url,
    request_config
  );
}

export const buscarAtivoPorId = async (idAtivo) => {
  const request_config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/ativos/${idAtivo}`
  return axios.get(
    url,
    request_config
  );
}

export const adicionarAtivo = async (ativo) => {
  const request_config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/ativos`
  return axios.post(url, ativo, request_config);
}

export const deleteAtivo = async (idAtivo) => {
  const request_config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/ativos/${idAtivo}`;
  return axios.delete(url, request_config);
}
