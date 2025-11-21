import {useState} from 'react';

const useForm = (initialFormValues, validators) => {
  const initialFormErrors = Object.keys(initialFormValues).reduce(
    (prev, key) => ((prev[key] = undefined), prev),
    {},
  );

  const [formData, setFormData] = useState(initialFormValues);

  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const validateValue = (val, key) => {
    let error = null;
    if (validators && validators[key]) {
      for (let i = 0; i < validators[key].length; i++) {
        const errorMessage = validators[key][i](val);
        if (errorMessage) {
          error = errorMessage;
          break;
        }
      }
    }
    if (error) {
      setFormErrors((prev) => ({...prev, [key]: error}));
      return false;
    } else {
      setFormErrors((prev) => ({...prev, [key]: undefined}));
      return true;
    }
  };

  const onValueChange = (val, key) => {
    validateValue(val, key);
    setFormData((prev) => ({...prev, [key]: val}));
  };

  const clearValues = (keys) => {
    const newFormValues = {...formData};
    const newFormErrors = {...formErrors};
    keys.forEach((key) => {
      newFormValues[key] = initialFormValues[key];
      newFormErrors[key] = initialFormErrors[key];
    });

    setFormData(newFormValues);
    setFormErrors(newFormErrors);
  };

  const validateForm = () => {
    let hasError = false;
    Object.keys(formData).forEach((key) => {
      const isValid = validateValue(formData[key], key);
      hasError = hasError || !isValid;
    });
    return hasError;
  };

  const removeError = (key) => {
    setFormErrors((prev) => ({...prev, [key]: undefined}));
  };

  const setAllFormValues = (values) => {
    setFormData(values);
  };

  return {
    formData,
    formErrors,
    onValueChange,
    clearValues,
    validateForm,
    removeError,
    setAllFormValues,
  };
};

export {useForm};
