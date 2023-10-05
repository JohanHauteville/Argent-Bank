const API_URL = "http://localhost:3001";

export const API_ROUTES = {
  SIGN_IN: `${API_URL}/api/v1/user/login`,
  PROFILE: `${API_URL}/api/v1/user/profile`,
};

export const APP_ROUTES = {
  HOME: `/`,
  SIGN_IN: `/login/`,
  PROFILE: `/profile/`,
};

export const STORAGE = "userData";
