
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router';
import { getChartOf7Days, getDescription } from '../apis/crypto-currency-api';
import { ICrypto } from '../Redux/actions.ts/actions';
import { Line } from "react-chartjs-2";
import { Button, Col, Row } from 'antd';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface IProps {
    currency: ICrypto;
}

const ViewChart_ = ({ currency }: IProps) => {

    const { t } = useTranslation();
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [desc, setDesc] = useState("");

    const history = useHistory();

    const sendingChartRequest = async () => {
        if (currency.name === "") {
            history.push('/');
            return;
        }
        const [error, chartData] = await getChartOf7Days(currency.id, "usd", 7);
        if (!error) {
            let x: any = [];
            let y: any = [];
            chartData.prices.map((price: any) => {
                const splitDate = new Date(price[0]).toUTCString().split(" ");
                x.push(`${splitDate[1]} ${splitDate[2]}`);
                y.push(Number(price[1]).toFixed(0));
            });
            setLabels((labels) => x);
            setData((data) => y)
        }
        //notification.error()
    }

    const description = async (id: string) => {
        if (id !== "") {
            const [error, response] = await getDescription(id);
            if (!error) {
                if (response.description.en) {
                    setDesc(response.description.en)
                }
            }
        }

    }
    useEffect(() => {
        sendingChartRequest();
        description(currency.id);
    }, []);

    const config: any = {
        labels: [...labels],
        datasets: [
            {
                label: `${currency.name} ${t("Currency Chart")}`,
                data: [...data],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.5)",
                borderColor: "rgba(75,192,192,1)",
                pointStyle: "line",

            },
        ]
    }

    const options = {
        //   maintainAspectRatio: false,
        scales: {
            // y: {
            //     beginAtZero: true
            // }

        },
    };
    return <>
        <Row justify="center">
            <Col
                xl={{ span: 16 }}
                xs={{ span: 22 }}
                className="font-size-15 background-color-gray margin-20 box-shadow"
                style={{ width: 400 }}
            >
                <Line
                    translate={undefined}
                    data={config}
                    options={options}
                />
            </Col>
            <Col
                xl={{ span: 6 }}
                xs={{ span: 22 }}

            >
                <div className="font-size-15 background-color-gray padding-10 margin-20 box-shadow">

                    <Row style={{ color: "#58667e", fontSize: 24 }}>
                        {currency.name} {t("Price Statistics")}
                    </Row>
                    <Row style={{ color: "#58667e", fontSize: 14 }} className="bordered padding-10">
                        {t("Bitcoin Price Today")}
                    </Row>

                    <Row className="bordered padding-10">
                        <Col span={12} style={{ color: "#58667e", fontSize: 14 }} >
                            <div style={{ paddingTop: 10 }}>
                                {t("Price Change 24h")}
                            </div>
                        </Col>
                        <Col span={12} className="right">
                            <div>
                                $ {currency.price_change_24h.toLocaleString('en-US')} <br />
                                {currency.price_change_percentage_24h < 0 ? <span style={{ color: "#ea3943" }}><CaretDownFilled translate={undefined} />{currency.price_change_percentage_24h.toFixed(2).toLocaleString()}%</span> :
                                    <span style={{ color: "#16c784" }}><CaretUpFilled translate={undefined} /> {currency.price_change_percentage_24h.toFixed(2).toLocaleString()}%</span>}
                            </div>

                        </Col>
                    </Row>
                    <Row className="bordered padding-10">
                        <Col span={12} style={{ color: "#58667e", fontSize: 14 }} >
                            <div>
                                {t("24h Low / 24h High")}
                            </div>
                        </Col>
                        <Col span={12} className="right">
                            <div>
                                ${currency.high_24h.toLocaleString('en-US')} / ${currency.low_24h.toLocaleString('en-US')}
                            </div>

                        </Col>
                    </Row>
                    <Row className="bordered padding-10">
                        <Col span={12} style={{ color: "#58667e", fontSize: 14 }}>
                            <div>
                                {t("Market Rank")}
                            </div>
                        </Col>
                        <Col span={12} className="right">
                            <div>
                                #{currency.market_cap_rank}
                            </div>

                        </Col>
                    </Row>
                    <Row className="bordered padding-10">
                        <Col span={12} style={{ color: "#58667e", fontSize: 14 }}>
                            <div style={{ paddingTop: 10 }}>
                                {t("Market Cap")}
                            </div>
                        </Col>
                        <Col span={12} className="right">

                            $ {currency.market_cap.toLocaleString('en-US')}
                            <br />
                            <div>
                                {currency.market_cap_change_percentage_24h < 0 ? <span style={{ color: "#ea3943" }}><CaretDownFilled translate={undefined} />{currency.market_cap_change_percentage_24h.toFixed(2).toLocaleString()}%</span> :
                                    <span style={{ color: "#16c784" }}><CaretUpFilled translate={undefined} /> {currency.market_cap_change_percentage_24h.toFixed(2).toLocaleString()}%</span>}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="font-size-15 background-color-gray padding-10 margin-20 box-shadow">
                    <Row className="bordered padding-10">
                        <Col span={12}>
                            <img src={currency.image} height={24} width={24} alt="" /> &nbsp;
                            {currency.name} ({currency.symbol})
                        </Col>
                        <Col span={12} >
                            <div className="right">
                                {currency.market_cap_rank}
                            </div>
                        </Col>
                    </Row>
                    <Row className="bordered padding-10">
                        <Col span={16}>
                            <img src={`https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg`} height={24} width={24} alt="" /> &nbsp;
                            {t("USD (United States)")}
                        </Col>
                        <Col span={8} >
                            <div className="right">
                                $ {currency.current_price.toLocaleString('en-US')}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="font-size-15 background-color-gray padding-10 margin-20 box-shadow">
                    <Row className="bordered padding-10">

                        <Button type="primary"
                            shape="round"
                            onClick={() => history.push('/')}
                            style={{ width: "100%", backgroundColor: "rgba(75,192,192,0.9)" }}
                        >
                            {t("Go Back")}
                        </Button>
                    </Row>

                </div>
            </Col>
        </Row>
        <Row
            className="font-size-15 background-color-gray padding-10 margin-20 box-shadow"
        >
            <div className="font-size-30">
                {currency.name} <img src={currency.image} height={30} width={30} alt="" /> :
            </div>
            <div dangerouslySetInnerHTML={{ __html: desc }} />
        </Row>
    </>
}

const mapStateToProps = (state: ICrypto) => {

    return {
        currency: {
            ...state
        }
    }
}
const ViewChart = connect(mapStateToProps)(ViewChart_)
export default ViewChart


// import {Pie, Doughnut} from 'react-chartjs-2';

// const state = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'Rainfall',
//       backgroundColor: [
//         '#B21F00',
//         '#C9DE00',
//         '#2FDE00',
//         '#00A6B4',
//         '#6800B4'
//       ],
//       hoverBackgroundColor: [
//       '#501800',
//       '#4B5000',
//       '#175000',
//       '#003350',
//       '#35014F'
//       ],
//       data: [65, 59, 80, 81, 56]
//     }
//   ]
// }

// export default class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Pie
//           data={state}
//           options={{
//             title:{
//               display:true,
//               text:'Average Rainfall per month',
//               fontSize:20
//             },
//             legend:{
//               display:true,
//               position:'right'
//             }
//           }}
//         />

//         <Doughnut
//           data={state}
//           options={{
//             title:{
//               display:true,
//               text:'Average Rainfall per month',
//               fontSize:20
//             },
//             legend:{
//               display:true,
//               position:'right'
//             }
//           }}
//         />
//       </div>
//     );
//   }
// }