import {useState, useEffect, useRef} from 'react';

const useOrderCollapse = (orderHistory, itemOffset = 200) => {
  const [selectedId, setSelectedId] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    const index = orderHistory.findIndex((item) => item.id === selectedId);
    if (flatListRef.current && index > -1)
      flatListRef.current.scrollToOffset({
        animated: true,
        offset: index * itemOffset, // TODO: find a nice way to compute this offset.
      });
  }, [selectedId, orderHistory, itemOffset]);

  return {selectedId, setSelectedId, ref: flatListRef};
};

export {useOrderCollapse};
