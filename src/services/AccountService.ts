import axios from "axios";
import { BASE_URL } from "../utils/request";
import { Customer } from "./../models/Customer";
import { Account } from "./../models/Account";

export const loginFormRequest = async (customer: Customer) => {
  return await axios
    .post(`${BASE_URL}/accounts/login-account-by-cpf-and-password`, customer)
    .then((response) => {
      const data: Account = { ...response.data };
      return data;
    })
    .catch((e) => {
      const data: string = e.response.data;
      return data;
    });
};
