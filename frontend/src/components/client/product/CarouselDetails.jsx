import React, { useState, useEffect } from 'react';

const CarouselDetails = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const length = 5;

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
            <img src={images[current]} alt="product" className="w-full" />
            <div className="grid grid-cols-5 gap-4 mt-4">
                {images.map((product, index) => (
                    <img
                        key={index}
                        src={product}
                        alt={`product ${index + 1}`}
                        className={`w-full cursor-pointer border ${index === current ? 'border-primary' : ''}`}
                        onClick={() => changeSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselDetails;
