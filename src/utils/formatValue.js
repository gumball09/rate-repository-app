const formatValue = (value) => {
  if (value >= 1000) {
    return `${Math.round((value / 1000) * 10) / 10} k`;
  }
  return value.toString();
};

export default formatValue;
