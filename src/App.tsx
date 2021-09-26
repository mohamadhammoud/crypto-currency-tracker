import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { getAllCoins } from "./apis/crypto-currency-api";
import CryptoCurrenciesTable from "./components/CryptoCurrenciesMain/CryptoCurrenciesTable";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewChart from "./components/ViewChart";
import { useTranslation } from "react-i18next";
import CryptoCurrencyHistory from "./components/CryptoCurrenciesMain/CryptoCurrencyHistory";

const App: React.FC = () => {
  const { t } = useTranslation();

  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [searchedCryptoCurrencies, setSearchedCryptoCurrencies] = useState([]);



  function setLocalStorage(key: any, value: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {

    }
  }

  function getLocalStorage(key: any, initialValue: any) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  }

  const [favoriteCryptoCurrencies, setFavoriteCryptoCurrencies] = useState(() => getLocalStorage("favorites", []));

  useEffect(() => {
    setLocalStorage("favorites", favoriteCryptoCurrencies);
  }, [favoriteCryptoCurrencies]);


  const [favoriteSearchedCryptoCurrencies, setSearchedFavoriteCryptoCurrencies] = useState([]);

  const [countOfCryptoCurrencies, setCountOfCryptoCurrencies] = useState(0);
  const [sumOfMarketCap, setSumOfMarketCap] = useState(0);
  const [sumOf24hVol, setSumOf24hVol] = useState(0);

  const searchingForNormalCryptoCurrencies = (value: string) => {
    if (cryptoCurrencies.length > 0) {
      const x = cryptoCurrencies.filter((currency: any) => {
        return currency.name.toLowerCase().includes(value.toLowerCase());
      });
      setSearchedCryptoCurrencies(x);
    }
  }


  const searchingForFavoriteCryptoCurrencies = (value: string) => {
    if (favoriteCryptoCurrencies.length > 0) {
      const x = favoriteCryptoCurrencies.filter((currency: any) => {
        return currency.name.toLowerCase().includes(value.toLowerCase());
      });
      setSearchedFavoriteCryptoCurrencies(x);
    }
  }

  const switching = (record: any) => {
    if (record) {
      const find = favoriteCryptoCurrencies.find(((currency: any) => currency.name === record.name));

      if (!find) {
        setFavoriteCryptoCurrencies((c: any) => {

          return [...favoriteCryptoCurrencies, record] as any
        });
        return
      }
      let x = favoriteCryptoCurrencies.filter((currency: any) => {
        return currency.name !== record.name
      });
      setFavoriteCryptoCurrencies((c: any) => {
        return x
      });
      if (favoriteSearchedCryptoCurrencies.length > 0) {
        let x = favoriteSearchedCryptoCurrencies.filter((currency: any) => {
          return currency.name !== record.name
        });
        setSearchedFavoriteCryptoCurrencies(x);
      }
    }
  }

  const sendingRequest = async () => {

    const [error, currenciesData] = await getAllCoins();
    if (currenciesData && currenciesData.length > 0) {
      setCryptoCurrencies(x => currenciesData);
      setCountOfCryptoCurrencies(x => currenciesData.length);

      const sumOf = (prop: string, array: []) => {
        return currenciesData.reduce((accumulator: number, array: any) => {
          return accumulator + Number(array[prop]);
        }, 0)
      }
      setSumOfMarketCap(sumOf("market_cap", currenciesData));
      setSumOf24hVol(sumOf("total_volume", currenciesData));

      return
    }
    //notification.error()
  }

  useEffect(() => {
    sendingRequest();

  }, []);


  return (
    <>
      <Router>
        <Header
          countOfCryptoCurrencies={countOfCryptoCurrencies}
          sumOfMarketCap={sumOfMarketCap}
          sumOf24hVol={sumOf24hVol}
        />
        <Switch>
          <Route path="/chart" exact>
            <ViewChart />
          </Route>
          <Route path="/" >

            <CryptoCurrencyHistory />

            <CryptoCurrenciesTable
              title={t("Favorite Crypto Currencies Menu")}
              cryptoCurrencies={favoriteSearchedCryptoCurrencies.length > 0 ? favoriteSearchedCryptoCurrencies : favoriteCryptoCurrencies}
              searchMethod={searchingForFavoriteCryptoCurrencies}
              switch={switching}
              kind="favorite"
              className="font-size-15 background-color-gray padding-10 margin-20 box-shadow"
            />
            <CryptoCurrenciesTable
              title={t("Crypto Currencies Menu")}
              cryptoCurrencies={searchedCryptoCurrencies.length > 0 ? searchedCryptoCurrencies : cryptoCurrencies}
              searchMethod={searchingForNormalCryptoCurrencies}
              switch={switching}
              kind="normal"
              className="font-size-15 background-color-gray padding-10 margin-left-20 margin-right-20 box-shadow"
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
