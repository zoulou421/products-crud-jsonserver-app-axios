import React, { useState } from 'react'

export default function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [checked, SetChecked] = useState(false);

    return (
        <div className="row p-1">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input onChange={(e) => setName(e.target.value)} type="text" value={name}
                                    className="form-control" placeholder="Please enter name..." />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price:</label>
                                <input onChange={(e) => setPrice(e.target.value)} type="text" value={price}
                                    className="form-control" placeholder="Please enter price..." />
                            </div>

                            <div className="mb-3">
                                <input onChange={(e) => SetChecked(e.target.value)} type="checkbox"
                                    checked={checked}
                                    className="form-check-input" />
                                <label className="form-check-label">Checked:</label>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-info-xm btn-primary">save product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
