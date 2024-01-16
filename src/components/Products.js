import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { checkProduct, deleteProduct, getProducts } from '../app/app';

export default function Products() {
    const [products, setProducts] = useState([
        /* { id: 1, name: "computer", price: 4500, checked: true },
         { id: 2, name: "Printer", price: 4500, checked: false },
         { id: 3, name: "Television", price: 45000, checked: true },
         { id: 4, name: "Radio", price: 4500, checked: false }*/
    ])
    useEffect(() => {
        handleGetProduct()
    }, []);

    const handleGetProduct = () => {
        /*axios.get("http://localhost:7000/products")
            .then(resp => {
                const products = resp.data;
                setProducts(products);
            })
            .catch(err => {
                console.log(err);
            })*/
        getProducts().then(resp => {
            setProducts(resp.data)
        }).catch(err => {
            console.log(err);
        })

    }

    const handleDeleteProduct = (product) => {
        deleteProduct(product).then(resp => {
            // handleGetProduct();//it works: reload after delete//inconvient: it loads all the product
            const newProducts = products.filter(p => p.id !== product.id);
            setProducts(newProducts);
        })
        // const newProducts = products.filter(p => p.id !== product.id);
        //  setProducts(newProducts);
    }
    const handleCheckProduct = (product) => {
        checkProduct(product).then(resp => {

            const newProducts = products.map(p => {
                if (p.id === product.id) {
                    p.checked = !p.checked;
                }
                return p;
            })
            setProducts(newProducts)

        })
        /*const newProducts = products.map(p => {
            if (p.id === product.id) {
                p.checked = !p.checked;
            }
            return p;
        })
        setProducts(newProducts);*/
    }
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
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button onClick={() => handleCheckProduct(product)}
                                                        className="btn btn-outline-success">
                                                        <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle}>

                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDeleteProduct(product)}
                                                        className="btn btn-outline-danger">
                                                        <FontAwesomeIcon icon={faTrash}>
                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
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
