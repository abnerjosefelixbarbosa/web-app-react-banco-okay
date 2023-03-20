import axios from "axios";

export const AccountService = () => {
  const URL = "http://localhost:8080";

  const login = async (pCpf: any, pPassword: any) => {
    return await axios
      .get(`${URL}/accounts/login/${pCpf}/${pPassword}`)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  };

  return {
    login,
  };
};
