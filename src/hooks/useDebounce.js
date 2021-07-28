import { useRef, useState } from 'react';

// https://lodash.com/docs/4.17.15#debounce
const useDebounce = (debounceTime) => {
  const [value, setValue] = useState(null);
  const debouncer = useRef();

  const updater = (val) => {
    window.clearTimeout(debouncer.current);

    debouncer.current = window.setTimeout(() => {
      setValue(val);
    }, debounceTime);
  };

  return [value, updater];
};

export default useDebounce;
