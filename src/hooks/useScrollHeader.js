import { useEffect, useState, useRef } from 'react';

// Hook theo dõi hành vi cuộn trang để ẩn NavTop khi scroll xuống
// và hiển thị Header khi người dùng cuộn vượt quá 16px
function useScrollHeader() {
    const [hideNavTop, setHideNavTop] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > lastScrollY.current && currentY > 16) {
                setHideNavTop(true);
                setShowHeader(true);
            } else if (currentY === 0) {
                setHideNavTop(false);
                setShowHeader(false);
            }

            lastScrollY.current = currentY; // cập nhật ref, không gây re-render
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { hideNavTop, showHeader };
}

export default useScrollHeader;
