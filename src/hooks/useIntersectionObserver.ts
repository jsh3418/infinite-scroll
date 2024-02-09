import { useEffect } from "react";

type Params = {
  observerRef: React.MutableRefObject<HTMLElement | null>;
  intersectionObserverInit?: IntersectionObserverInit;
  callback: () => void;
};

export const useIntersectionObserver = ({
  observerRef,
  intersectionObserverInit,
  callback,
}: Params) => {
  useEffect(() => {
    if (!observerRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, intersectionObserverInit);

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observerRef, intersectionObserverInit, callback]);
};
