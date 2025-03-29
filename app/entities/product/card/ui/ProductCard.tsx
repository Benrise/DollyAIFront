import styles from './styles.module.scss';

import { Image, Typography } from "antd"
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { IProduct } from "@/app/entities/product/card"

const { Paragraph } = Typography

export const ProductCard: React.FC<IProduct> = ({ img_src, title, icon_src, link }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const onLoadCapture = () =>{
      setIsImageLoaded(true)
    }

    return (
      <div className={styles.card}>
        <a href={link} className="block w-full" target="_blank">
          <div className={styles.imageContainer}>
            { isImageLoaded ? <Image
              preview={false}
              src={img_src}
              alt={title}
              className={styles.image}
              fallback="/images/etc/fallback.png"
              width="100%"
              height="100%"
            /> : <LoadingOutlined className="absolute text-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> }
          </div>
        </a>
        <Paragraph ellipsis={{ rows: 2 }} className={styles.title}>
          {title}
        </Paragraph>
        <div className={styles.icon}>
          <Image onLoadCapture={onLoadCapture} preview={false} src={icon_src} alt={title} width={16} height={16} />
        </div>
      </div>
    );
  };