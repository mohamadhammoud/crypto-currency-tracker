import { CryptoActions, CryptoCurrencuEnum, ICrypto } from "./actions.ts/actions";


export const initialState: ICrypto = {
    id: "",
    symbol: "",
    name: "",
    image: "",
    current_price: 0,
    market_cap: 0,
    market_cap_rank: 0,
    fully_diluted_valuation: 0,
    total_volume: 0,
    high_24h: 0,
    low_24h: 0,
    price_change_24h: 0,
    price_change_percentage_24h: 0,
    market_cap_change_24h: 0,
    market_cap_change_percentage_24h: 0,
    circulating_supply: 0,
    total_supply: 0,
    max_supply: 0,
    ath: 0,
    ath_change_percentage: 0,
    ath_date: "",
    atl: 0,
    atl_change_percentage: 0,
    atl_date: "",
    last_updated: ""
}

export const state = (state: ICrypto = initialState, action: CryptoActions): ICrypto => {
    switch (action.type) {
        case CryptoCurrencuEnum.ADD_CRYPTOCURRENCY:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

