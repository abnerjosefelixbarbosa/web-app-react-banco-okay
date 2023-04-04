
import { Customer } from './../models/Customer';

export const checkFormLogin = (customer: Customer) => {
  if (customer.cpf === "") 
    return "cpf invalido";
  if (customer.password === "") 
    return "senha invalido";

  return "login verificado";
};
