import Image from "components/image/image";
import React, { useState } from "react";
import ReactImageZoom from "react-image-zoom";
import {
  ImagePreview,
  ThumbItem,
  ThumbList,
  ImageGallery,
  NoImagePlaceHolder,
} from "./image-preview-gallery.style";

type Props = {
  items: Array<any>;
  layout?: string | "row" | "column";
};

const ImagePreviewGallery: React.FC<Props> = ({
  items,
  layout = "row",
}: Props) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <ImageGallery layout={layout}>
      {items.length > 1 && (
        <ThumbList variant={layout}>
          {items.map((item: any, index: number) => (
            <ThumbItem
              key={index}
              className={`${activeImage === index ? "active" : ""}`}
              onClick={() => setActiveImage(index)}
            >
              <Image key={index} src={item.url} alt={item.alt} />
            </ThumbItem>
          ))}
        </ThumbList>
      )}
      {items.length === 0 ? (
        <NoImagePlaceHolder>
          <Image alt="no image placeholder" />
        </NoImagePlaceHolder>
      ) : (
        items.map((item: any, index: number) => (
          <ImagePreview
            key={index}
            className={`${activeImage === index ? "active" : ""}`}
          >
            <ReactImageZoom
              {...{
                img: item.url,
                zoomLensStyle: `
                  cursor: pointer; 
                  opacity: 0.4; 
                  background-color: gray;
                `,
                width: 650,
                height: 650,
                zoomWidth: 450,
                scale: 0.75,
                zoomStyle: `
                  background-color: white;
                  z-index: 999;
                  box-shadow: rgba(0, 0, 0, 0.25) 0px 6px 8px 2px;
                  border: 1px solid rgb(148, 148, 148);
              `,
              }}
            />
          </ImagePreview>
        ))
      )}
    </ImageGallery>
  );
};

export default React.memo(ImagePreviewGallery);
