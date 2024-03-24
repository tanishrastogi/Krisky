import { useState, useEffect } from 'react';
import { searchProducts } from '../../api/user.api';
import CartItem from '../CartItem/CartItem';
import style from './Searchbar.module.css';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";


const Searchbar = ({open, close}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const search = async () => {
    const payload = {
      search_string : searchTerm,
      }
    const response = await searchProducts(payload);
    if (response.statusCode === 200) setProducts(response.data);
    console.log(response.data);
  };
  const clearInput = () => {
    setSearchTerm('');
  };

  useEffect(() =>{
    search();
  }, [searchTerm]);

  return (
    <div className={`${style.sidenav} ${open ? style.open : ''}`}>
      <div className={style.head}>
      <div className={style.searchContainer}>
        <input
          type="text"
          className={style.search}
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <button className={style.clearButton} onClick={clearInput}>&times;</button> */}
        <button className={style.searchButton} onClick={search}><SearchIcon/></button>
      </div>
      <a className={style.closebtn} onClick={close}>&times;</a>
      </div>
      <div style={{width:'100%', height: '100%'}}  onClick={close}>
        <ul>
          {products.map((product) => (
          <div style={{display: 'flex', justifyContent: 'center'}} onClick={() => {navigate(`/product/${product._id}`); close()}}>
            <CartItem productID={product._id}/>
          </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Searchbar;
