const isRequired = () => (val) => {
  if (val === undefined || val === null || val === '')
    return 'Privaloma užpildyti laukelį';
};

const isOutsideRange = (min, max) => (val) => {
  const parsed = parseFloat(val);
  if (parsed < min) return `Mažiausia leidžiama reikšmė: ${min}`;
  if (parsed > max) return `Didžiausia leidžiama reikšmė: ${max}`;
};

export {isRequired, isOutsideRange};
