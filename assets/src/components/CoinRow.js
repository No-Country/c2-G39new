import React from 'react';
// import {colores, Tr} from "./style.js"
import styled from 'styled-components';


   


const CoinRow = ({coin, index}) => {
  return(
        <Tr>
         <td>{index}</td>
            <td>
            <img src={coin.image} alt={coin.name} style={{width: '2%' , marginRight: '3px' }}></img>
            <span>{coin.name}</span>
            <span style={{marginLeft: '5px'}}>{coin.symbol}</span>
            </td>
            <td>{coin.current_price}
            </td>
            {/* <td className={coin.price_change_percentage_24h > 0 ? {color: 'green'} : {color: 'red'}}>
            {coin.price_change_percentage_24h}
            </td> */}
            <td>{coin.total_volume}</td>


        </Tr>
  )};

export default CoinRow;

const Tr = styled.tr`
align-items: center;
&:hover{
  background: #1f2528;
  color: #18a724;
  font-weight: bold;
}


`;


