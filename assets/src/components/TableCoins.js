import React from "react";
import CoinRow from "./CoinRow";
import { Table } from "./Style.js";

const titles = ["Coin", "Price", "% Price Change"];

const TableCoins = ({ coins, search }) => {
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) |
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {titles.map((title, index) => (
              <td key={index}>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin, index) => (
            <CoinRow coin={coin} key={index} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableCoins;
