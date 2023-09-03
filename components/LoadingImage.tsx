"use client"
import { useState } from "react";
import Image from "next/image"
import "../styles/globals.css"

const LoadingImage = (props: any) => {
    const [showImage, setShowImage] = useState(false);

    function showImageCallback() {
        setShowImage(true);
    }

    return (
        <div className="imageWrapper">
            <div
                className={["rounded-lg loaderWrapper",!showImage ? 'fadeIn' : 'fadeOut'].join(' ')}
                style={{width: `${props.width}`,height: `${props.height}`}}
                style={{width: "100%", height:"95%" }}
            >
                <Image
                    src="/icon-192x192.png"
                    alt="Loading..."
                    width={192}
                    height={192}
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