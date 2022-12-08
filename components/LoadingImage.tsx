import { useState } from "react";
import Image from 'next/legacy/image'

const LoadingImage = (props: any) => {
    const [showImage, setShowImage] = useState(false);

    function showImageCallback() {
        setShowImage(true);
    }
    
    // @ts-ignore
    return (
        <div className="imageWrapper"> 
            <div
                className={["rounded-lg loaderWrapper",!showImage ? 'fadeIn' : 'fadeOut'].join(' ')}
                style={{width: `${props.width}`,height: `${props.height}`}}
            >
                <Image
                    src="/icon-192x192.png"
                    alt="Loading..."
                    width="192"
                    height="192"
                    className={['spinAnimation', 'max-w-full', 'max-h-full'].join(' ')}
                    priority
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