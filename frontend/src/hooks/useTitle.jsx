import { useEffect } from "react";
import { useLocation } from "react-router"; // Corrected import

const useTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      const pageSegments = pathname.split("/").filter(Boolean);
      const content = pageSegments.length
        ? pageSegments
            .map(
              (segment) => segment.charAt(0).toUpperCase() + segment.slice(1)
            )
            .join(" | ")
        : "Tech Notes";

      document.title =
        content === "Tech Notes" ? content : `${content} | Tech Notes`;
    }
  }, [pathname]);

  return null;
};

export default useTitle;
