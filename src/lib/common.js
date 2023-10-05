export function getFromLocalStorage(item) {
  return localStorage.getItem(item);
}

export function getFromSessionStorage(item) {
  return sessionStorage.getItem(item);
}

export function getUserStorage() {
  // Objet de retour par défaut
  const defaultReturnObject = { authenticated: false, user: null };

  try {
    let userData = JSON.parse(getFromLocalStorage("userData"));
    if (!userData) {
      console.log("pas de local, tentative session");
      // Si aucune donnée dans le LocalStorage, tentative de récupération dans le SessionStorage
      console.log("Pas de LocalStorage / SessionStorage");
      userData = JSON.parse(getFromSessionStorage("userData"));
      if (!userData) {
        // Si aucune donnée dans le SessionStorage non plus, alors on retourne l'objet vide
        return defaultReturnObject;
      }
    }
    console.log("=====userData=====");
    console.log(userData);
    const token = userData.data.token;
    const email = userData.data.email;
    console.log("LocalStorage / SessionStorage Récupéré");
    return { authenticated: true, user: { email, token } };
  } catch (error) {
    console.log("getAuthenticatedUser, Erreur lors de la récupération", error);
    return defaultReturnObject;
  }
}
