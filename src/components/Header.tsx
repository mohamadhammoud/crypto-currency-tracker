import { Col, Row, Select } from 'antd'
import React from 'react'
import { useTranslation, Trans } from 'react-i18next';

interface IProps {
    countOfCryptoCurrencies: number;
    sumOfMarketCap: number;
    sumOf24hVol: number;
}

const Header = (props: IProps) => {
    const { t, i18n } = useTranslation();

    const changeLanguageHandler = (lang: string) => {
        i18n.changeLanguage(lang);
    }

    const { Option, OptGroup } = Select;

    return (
        <Row justify='start' className='font-size-15 background-color-gray padding-10 margin-20 box-shadow center'>
            <Col md={{ span: 4 }} xs={{ span: 24 }}> <span className='header-label'> {t("Cryptos")} </span> : <span className='color-blue'> {props.countOfCryptoCurrencies.toLocaleString("en-US")} </span> </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}> <span className='header-label'> {t("Market Cap")} </span> : <span className='color-blue'> ${props.sumOfMarketCap.toLocaleString("en-US")} </span></Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}> <span className='header-label'> {t("24h Vol")}</span> : <span className='color-blue'> ${props.sumOf24hVol.toLocaleString("en-US")} </span></Col>
            <Col flex='auto' md={{ offset: 3, span: 4 }} xs={{ span: 24 }}>
                <Select bordered={false}
                    className='header-selection'
                    style={{ width: 150 }}
                    defaultValue={i18n.language}
                    onChange={(value: string) => { changeLanguageHandler(value) }}>
                    <Option value="en"> {t("English")} </Option>
                    <Option value="fr"> {t("French")} </Option>
                </Select>
            </Col>
        </Row>
    )
}

export default Header
