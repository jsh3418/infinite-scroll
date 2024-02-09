import { useEffect, useRef } from "react";

type Props = {
  callback: () => void;
};

export const IntersectionObserverComponent = ({ callback }: Props) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {
        rootMargin: "200px 0px",
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef, callback]);

  return <div style={{ width: "1px", height: "1px" }} ref={observerRef} />;
};
