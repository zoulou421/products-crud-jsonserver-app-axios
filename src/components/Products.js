import { faCheckCircle, faCircle, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import axios from 'axios';
import React, { useEffect, useState } from 'react'
//import { checkProduct, deleteProduct, getProducts, getProductsByFilter } from '../app/app';
import { AppContext, checkProduct, deleteProduct, getProductsByFilter } from '../app/app';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import SearchForm from './SearchForm';

export default function Products() {

    //function
    const navigate = useNavigate();

    //centralised state
    const [state, setState] = useContext(AppContext);


    //const [products, setProducts] = useState([
    /* { id: 1, name: "computer", price: 4500, checked: true },
     { id: 2, name: "Printer", price: 4500, checked: false },
     { id: 3, name: "Television", price: 45000, checked: true },
     { id: 4, name: "Radio", price: 4500, checked: false }*/
    // ]) in comment to fix pagination
    /*  const [state, setState] = useState({
          products: [],
          currentPage: 1,
          pageSize: 3,
          keyword: "",
          totalPages: 0
      }) centralised in app.js*/

    const [query, setQuery] = useState("");//search form

    useEffect(() => {
        // handleGetProduct()
        handleGetProduct(state.keyword, state.currentPage, state.pageSize)
    }, []);

    //const handleGetProduct = () => {
    const handleGetProduct = (keyword, page, size) => {
        /*axios.get("http://localhost:7000/products")
            .then(resp => {
                const products = resp.data;
                setProducts(products);
            })
            .catch(err => {
                console.log(err);
            })*/
        // getProducts().then(resp => {
        getProductsByFilter(keyword, page, size).then(resp => {
            // setProducts(resp.data)
            let totalElements = resp.headers['x-total-count'];
            var totalPages = Math.floor(totalElements / size);
            if (totalElements % size !== 0) ++totalElements;

            setState({ ...state, products: resp.data, keyword: keyword, currentPage: page, pageSize: size, totalPages: totalPages });
        }).catch(err => {
            console.log(err);
        })

    }

    const handleDeleteProduct = (product) => {
        deleteProduct(product).then(resp => {
            // handleGetProduct();//it works: reload after delete//inconvient: it loads all the product
            //const newProducts = products.filter(p => p.id !== product.id);
            const newProducts = state.products.filter(p => p.id !== product.id);
            // setProducts(newProducts);
            setState({ ...state, products: newProducts });
        })
        // const newProducts = products.filter(p => p.id !== product.id);
        //  setProducts(newProducts);
    }
    const handleCheckProduct = (product) => {
        checkProduct(product).then(resp => {

            //  const newProducts = products.map(p => {
            const newProducts = state.products.map(p => {
                if (p.id === product.id) {
                    p.checked = !p.checked;
                }
                return p;
            })
            // setProducts(newProducts)
            setState({ ...state, products: newProducts });
        })
        /*const newProducts = products.map(p => {
            if (p.id === product.id) {
                p.checked = !p.checked;
            }
            return p;
        })
        setProducts(newProducts);*/
    }
    const handleGoToPage = (page) => {
        handleGetProduct(state.keyword, page, state.pageSize);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        // setState({ ...state, keyword: query });
        handleGetProduct(query, 1, state.pageSize);
    }
    return (
        <div className="p-1 m-1">
            <div className="row">
                <div className="col-md-6">
                    <div className="card m-1">
                        <div className="card-body">
                            <SearchForm handleSearch={handleSearch} query={query} setQuery={setQuery} />
                        </div>
                    </div>
                    <div className="card m-1">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th><th>Name</th><th>Price</th><th>checked</th><th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.products.map(product => (
                                            //  state.map(product => (
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

                                                <td>
                                                    <button onClick={() => navigate(`editProduct/${product.id}`)}
                                                        className="btn btn-outline-success">
                                                        <FontAwesomeIcon icon={faEdit}>
                                                        </FontAwesomeIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <ul className="nav nav-pills">
                                {
                                    (new Array(state.totalPages.totalElements).fill(0)).map((v, index) => (
                                        <li key={index + 1}>
                                            <button onClick={() => handleGoToPage(index + 1)}
                                                className={(index + 1) === state.currentPage ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"}>{index + 1}</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
