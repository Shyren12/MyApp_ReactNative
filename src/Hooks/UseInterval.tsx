import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    // Remember the latest callback.
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        // function tick() {
        //     if (savedCallback.current) {
        //         savedCallback.current();
        //     }
        // }
        // if (delay !== null) {
        //     const id = setInterval(tick, delay);
        //     return () => clearInterval(id);
        // }
        if (delay === null) {
            return;
        }
        const id = setInterval(() => {
            savedCallback.current()
        }, delay)
        return () => { 
            clearInterval
        }
    }, [delay])
}