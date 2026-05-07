import { useState, useEffect, useCallback } from "react";

// ─── useMediaQuery ─────────────────────────────────────────────────────────────
/**
 * Returns true if the given media query matches the current viewport.
 * SSR-safe: always returns false during server rendering.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql     = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ─── useScrollPosition ─────────────────────────────────────────────────────────
/**
 * Returns the current scroll Y position.
 * Throttled via requestAnimationFrame for performance.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}

// ─── useLocalStorage ──────────────────────────────────────────────────────────
/**
 * Persists state to localStorage with SSR safety.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 */
export function useLocalStorage<T>(
  key:          string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`[useLocalStorage] Failed to set "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

// ─── useDebounce ──────────────────────────────────────────────────────────────
/**
 * Debounces a value by the given delay in milliseconds.
 * Useful for search inputs to reduce API calls.
 *
 * @example
 * const debouncedSearch = useDebounce(searchQuery, 400);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── useIntersectionObserver ──────────────────────────────────────────────────
/**
 * Returns true once the target element enters the viewport.
 * Perfect for lazy-loading animations.
 *
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
 * <div ref={ref} className={isVisible ? "animate-fade-up" : "opacity-0"} />
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {},
): [React.RefCallback<Element>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useCallback(
    (node: Element | null) => {
      if (!node) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Only trigger once
        }
      }, options);
      observer.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.threshold, options.root, options.rootMargin],
  );

  return [ref, isIntersecting];
}
