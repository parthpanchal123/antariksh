import { useState, useEffect, CSSProperties } from "react";
import Image from 'next/image'

const LoadingImage = (props: any) => {
    const [showImage, setShowImage] = useState(false);
    const [imageStyles, setImageStyles] = useState<CSSProperties>({
        visibility: "hidden",
        height: "1px",
        width: "1px"
    });

    const imageVisible: CSSProperties = {
        visibility: "visible",
        height: "auto",
        width: "auto"
    };

    function showImageCallback() {
        setShowImage(true);
        setImageStyles(imageVisible);
    }
    
    return (
        <div className="imageWrapper"> 
            <div
                className={["rounded-lg loaderWrapper",!showImage ? 'fadeIn' : 'fadeOut'].join(' ')}
                style={{width: `${props.width}px`,height: `${props.height}px`}}
            >
                <Image
                    src="/icon-192x192.png"
                    alt="Loading..."
                    width="192px"
                    height="192px"
                    className={'spinAnimation'}
                />
            </div>
             <Image
                src={props.src}
                alt="Test"
                width={props.width}
                height={props.height}
                className={[
                    props.classes, 
                    showImage ? 'fadeIn' : 'fadeOut'].join(' ')}
                onLoad={() => showImageCallback()}
                onClick={() => props.click()}
            />
        </div>
    )
}

export default LoadingImage;