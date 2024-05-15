import { RefObject, useEffect } from "react";

// Generic type for ref & HTMLElement
type RefType<T> = RefObject<T>;

export function useOutsideAlerter<T extends HTMLElement>(
  ref: RefType<T>,
  setActive: React.Dispatch<boolean>
) {
  useEffect(() => {
    // Alert if clicked on outside of element
    function handleClickOutside(event: MouseEvent) {
      // We get the target from the MouseEvent and we just check if it's contained inside the current ref
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log("clicked outside");
        setActive(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // unbind even when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
