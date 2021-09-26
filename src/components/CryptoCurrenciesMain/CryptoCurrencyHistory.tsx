import React from 'react'
import { useTranslation } from 'react-i18next'

const CryptoCurrencyHistory = () => {
    const { t } = useTranslation();
    return (
        <div className='crypto-currency-history font-size-15 background-color-gray padding-10 margin-20 box-shadow center'>
            <div className="font-size-16">
                {t("Crypto History.")}
            </div>
        </div>
    )
}

export default CryptoCurrencyHistory
