import { getStorage } from "../features/user";
import store from "../store/store"; // Importez la fonction getStorage de votre code

async function checkAuthentication(dispatch) {
  // Appelez la fonction getStorage pour récupérer les informations d'authentification
  const { token, email, storage, isConnected } = await getStorage();

  // Mettez à jour le state Redux avec les informations récupérées
  dispatch({
    type: "user/signIn", // Utilisez le type d'action approprié
    payload: {
      token,
      email,
      storage,
      isConnected,
    },
  });
}

export default checkAuthentication;
