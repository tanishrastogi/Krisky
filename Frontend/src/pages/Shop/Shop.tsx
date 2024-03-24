import React, { useState, useEffect } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { getAllProducts } from "../../api/user.api";
import style from "./Shop.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useLocation } from 'react-router-dom';
import banner from "../../assets/menbanner.png";
import { Button } from "@mui/material";

import TuneIcon from '@mui/icons-material/Tune';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const Shop: React.FC = () => {
  const [mActives, setmActives] = useState();
  const [wActives, setwActives] = useState();
  const [sidebarOpen, serSidebarOpen] = useState(false)

  const location = useLocation();
  const cleanstring = location.search.substring(1);
  const [key, value] = cleanstring.split('=');
  const [filters, setFilters] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      {
        value && setFilters((prevFilters) => ({
          ...prevFilters,
          [key]: [value],
        }));
      }
      const data = await getAllProducts();
      setAllProducts(data.data.products);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filteredResult = [...allProducts];
      Object.keys(filters).forEach((filterName) => {
        const filterValues = filters[filterName];
        if (filterValues && filterValues.length > 0) {
          filteredResult = filteredResult.filter((product) => {
            const productValues = product[filterName] || [];
            return filterValues.every((filterValue) =>
              productValues.includes(filterValue)
            );
          });
        }
      });
      setFilteredProducts(filteredResult);
    };
    filterProducts();
  }, [filters, allProducts]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleGenderButtonClick = (gender: string) => {
    const genderFilterName = 'gender';
    if (gender === 'M') {
      setmActives(!mActives);
      onFilterChange(genderFilterName, mActives ? [] : [gender]);
    } else if (gender === 'F') {
      setwActives(!wActives);
      onFilterChange(genderFilterName, wActives ? [] : [gender]);
    }
  };

  const handleFilterSidebar = () => {
    serSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      {/* {value && 
    <div>
    <img src={banner} alt="banner"/>
    </div>} */}
      <div className={style.shoppage}>
        <div style={{display: sidebarOpen? "block" : "none", zIndex: ""}}>
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className={style.filterbar}>
          <div className={style.topbuttons}>
            <Button
              className={style.Button}
              style={{ opacity: sidebarOpen ? "0" : "1", backgroundColor: mActives ? 'black' : 'white', color: mActives ? 'white' : 'black', width: '80px' }}
              onClick={() => handleGenderButtonClick('M')}
            >
              Men
            </Button>
            <Button
              className={style.Button}
              style={{ opacity: sidebarOpen ? "0" : "1", backgroundColor: wActives ? 'black' : 'white', color: wActives ? 'white' : 'black', width: '80px' }}
              onClick={() => handleGenderButtonClick('F')}
            >
              Women
            </Button>
            <Button
              className={style.Button}
              style={{ backgroundColor: '#f0f0f0', color: 'black', width: '80px' }}
              onClick={() => handleFilterSidebar()}
            >
              { sidebarOpen? <CloseOutlinedIcon/> : <TuneIcon/>}
            </Button>
          </div>
        </div>
        <div className={style.productlist}>
          {filteredProducts.map((product: any, index: number) => (
            <div className={style.listitem} key={index}>
              <ProductCard product={product} wid="45vw" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
