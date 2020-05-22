import { useRef } from 'react';

const useScroll = () => {
    const elementRef = useRef(null);
    const scroll = () => window.scrollTo({ left: 0, top: elementRef.current.offsetTop, behavior: 'smooth' });
    return [scroll, elementRef]
}

export default useScroll;