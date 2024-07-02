import React from 'react'

const ExpenseDetails = () => {
    let publicUrl = process.env.PUBLIC_URL + '/'

    const data = [
        {
            date: "1-july-2024",
            total: 20000,
            spend: 2000,
            balance: 18000,
            transactions: [
                {
                    reason: "petorl",
                    debitorcredit: "debit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "credit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "debit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "debit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "credit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                }
            ]
        },
        {
            date: "2-july-2024",
            total: 18000,
            spend: 2000,
            balance: 18000,
            transactions: [
                {
                    reason: "petorl",
                    debitorcredit: "debit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "debit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "debit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "debit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                },
                {
                    reason: "petorl",
                    debitorcredit: "credit",
                    rupees: "1000",
                    time: "1-july-2024 11:58 am"
                }
            ]
        }
    ]

    return (
        <section>
            <div className="ltn__page-details-area ltn__service-details-area mb-105">
                <div className="container py-5">
                    <div className="row shadow">
                        <div class="card w-100 shadow">
                            <div class="card-body">
                                <div className="col-12 d-inline-flex align-items-center  p-0">
                                    <div className="col-5 col-lg-3 px-0">
                                        <img src={publicUrl + "assets/img/slider/21.jpg"} alt="truck" className='rounded' />
                                    </div>
                                    <div className="col-7 col-lg-9 px-0">
                                        <h5 class="card-title">Load one</h5>

                                        <p class="card-text mb-1 d-inline-flex p-0 w-100">
                                            <b className='px-0'>From :</b>
                                            <span className='px-0 ps-2 text-break'>Tenkasi,india</span>
                                        </p>

                                        <p class="card-text mb-1 d-inline-flex p-0 w-100">
                                            <b className='px-0'>To :</b>
                                            <span className='px-0 ps-2 text-break'>Coimbatore,india</span>
                                        </p>

                                        <p class="card-text mb-1">
                                            <b>Load price :</b>
                                            <span className='ps-2'>20000</span>
                                        </p>

                                        <p class="card-text mb-1">
                                            <b>Spend :</b>
                                            <span className='ps-2'>2000</span>
                                        </p>

                                        <p class="card-text mb-1">
                                            <b>Balance :</b>
                                            <span className='ps-2'>18000</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 p-0 mt-3">
                                    <div className="border rounded p-3" >
                                        {
                                            data.map((datas, index) => {
                                                return <div className='border-bottom' key={index}>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3">
                                                            <p>{datas.date}</p>
                                                            <p class="card-text mb-1">
                                                                <b>Total amount :</b>
                                                                <span className='ps-2'>{datas.total}</span>
                                                            </p>

                                                            <p class="card-text mb-1">
                                                                <b>Today spend :</b>
                                                                <span className='ps-2'>{datas.spend}</span>
                                                            </p>

                                                            <p class="card-text mb-1">
                                                                <b>Current balance :</b>
                                                                <span className='ps-2'>{datas.balance}</span>
                                                            </p>
                                                        </div>
                                                        <div className="col-9">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">S.no</th>
                                                                        <th scope="col">Reason</th>
                                                                        <th scope="col">Debit/Credit</th>
                                                                        <th scope="col">rupees</th>
                                                                        <th scope="col">Time</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        datas.transactions.map((transactions,index)=>{
                                                                            return  <tr>
                                                                            <th scope="row">{index+1}</th>
                                                                            <td>{transactions.reason}</td>
                                                                            <td>{transactions.debitorcredit}</td>
                                                                            <td className={`${transactions.debitorcredit==="credit" ? "text-success" : "text-danger"}`}>{transactions.rupees}</td>
                                                                            <td>{transactions.time}</td>
                                                                        </tr>
                                                                        })
                                                                    } 
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExpenseDetails