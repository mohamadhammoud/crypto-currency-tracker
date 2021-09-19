import { Input, Table, Tooltip, Button, Row, Col } from 'antd';
import React from 'react'
import { CaretDownFilled, CaretUpFilled, InfoCircleFilled, SignalFilled, StarOutlined } from "@ant-design/icons"
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCryptoCurrency } from '../Redux/actionTypes/actionTypes';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


interface IProps {
    title: string;
    cryptoCurrencies: any;
    className: string;
    kind: string;
    switch: (record: any) => void;
    searchMethod: (value: string) => void
}

const CryptoCurrenciesTable = (props: IProps) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const columns = [
        {
            title: '',
            dataIndex: 'switch',
            key: 'switch',
            align: 'center',
            width: 50,
            render: (value: any, record: any) =>
                <Button type="primary"
                    shape="round"
                    onClick={() => props.switch(record)}>
                    {props.kind === "normal" ? <> {t("Switch to/from favorite list")} </> : <> {t("Delete")} </>}
                </Button>,

        },
        {
            title: '#',
            dataIndex: 'market_cap_rank',
            key: 'market_cap_rank',
            align: 'center',
            render: (value: any, record: any) =>
                <span style={{ color: "#58667e" }}> {value}</span>,
            sorter: (a: any, b: any) => a.market_cap_rank - b.market_cap_rank,
        },
        {
            title: `${t("Name")}`,
            dataIndex: 'name',
            key: 'name',
            render: (value: number, row: any) => <>
                <Row justify="start" style={{ width: 450 }}>
                    <Col xs={{ span: 11 }}>
                        {
                            row.image ?
                                <> <img src={row.image} alt="image" className="img-table-crypto-currency" /> &nbsp;</>
                                : <span></span>
                        }
                        {value}
                    </Col>
                    <Col xs={{ span: 3 }}>
                        <span style={{ color: "rgb(128, 138, 157)" }}>
                            {row.symbol.toUpperCase()}
                        </span>
                    </Col>
                    <Col xs={{ span: 10 }}>
                        <Button
                            type="primary"
                            shape="round"
                            //   style={{ paddingle: 0 }}
                            onClick={() => {
                                dispatch(addCryptoCurrency(row));
                                history.push('/chart');
                            }}
                            icon={<SignalFilled translate={undefined} />}>
                            {t("Go to Chart")}
                        </Button>
                    </Col>
                </Row>

            </>,
            sorter: (a: any, b: any) => a.name - b.name,
        },
        {
            title: `${t("Price")}`,
            dataIndex: 'current_price',
            key: 'current_price',
            align: 'center',
            render: (value: number, row: any) => <div style={{ width: 100 }}> $ {value.toFixed(2).toLocaleString()}</div>,
            sorter: (a: any, b: any) => a.current_price - b.current_price,
        },
        {
            title: '24 %',
            dataIndex: 'price_change_percentage_24h',
            key: 'price_change_percentage_24h',
            width: 120,
            align: 'center',
            // #ea3943
            //   #16c784
            render: (value: number, row: any) =>
                <div style={{ width: 75 }}>
                    {value < 0 ? <span style={{ color: "#ea3943" }}><CaretDownFilled translate={undefined} />{value.toFixed(2).toLocaleString()}%</span> :
                        <span style={{ color: "#16c784" }}><CaretUpFilled translate={undefined} /> {value.toFixed(2).toLocaleString()}%</span>
                    }  </div>,
            sorter: (a: any, b: any) => a.price_change_percentage_24h - b.price_change_percentage_24h,
        },
        {
            title: <span>{t("Market Cap")} &nbsp;
                <Tooltip
                    title={t(`The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. Market Cap = Current Price x Circulating Supply.`)}
                >
                    <InfoCircleFilled translate={undefined} />
                </Tooltip></span>,
            dataIndex: 'market_cap',
            key: 'market_cap',
            align: 'center',
            render: (value: number, row: any) => <div style={{ width: 220 }}> $ {value}</div>,
            sorter: (a: any, b: any) => a.market_cap - b.market_cap,
        },
        {
            title: <span>{t("Volume(24h)")} &nbsp;
                <Tooltip
                    title={t(`A measure of how much of a cryptocurrency was traded in the last 24 hours.`)}
                >
                    <InfoCircleFilled translate={undefined} />
                </Tooltip></span>,
            dataIndex: 'total_volume',
            key: 'total_volume',
            align: 'center',
            render: (value: number, row: any) => <div style={{ width: 150 }}> $ {value}</div>,
            sorter: (a: any, b: any) => a.total_volume - b.total_volume,
        },
        {
            title: <span>{t("Circulating Supply")} &nbsp;
                <Tooltip
                    title={t(`The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.`)}
                >
                    <InfoCircleFilled translate={undefined} />
                </Tooltip></span>,
            dataIndex: 'circulating_supply',
            key: 'circulating_supply',
            align: 'center',
            render: (value: number, row: any) => <div style={{ width: 240 }}> $ {value}</div>,
            sorter: (a: any, b: any) => a.circulating_supply - b.circulating_supply,
        },
    ] as any;

    return (
        <>

            <div className={props.className}>
                <div className="margin-top-10 margin-bottom-10">
                    <span className='header-label'> {props.title}:</span>
                    <Input onChange={(e: any) => {
                        props.searchMethod(e.target.value);
                    }} style={{ width: 250, borderRadius: 30 }} />
                </div>
                <Table
                    scroll={{ x: 1600 }}
                    dataSource={props.cryptoCurrencies}
                    columns={columns}
                    bordered={true}
                    pagination={{ pageSize: 8 }}
                    rowKey={(x: any) => x.id}
                />
            </div>
        </>
    )

}

export default CryptoCurrenciesTable
