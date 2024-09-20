import React from "react";
import useFetchHome from "../../hooks/useFetchHome";

const DataProvider = ({ children }) => {
  useFetchHome();

  return <>{children}</>;
};

export default DataProvider;
