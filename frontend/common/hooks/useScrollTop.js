import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollTop(elementId) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById(elementId).scrollTo(0, 0);
  }, [pathname, elementId]);

  return null;
}
