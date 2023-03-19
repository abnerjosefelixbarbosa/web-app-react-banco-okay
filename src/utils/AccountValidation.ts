
export const AccountValidation = () => {
    const login = (pCpf: any, pPassword: any) => {
        if (pCpf === "") {
            return "cpf obrigatório"
        }
        if (pPassword === "") {
            return "senha obrigatória"
        }

        return ""
    }

    return {
        login
    }
}