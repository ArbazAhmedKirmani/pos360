import { useState } from "react";

const useInputField = () => {
  const [value, setValue] = useState({});

  const onChange = (event) => {
    console.log(event);
    setValue({ ...value, [event.name]: event.value });
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
