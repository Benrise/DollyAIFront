import { useState, useEffect } from "react";
import { Image, ImageProps } from 'antd';

import { fetchProtectedImage } from "@/app/shared/lib";

const FALLBACK_IMAGE = "/images/etc/spheric-vortex.png";

export const ProtectedImage = ({ src, fallback = FALLBACK_IMAGE, ...props }: ImageProps) => {
    const [imageSrc, setImageSrc] = useState<string>(typeof src === "string" ? src : fallback);

    useEffect(() => {
        if (typeof src === "string") {
            fetchProtectedImage(src).then((secureUrl) => {
                if (secureUrl) setImageSrc(secureUrl);
            });
        }
    }, [src]);

    return <Image {...props} src={imageSrc} onError={() => setImageSrc(fallback)} />;
};