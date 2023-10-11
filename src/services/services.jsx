import { API_ROUTES, APP_ROUTES } from "../utils/constants";

export async function signInUser(body) {
  const dataJson = {
    email: body.username,
    password: body.password,
  };
  let isLoading = true;
  try {
    const response = await fetch(API_ROUTES.SIGN_IN, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    isLoading = false;
    return { data, isLoading };
  } catch (error) {
    console.error(`Connexion error: ${error.message}`);
    return { error };
  }
}

export async function getProfileFromAPI(token) {
  let isLoading = true;
  try {
    const response = await fetch(API_ROUTES.PROFILE, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    isLoading = false;
    return { data, isLoading };
  } catch (error) {
    console.error(`Connexion error: ${error.message}`);
    return { error };
  }
}

export async function editProfileFromAPI(token, newDataUser) {
  let isLoading = true;
  try {
    const response = await fetch(API_ROUTES.PROFILE, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newDataUser),
    });

    // Si il y a une erreur d'autorisation:
    // le storage et les states redux sont vidés
    // pui on retourne sur la page de connexion
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    isLoading = false;
    return { data, isLoading };
  } catch (error) {
    console.error(`Connexion error: ${error.message}`);
    return { error };
  }
}
