import axios from "axios";
import { createContext, useState } from "react";

// This is like a repository which has to interact with my backend side(json-server)

export const productsApi = axios.create({
    baseURL: "http://localhost:7800"
});

export const getProducts = () => {
    return productsApi.get("/products");
}

export const getProductsByFilter = (keyword = "", page = 1, size = 6) => {
    return productsApi.get(`/products/?name_like=${keyword}&_page=${page}&_limit=${size}`);
}


export const deleteProduct = (product) => {
    //return productsApi.delete("/products" + product.id); or else:
    return productsApi.delete(`/products/${product.id}`);
}

export const getProduct = (id) => {
    return productsApi.get(`/products/${id}`);
}

export const saveProduct = (product) => {
    return productsApi.post(`/products`, product);
}

export const checkProduct = (product) => {
    return productsApi.patch(`/products/${product.id}`, { checked: !product.checked });
}

export const updateProduct = (product) => {
    return productsApi.put(`/products/${product.id}`, product);
}




export const AppContext = createContext();

export const useAppState = () => {
    const initialState = {
        products: [],
        currentPage: 1,
        pageSize: 3,
        keyword: "",
        totalPages: 0
    };

    const appState = useState(initialState);
    return appState;
}

