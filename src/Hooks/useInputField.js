import { useState } from "react";

const useInputField = () => {
  const [value, setValue] = useState({});

  const onChange = (event) => {
    console.log(event.target);
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const reset = () => {
    setValue({});
  };

  return {
    value,
    onChange,
    reset,
  };
};

export default useInputField;
