import React, { useState } from "react";

const useLoading = (initialState) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return [isLoading, toggleLoading, stopLoading];
};

export default useLoading;
