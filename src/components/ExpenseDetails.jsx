import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseDetails = () => {
    let publicUrl = process.env.PUBLIC_URL + '/';

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCashFlowDetails = async () => {
            try {
                const response = await axios.post('https://truck.truckmessage.com/get_load_trip_cash_flow', {
                    load_trip_id: '5'
                });
                
                const fetchedData = response.data.data.map(item => ({
                    date: new Date(item.updt).toLocaleDateString(),
                    total: item.amount,
                    spend: item.cash_flow_type === 'OUT' ? item.amount : 0,
                    balance: item.closing_balance,
                    transactions: [
                        {
                            reason: item.cash_flow_name,
                            description: item.category,
                            debitorcredit: item.cash_flow_type === 'IN' ? 'credit' : 'debit',
                            rupees: item.amount,
                            time: new Date(item.updt).toLocaleString()
                        }
                    ]
                }));

                // Group transactions by date
                const groupedData = fetchedData.reduce((acc, current) => {
                    if (!acc[current.date]) {
                        acc[current.date] = {
                            date: current.date,
                            total: current.total,
                            spend: current.spend,
                            balance: current.balance,
                            transactions: []
                        };
                    }
                    acc[current.date].transactions.push(...current.transactions);
                    return acc;
                }, {});

                setData(Object.values(groupedData));
            } catch (error) {
                console.error('Error fetching cash flow details:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchCashFlowDetails();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section>
            <div className="ltn__page-details-area ltn__service-details-area mb-105">
                <div className="container py-5">
                    <div className="row shadow">
                        <div className="card w-100 shadow">
                            <div className="card-body">
                                <div className="col-12 d-inline-flex align-items-center p-0">
                                    <div className="col-5 col-lg-3 px-0">
                                        <img src={publicUrl + "assets/img/slider/21.jpg"} alt="truck" className='rounded' />
                                    </div>
                                    <div className="col-7 col-lg-9 px-0">
                                        <h5 className="card-title">Load one</h5>

                                        <p className="card-text mb-1 d-inline-flex p-0 w-100">
                                            <b className='px-0'>From :</b>
                                            <span className='px-0 ps-2 text-break'>Tenkasi, India</span>
                                        </p>

                                        <p className="card-text mb-1 d-inline-flex p-0 w-100">
                                            <b className='px-0'>To :</b>
                                            <span className='px-0 ps-2 text-break'>Coimbatore, India</span>
                                        </p>

                                        <p className="card-text mb-1">
                                            <b>Load price :</b>
                                            <span className='ps-2'>20000</span>
                                        </p>

                                        <p className="card-text mb-1">
                                            <b>Spend :</b>
                                            <span className='ps-2'>2000</span>
                                        </p>

                                        <p className="card-text mb-1">
                                            <b>Balance :</b>
                                            <span className='ps-2'>18000</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 p-0 mt-3">
                                    <div className="border rounded p-3">
                                        {data.map((entry, index) => (
                                            <div className='border-bottom' key={index}>
                                                <div className="row">
                                                    <div className="col-12 col-lg-3">
                                                        <h5>{entry.date}</h5>
                                                        <p className="card-text mb-1">
                                                            <b>Total amount :</b>
                                                            <span className='ps-2'>{entry.total}</span>
                                                        </p>

                                                        <p className="card-text mb-1">
                                                            <b>Today spend :</b>
                                                            <span className='ps-2'>{entry.spend}</span>
                                                        </p>

                                                        <p className="card-text mb-1">
                                                            <b>Current balance :</b>
                                                            <span className='ps-2'>{entry.balance}</span>
                                                        </p>
                                                    </div>
                                                    <div className="col-9">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">S.no</th>
                                                                    <th scope="col">Reason</th>
                                                                    <th scope="col">Description</th>
                                                                    <th scope="col">Debit/Credit</th>
                                                                    <th scope="col">Rupees</th>
                                                                    <th scope="col">Time</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {entry.transactions.map((transaction, index) => (
                                                                    <tr key={index}>
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td>{transaction.reason}</td>
                                                                        <td>{transaction.description}</td>
                                                                        <td>{transaction.debitorcredit}</td>
                                                                        <td className={`${transaction.debitorcredit === "credit" ? "text-success" : "text-danger"}`}>{transaction.rupees}</td>
                                                                        <td>{transaction.time}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExpenseDetails;
