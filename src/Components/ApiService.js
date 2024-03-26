import axios from 'axios';

export const fetchData = async (updateFunction) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        updateFunction(response.data.products);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const fetchCategory = async(updateFunction) => {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        response.data.unshift('All')
        updateFunction(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const searchBycategory = async(category,updateFunction) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
        debugger
        updateFunction(response.data.products);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const searchByProduct = async(category,updateFunction) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${category}`);
        debugger
        updateFunction(response.data.products);
    } catch (error) {
        console.error('Error:', error);
    }
}

