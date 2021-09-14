import { CryptoCurrencuEnum, IAddCryptoAction, ICrypto } from "../actions.ts/actions"


export const addCryptoCurrency = (currency: ICrypto): IAddCryptoAction => {
    return {
        type: CryptoCurrencuEnum.ADD_CRYPTOCURRENCY,
        payload: currency
    }
}