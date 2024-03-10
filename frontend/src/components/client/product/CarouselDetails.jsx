import React, { useState, useEffect } from 'react';

const CarouselDetails = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const length = images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prevCurrent => (prevCurrent === length - 1 ? 0 : prevCurrent + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [length]);

    const changeSlide = (index) => {
        setCurrent(index);
    }

    return (
        <div>
            <div className="w-full">
                <div className="h-96 overflow-hidden rounded-lg max-w-xs m-auto">
                    <img src={images[current]} alt="product" className="w-full !h-full object-cover" />
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-4">
                {images.map((product, index) => (
                    <div className="h-36 overflow-hidden rounded-lg w-full m-auto">
                        <img
                            key={index}
                            src={product}
                            alt={`product ${index + 1}`}
                            className={`!h-full w-full object-cover cursor-pointer border ${index === current ? 'border-primary' : ''} rounded-lg`}
                            onClick={() => changeSlide(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselDetails;
