import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

export default function Products() {
    const [products, setProducts] = useState([
        { id: 1, name: "computer", price: 4500, checked: true },
        { id: 2, name: "Printer", price: 4500, checked: false },
        { id: 3, name: "Television", price: 45000, checked: true },
        { id: 4, name: "Radio", price: 4500, checked: false }
    ])
    return (
        <div className="p-1 m-1">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th><th>Name</th><th>Price</th><th>checked</th><th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button className="btn btn-outline-success">
                                                        <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle}>

                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
                                                <td>Actions</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
