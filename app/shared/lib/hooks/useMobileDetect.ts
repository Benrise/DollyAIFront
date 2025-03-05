import { useState, useEffect } from 'react';

export const useMobileDetect = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    const checkDevice = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileDevices = /iphone|ipad|ipod|android|blackberry|iemobile|opera mini|windows phone/;
        setIsMobile(mobileDevices.test(userAgent));
    };

    useEffect(() => {
        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return { isMobile };
};