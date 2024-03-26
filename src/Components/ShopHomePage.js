import { useState, useEffect } from 'react';
import { fetchData, fetchCategory, searchBycategory, searchByProduct } from './ApiService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const ShopHomePage = () => {
    let [itemList, setItemList] = useState([]);
    let [categoryList, setCategoryList] = useState([]);
    let [category,setCategory] = useState('');
    let [search,setSearch] = useState('');

    useEffect(() => {
        let initialRender = async () => {
            await fetchData(setItemList);
            await fetchCategory(setCategoryList);
        }
        initialRender();
    }, []);

    const onCategoryChange=async(value)=>{
        if(value.target.value==='All'){
            await fetchData(setItemList);
        }else{
            await searchBycategory(value.target.value,setItemList)
        }
        setCategory(value.target.value);
    }


    return (
        <>
            <div class='header'>
                <TextField id="standard-basic" label="Search by value" variant="standard" value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    onKeyPress={async(e)=>{                    
                    if(e.charCode===13 ){
                        if(!e.target.value || e.target.value.toLowerCase()==='all'){
                            await fetchData(setItemList);
                        }else{
                            await searchByProduct(e.target.value,setItemList)
                        }
                    }
                }}/>
                <span class='hint'>press enter key to search</span>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Category</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={category}
                        label="Category"
                        onChange={onCategoryChange}
                    >
                        {
                            categoryList.map((val,i)=>{
                                return (
                                    <MenuItem value={val}>{val}</MenuItem>
                                )

                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div class='cont'>

                {
                    itemList && itemList.map((val, i) => {
                        return (
                            <div class='item'>
                                <div>
                                    <div >
                                        <img src={val.images[0]} alt="My Image" class='img' />
                                        <div class='txt'>
                                            Title : <span>{val.brand + '-' + val.category}</span>
                                            Description : <span>{val.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>

    )
}

export default ShopHomePage;