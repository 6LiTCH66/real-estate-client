import React, {FC, memo} from "react";

interface ImageProps {
    src: string;
    alt: string;
}


const Image: FC<ImageProps> = ({ src, alt }) => {
    return <img src={src} alt={alt} loading="lazy"/>;
};
export default memo(Image);