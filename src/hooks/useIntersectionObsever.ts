import { useEffect, useState } from "react";

const useIntersectionObserver = ({ threshold = 0, root = null, rootMargin = "0%" }: IntersectionObserverInit) => {
  const [target, setTarget] = useState<HTMLElement | Element | null | undefined>();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (!target) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, observerParams);

    observer.observe(target);

    return () => observer.disconnect();
  }, [target, root, rootMargin, threshold]);

  return { setTarget, entry };
};

export default useIntersectionObserver;
