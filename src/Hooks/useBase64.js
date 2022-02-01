import { useState } from "react";

/**
 * This Hook helps you to convert Image into Base64
 * @returns [base64, setBase64]
 */
const useBase64 = () => {
  const [value, setValue] = useState("");

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const setFile = async (file) => {
    await getBase64(file).then(
      (success) => {
        setValue(success);
        return success;
      },
      (error) => {
        return error;
      }
    );
  };

  return [value, setFile];
};

export default useBase64;
