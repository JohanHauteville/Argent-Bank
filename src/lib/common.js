export function getFromLocalStorage(item) {
  return localStorage.getItem(item);
}

export function getFromSessionStorage(item) {
  return sessionStorage.getItem(item);
}

export function getAuthenticateUser() {
  const defaultReturnObject = { authenticated: false, user: null };

  try {
    let userData = JSON.parse(getFromLocalStorage("userData"));
    if (!userData) {
      console.log("pas de local, tentative session");
      userData = JSON.parse(getFromSessionStorage("userData"));
    }

    const token = userData.data.token;
    const email = userData.data.email;
    console.log("LocalStorage / SessionStorage Récupéré");
    return { authenticated: true, user: { email, token } };
  } catch (error) {
    // console.log("getAuthenticatedUser, Erreur lors de la récupération", error);
    console.log("Pas de LocalStorage / SessionStorage");
    return defaultReturnObject;
  }
}
