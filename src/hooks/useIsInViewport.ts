import { useEffect, useMemo, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useIsInViewport(ref: any) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const options = {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1,
  };

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => setIsIntersecting(entry.isIntersecting),
        options,
      ),
    [options],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
