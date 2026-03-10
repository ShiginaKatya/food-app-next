const STRAPI_URL = 'https://front-school-strapi.ktsdev.ru/api';

type AuthResponse = {
  jwt: string;
};

type ApiError = {
  error?: {
    message: string;
  };
};
export const getJWT = async (): Promise<AuthResponse> => {
  const login = await fetch(`${STRAPI_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: 'shigina@test.com',
      password: 'testShiginaStrapi',
    }),
  });
  if (login.ok) {
    return login.json() as Promise<AuthResponse>;
  }
  if (login.status === 400) {
    const register = await fetch(`${STRAPI_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'ShiginaKatya',
        email: 'shigina@test.com',
        password: 'testShiginaStrapi',
      }),
    });
    if (register.ok) {
      return register.json() as Promise<AuthResponse>;
    }
    const errorData: ApiError = await register.json();
    throw new Error(errorData.error?.message || 'Registration failed');
  }
  throw new Error(`Auth failed with status ${login.status}`);
};
