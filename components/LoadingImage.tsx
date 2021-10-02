import { useState, CSSProperties } from "react";
import Image from 'next/image'

const LoadingImage = (props: any) => {
    const [showImage, setShowImage] = useState(false);

    const imageVisible: CSSProperties = {
        visibility: "visible",
        height: "auto",
        width: "auto"
    };

    function showImageCallback() {
        setShowImage(true);
    }
    
    return (
        <div className="imageWrapper"> 
            <div
                className={["rounded-lg loaderWrapper",!showImage ? 'fadeIn' : 'fadeOut'].join(' ')}
                style={{width: `${props.width}`,height: `${props.height}`}}
            >
                <Image
                    src="/icon-192x192.png"
                    alt="Loading..."
                    width="192px"
                    height="192px"
                    className={['spinAnimation', 'max-w-full', 'max-h-full'].join(' ')}
                    priority={true}
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