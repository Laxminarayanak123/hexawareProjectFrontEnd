
const OnlyReceipt = ()=>{

    return(
        <div id="billDiv" className="container content" ref={contentRef}  style={{marginBottom:'50px'}}>
                <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="invoice-title">
                                        <h4 className="float-end font-size-15">Invoice <span className="badge bg-success font-size-12 ms-2">Paid</span></h4>
                                        <div className="mb-4">
                                        <h2 className="mb-1 text-muted">WeHelpTax(WHT)</h2>
                                        </div>
                                        <div className="text-muted">
                                            <p className="mb-1">Srikakulam,AP,532001</p>
                                            <p className="mb-1"><i className="uil uil-envelope-alt me-1"></i> rrr@gmail.com</p>
                                            <p><i className="uil uil-phone me-1"></i> 984994657</p>
                                        </div>
                                    </div>
    
                                    <hr className="my-4"></hr>
    
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="text-muted">
                                                <h5 className="font-size-16 mb-3">Billed To:</h5>
                                                <h5 className="font-size-15 mb-2">{empData.firstName+" "+empData.lastName}</h5>
                                                <p className="mb-1">{empData.email}</p>
                                                <p>{empData.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="text-muted text-sm-end">
                                                <div className="mt-4">
                                                    <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                                                    <p>{billData.paymentTime}</p>
                                                </div>
                                                <div className="mt-4">
                                                    <h5 className="font-size-15 mb-1">Order No:</h5>
                                                    <p>#{billData.id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="py-2">
                                        <h5 className="font-size-15">Order Summary</h5>
    
                                        <div className="table-responsive">
                                            <table className="table align-middle table-nowrap table-centered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th style={{width:'70px'}}>No.</th>
                                                        <th>Item</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th className="text-end" style={{width:'120px'}}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">01</th>
                                                        <td>
                                                            <div>
                                                                <h5 className="text-truncate font-size-14 mb-1">Tax Value</h5>
                                                                <p className="text-muted mb-0">income</p>
                                                            </div>
                                                        </td>
                                                        <td>₹ {billData.amount}</td>
                                                        <td>1</td>
                                                        <td className="text-end">₹ {billData.amount}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" colSpan="4" className="text-end">Sub Total</th>
                                                        <td className="text-end">₹ {billData.amount}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end">
                                                            Discount :</th>
                                                        <td className="border-0 text-end">- ₹0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end">
                                                            Transaction Charge :</th>
                                                        <td className="border-0 text-end">₹0.00</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end">
                                                            Tax</th>
                                                        <td className="border-0 text-end">$12.00</td>
                                                    </tr> */}
                                                    <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end">Total</th>
                                                        <td className="border-0 text-end"><h4 className="m-0 fw-semibold">₹ {billData.amount}</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-print-none mt-4">
                                            <div className="float-end">
                                                <button className="btn btn-success me-1"><i  className="fa fa-print"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default OnlyReceipt;