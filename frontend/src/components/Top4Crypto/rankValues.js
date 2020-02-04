import React from "react";
import Variation from "./Variation";
import data from "./data/data.json";

const RankValues = ({ ...props }) =>
  data.map(({ rank, name, price, change }) => (
    <tr>
      <th scope="row">{rank}</th>
      <td>{name}</td>
      <td>€{price}</td>
      <Variation value={change} />
      <td>graph</td>
    </tr>
  ));

export default RankValues;
