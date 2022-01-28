import React from "react";
// import {colores, Tr} from "./style.js"
import styled from "styled-components";

const CoinRow = ({ coin }) => {
  return (
    <Tr>
      <td>
        <img
          src={coin.image}
          alt={coin.name}
          style={{
            width: "10%",
            maxWidth: "30px",
            marginRight: "3px",
            verticalAlign: "middle",
          }}
        ></img>
        <span style={{ verticalAlign: "initial" }}>{coin.name}</span>
        <span
          style={{
            verticalAlign: "initial",
            textTransform: "uppercase",
            marginLeft: "5px",
          }}
        >
          {coin.symbol}
        </span>
      </td>
      <td>{coin.current_price}</td>
      {/* <td className={coin.price_change_percentage_24h > 0 ? {color: 'green'} : {color: 'red'}}>
            {coin.price_change_percentage_24h}
            </td> */}
      <td
        className={
          coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"
        }
        style={
          coin.price_change_percentage_24h > 0 ? {
            color: "green"
        }: {color: "red"}}
      >
        {coin.price_change_percentage_24h}
      </td>
    </Tr>
  );
};

export default CoinRow;

const tdStyle = {

}

const Tr = styled.tr`
  align-items: center;
  &:hover {
    background: #1f2528;
    color: #18a724;
    font-weight: bold;
  }
`;
