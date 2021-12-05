import { getToken } from '../../services/Auth.js';
import axios from 'axios';

export const buscarTodos = async () => {
  const request_config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/manutencoes`
  return axios.get(
    url,
    request_config
  );
}

export const adicionar = async (manutencao) => {
  const request_config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/manutencoes`
  return axios.post(url, manutencao, request_config);
}

export const buscarPorId = async (idManutencao) => {
  const request_config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/manutencoes/${idManutencao}`
  return axios.get(
    url,
    request_config
  ); 
}

export const apagar = async (idManutencao) => {
  const request_config = {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/manutencoes/${idManutencao}`;
  return axios.delete(url, request_config);
}

export const alterar = async (manutencao) => {
  const request_config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }
  const url = `${process.env.REACT_APP_ATIVOS_SERVICE_URL}/api/manutencoes/${manutencao.id}`
  return axios.put(url, manutencao, request_config);
}
