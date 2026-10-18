import { useState, useEffect } from 'react';

const THRESHOLD = 0;

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [prevOffset, setPrevOffset] = useState(0);

  const toggleScrollDirection = () => {
    const scrollY = window.pageYOffset;
    if (Math.abs(scrollY - prevOffset) < THRESHOLD) return;
    setScrollDirection(scrollY > prevOffset ? 'down' : 'up');
    setPrevOffset(scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleScrollDirection);
    return () => window.removeEventListener('scroll', toggleScrollDirection);
  });

  return scrollDirection;
};

export default useScrollDirection;
