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
      // Aucune données dans le LocalStorage, tentative de récupération dans le SessionStorage
      userData = JSON.parse(getFromSessionStorage("userData"));
      if (!userData) {
        // Aucune données dans le SessionStorage non plus, alors on retourne l'objet vide
        return defaultReturnObject;
      }
    }
    const token = userData.data.token;
    const email = userData.data.email;
    // Donnée depuis le LocalStorage / SessionStorage récupérées
    return { authenticated: true, user: { email, token } };
  } catch (error) {
    // Erreur lors de la récupération
    return defaultReturnObject;
  }
}
