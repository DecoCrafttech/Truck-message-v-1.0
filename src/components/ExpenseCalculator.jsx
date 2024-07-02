import React from 'react'
import { Link } from 'react-router-dom'

export const ExpenseCalculator = () => {
    let publicUrl = process.env.PUBLIC_URL + '/'

    const dummy = [1, 2, 3, 4, 5]

    return (
        <section>
            <div className="ltn__page-details-area ltn__service-details-area mb-105">
                <div className="container py-5">
                    <h2 className='textheadermil'>Expense Calculator</h2>
                    <div className="col text-end">
                        <button type="button" className='btn btn-md btn-danger col-12 col-sm-12 col-md-5 col-lg-3 col-xl-2'>Add</button>
                    </div>
                    <div className="row py-5 gy-3">
                        {
                            dummy.map((v, i) => {
                                return <div className="col-12 col-md-6 col-lg-3" key={i}>
                                    <div class="card w-100 shadow">
                                        <div class="card-body">
                                            <div className="col-12 d-inline-flex align-items-center p-0">
                                                <div className="col-5 px-0">
                                                    <img src={publicUrl + "assets/img/slider/21.jpg"} alt="truck" className='rounded' />
                                                </div>
                                                <div className="col-7 px-0">
                                                    <h5 class="card-title">Load one</h5>

                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <p class="card-text mb-1 d-inline-flex p-0 w-100">
                                                    <b className='col-3 px-0'>From :</b>
                                                    <span className='col px-0 text-break'>Tenkasi,india</span>
                                                </p>

                                                <p class="card-text mb-1 d-inline-flex p-0 w-100">
                                                    <b className='col-3 px-0'>To :</b>
                                                    <span className='col px-0 text-break'>Coimbatore,india</span>
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
                                            <Link to={'/expense-details'}>Full details {`>>`}</Link>
                                        </div>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}
