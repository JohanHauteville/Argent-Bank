import { useQuery } from "react-query";

export async function signInUser(body) {
  const dataJson = {
    email: body.username,
    password: body.password,
  };
  let isLoading = true;
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
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
    console.log(data);
    return { data, isLoading };
  } catch (error) {
    // console.error(`Connexion error: ${error.message}`);
    return { error };
  }
}
