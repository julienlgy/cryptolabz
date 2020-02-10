import React from "react";
import Variation from "./Variation";
import LineChart from "./LineChart/LineChart";
import data from "./data/data.json";

const RankValues = ({ ...props }) =>
  data.map(({ rank, name, code, price, change, graph }) => (
    <tr>
      <th scope="row">{rank}</th>
      <td>
        {name} - {code}
      </td>
      <td>€{price}</td>
      <Variation value={change} />
      <td>
        <LineChart data={graph} />
      </td>
    </tr>
  ));

export default RankValues;
