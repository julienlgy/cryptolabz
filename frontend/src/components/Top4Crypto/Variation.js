import React from "react";

const Variation = ({ value, ...props }) => {
  const color = value.charAt(0) === "+" ? "text-success" : "text-danger";
  return <td className={color}>{value}</td>;
};

export default Variation;
