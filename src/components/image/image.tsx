import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const placeholder = "/images/product-placeholder.png";

const Placeholder = ({ width, height, placeholderImage }) => (
  <img
    width={width}
    height={height}
    style={{ width: "100%", objectFit: "contain" }}
    src={placeholderImage || placeholder}
    alt="product img loader"
  />
);

type Props = {
  src?: string | [string];
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  style?: any;
  visibleByDefault?: boolean;
  withPlaceholder?: boolean;
  placeholderImage?: string;
  srcSet?: string;
};

const ImageLoader: React.FC<Props> = ({
  src,
  alt = "placeholder",
  width = "100%",
  height = "100%",
  className,
  style,
  visibleByDefault = false,
  withPlaceholder = true,
  placeholderImage,
  srcSet,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <LazyLoadImage
      className={className}
      style={style}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      delayTime={200}
      threshold={10}
      visibleByDefault={visibleByDefault}
      onError={() => setImgSrc(placeholder)}
      srcSet={srcSet}
      placeholder={
        withPlaceholder && (
          <Placeholder
            width={width}
            height={height}
            placeholderImage={placeholderImage}
          />
        )
      }
    />
  );
};

export default ImageLoader;
