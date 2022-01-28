import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import TableCoins from "./TableCoins.js";
import styled from "styled-components";

function Cryptos({ coins }) {
  //const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  /* const getData = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=100&page=1"
    );
    console.log(res.data);

    setCoins(res.data);
  };

  useEffect(() => {
    getData();
  }, []); */

  return (
    <Contenido>
      <h1>Monedas disponibles</h1>
      <input
        type="text"
        placeholder="Search a Coin"
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableCoins coins={coins} search={search} />
    </Contenido>
  );
}

export default Cryptos;

const Contenido = styled.div`
  align-items: center;
  margin-bottom: 10px;
  background: black;

  h1 {
    text-align: center;
    border-bottom: 1px solid;
    color: #18a724;
  }

  input {
    margin-bottom: 10px;
    margin-left: 10px;
    background-color: black;
    color: #18a724;
    text-align: center;
    align-items: center;
    position: relative;
  }
`;
