import React, { createContext, useContext, useState } from "react";

const cart = createContext();

export default function Context  (props){
  const [data, setData] = useState({});

  return (
    <cart.Provider value={{ data, setData }}>
      {props.children}
    </cart.Provider>
  );
};

export const CartState = () => {
  return useContext(cart);
};
