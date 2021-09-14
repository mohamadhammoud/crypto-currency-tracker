import axios from "axios";

export const crypto = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3'
});

export const getAllCoins = async () => {
    try {
        const response = await crypto.get('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
        return [null, response.data];
    } catch (error) {
        return [error, null];
    }
}

export const getChartOf7Days = async (coinId: string, currency: string, numberOfDays: number) => {
    try {
        const response = await crypto.get(`/coins/${coinId}/market_chart?vs_currency=${currency}&days=${numberOfDays}`);
        return [null, response.data];
    } catch (error) {
        return [error, null];
    }
}

export const getDescription = async (coinId: string) => {
    try {
        const response = await crypto.get(`/coins/${coinId}?localization=true`);
        return [null, response.data];
    } catch (error) {
        return [error, null];
    }
}

