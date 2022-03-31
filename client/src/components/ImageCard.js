import React from 'react'

const ImageCard = ({ image }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={image.url} alt="Random" className="block object-cover object-center w-full rounded-lg" />
            <div className="px-6 py-4">
                <div className="font-bold text-red-600 text-xl mb-2 truncate">{image.url.split("/").pop()}</div>
                <ul>
                    <li><strong>Domain: </strong>{ (new URL(image.url)).hostname}</li>
                    <li><strong>ScrapedAt: </strong>{image.createdAt}</li>
                    {/* <li><strong>Alt: </strong>{image.alt}</li> */}
                </ul>
            </div>
        </div>
    )
}

export default ImageCard