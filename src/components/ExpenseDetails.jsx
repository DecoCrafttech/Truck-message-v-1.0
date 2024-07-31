import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


const ExpenseDetails = () => {
    const params = useParams()
    const userId = window.atob(Cookies.get("usrin"));
    const pageRender = useNavigate()

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ cash_flow_name: '', category: '', cash_flow_type: 'IN', amount: '' });
    const [modalTitle, setModalTitle] = useState('Credit Entry');

    const fetchCashFlowDetails = async () => {
        if (userId && params.id) {
            try {
                const response = await axios.post('https://truck.truckmessage.com/get_load_trip_cash_flow', {
                    user_id: userId,
                    load_trip_id: params.id
                });

                console.log(response)
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
        }
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://truck.truckmessage.com/load_trip_cash_flow_entry', {
                load_trip_id: '4',
                ...form
            });
            fetchCashFlowDetails(); // Refresh the data after submission
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleModalOpen = (type) => {
        setModalTitle(type === 'IN' ? 'Credit Entry' : 'Debit Entry');
        setForm({ ...form, cash_flow_type: type });
    };

    useEffect(() => {
        fetchCashFlowDetails();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section>
            <div className="ltn__page-details-area ltn__service-details-area mb-105">
                <div className="container py-5">
                    <div className='my-4'>
                        <button type='button' className='btn btn-primary col-12 col-md-4 col-lg-2 col-xl-1' onClick={() => pageRender('/expense-calculator')}>Back</button>
                    </div>
                    <div className="row shadow">
                        <div className="card w-100 shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mt-3 mb-3 gap-2">
                                    <button type="button" className="btn btn-success h-100" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={() => handleModalOpen('IN')}>Credit</button>
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalForm" onClick={() => handleModalOpen('OUT')}>Debit</button>
                                </div>
                                <div className="col-12 d-inline-flex align-items-center p-0">
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



            {/* Modal Form */}
            <div className="modal fade" id="modalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Name</h5>
                                        <div className="input-item input-item-name">
                                            <input
                                                type="text"
                                                name="cash_flow_name"
                                                value={form.cash_flow_name}
                                                onChange={handleFormChange}
                                                placeholder="Enter your trip name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Reason</h5>
                                        <div className="input-item input-item-name">
                                            <select
                                                className="nice-select ltn__custom-icon"
                                                name="category"
                                                value={form.category}
                                                onChange={handleFormChange}
                                                required
                                            >
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Food">Food</option>
                                                <option value="Tea">Tea</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Description</h5>
                                        <div className="input-item input-item-name">
                                            <input
                                                type="text"
                                                name="description"
                                                value={form.description}
                                                onChange={handleFormChange}
                                                placeholder="Enter your Details"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Amount</h5>
                                        <div className="input-item input-item-name">
                                            <input
                                                type="text"
                                                name="amount"
                                                value={form.amount}
                                                onChange={handleFormChange}
                                                placeholder="Enter your Amount"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpenseDetails;
