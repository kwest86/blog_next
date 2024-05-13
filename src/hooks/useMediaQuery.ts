"use client";
import { useLayoutEffect, useState } from "react";

// 一般的なモバイルデバイスのブレークポイントを使用
export const mobileQuery = "(max-width: 751px)";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}
