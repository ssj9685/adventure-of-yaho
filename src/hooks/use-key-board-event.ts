import { useEffect } from "react";

export function useKeyBoardEvent(fn: (event: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener("keydown", fn);

    return () => {
      window.removeEventListener("keydown", fn);
    };
  }, [fn]);
}
