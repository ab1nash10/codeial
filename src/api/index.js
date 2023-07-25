import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from '../utils';
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    customConfig.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error(error);
    return {
      message: error.message || 'Something went wrong',
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: {
      email,
      password,
    },
  });
};


export const register = (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    },
  });
}


export const editProfile = (userId ,name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: {
      id:userId,
      name,
      password,
      confirm_password: confirmPassword,
    },
  });
}



export const fetchUser = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};