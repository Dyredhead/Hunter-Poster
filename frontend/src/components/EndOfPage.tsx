import { useEffect, useLayoutEffect, useRef } from "react"

export const EndOfPage = ({callback}: {callback: ()=>void}) => {

    const callbackRef = useRef<()=>void>(null);
    const endOfPage = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    })

    useEffect(() => {
        const target = endOfPage.current;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) callbackRef.current!();
        });

        observer.observe(target!)

        return () => {
            if (target) observer.unobserve(target!)
        }
    }, [])
    

    return (
        <div ref={endOfPage} className="h-5">
            loading...
        </div>
    )
}