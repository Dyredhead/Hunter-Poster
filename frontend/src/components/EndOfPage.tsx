import { useEffect, useLayoutEffect, useRef } from "react"

export const EndOfPage = ({callback}: {callback: ()=>void}) => {

    const callbackRef = useRef<()=>void>(null);
    const endOfPage = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    })

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) callbackRef.current!();
        });

        observer.observe(endOfPage.current!)

        return () => {
            if (endOfPage.current) observer.unobserve(endOfPage.current!)
        }
    }, [])
    

    return (
        <div ref={endOfPage} className="h-5">
            loading...
        </div>
    )
}