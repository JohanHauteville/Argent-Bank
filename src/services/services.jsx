import { API_ROUTES } from "../utils/constants";

// Fonction de connexion de l'utilisateur via l'API
export async function signInUser(body) {
  const dataJson = {
    email: body.username,
    password: body.password,
  };
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
    return { data };
  } catch (error) {
    console.error(`Connexion error: ${error.message}`);
    return { error };
  }
}

// Fonction de recupération du profil de l'utilisateur via l'API
export async function getProfileFromAPI(token) {
  try {
    const response = await fetch(API_ROUTES.PROFILE, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`Connexion error: ${error.message}`);
    return { error };
  }
}

// Fonction de modification du profil de l'utilisateur via l'API
export async function editProfileFromAPI(token, newDataUser) {
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
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`Connexion error: ${error.message}`);
    return { error };
  }
}
