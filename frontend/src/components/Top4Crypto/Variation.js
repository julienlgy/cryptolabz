import React from "react";

const Variation = ({ value, ...props }) => {
  const isNegative = value.charAt(0) === "-";
  const color = value.charAt(0) === "-" ? "text-danger" : "text-success";
return <td className={color}>{ isNegative ? "" : "+" }{value}%</td>;
};

export default Variation;
