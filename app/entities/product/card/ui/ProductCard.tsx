import styles from './styles.module.scss';
import { Image, Typography, Skeleton } from "antd";
import { useState } from "react";

import { IProduct } from '../model';

const { Paragraph } = Typography;

export const ProductCard: React.FC<IProduct> = ({ 
  img_src, 
  title, 
  icon_src, 
  link 
}) => {
  const FALLBACK_IMAGE_URL = '/images/etc/fallback.png';
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(img_src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (!hasError) {
      setCurrentSrc(FALLBACK_IMAGE_URL);
      setHasError(true);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <a href={link} className="block w-full" target="_blank" rel="noopener noreferrer">
        <div className={styles.imageContainer}>
          {isLoading && (
            <Skeleton.Image 
              active
              className="w-full! h-full!" 
            />
          )}
          <Image
            preview={false}
            src={currentSrc}
            alt={title}
            className={`${styles.image} ${isLoading ? 'hidden' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
            width="100%"
            height="100%"
          />
        </div>
      </a>

      <Paragraph ellipsis={{ rows: 2 }} className={styles.title}>
        {title}
      </Paragraph>

      <div className={styles.icon}>
        <Image 
          preview={false} 
          src={icon_src} 
          alt={`Иконка: ${title}`} 
          width={16} 
          height={16} 
        />
      </div>
    </div>
  );
};