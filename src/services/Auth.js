
export const TOKEN_KEY = "@sica-Token";

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const autenticaUsuario = async (loginDto) => {
  const response = await chamarLogin(loginDto);
  if (response && response.accessToken) {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    return true;
  } else {
    return false;
  }
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}

const chamarLogin = async (loginDto) => {
  return fetch('http://localhost:8081/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDto)
    })
    .then(data => data.json())
    .catch(err => err)
  }