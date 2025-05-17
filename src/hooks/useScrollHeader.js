import { useEffect, useState } from 'react';

function useScrollHeader() {
    const [hideNavTop, setHideNavTop] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > lastScrollY && currentY > 16) {
                setHideNavTop(true);
                setShowHeader(true);
            } else if (currentY === 0) {
                setHideNavTop(false);
                setShowHeader(false);
            }

            setLastScrollY(currentY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return { hideNavTop, showHeader };
}

export default useScrollHeader;
