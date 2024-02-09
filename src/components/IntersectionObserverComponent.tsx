import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

type Props = {
  callback: () => void;
};

export const IntersectionObserverComponent = ({ callback }: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    observerRef,
    callback,
    intersectionObserverInit: {
      rootMargin: "200px 0px",
    },
  });

  return <div style={{ width: "1px", height: "1px" }} ref={observerRef} />;
};
