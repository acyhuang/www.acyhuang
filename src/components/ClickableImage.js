import React, { useState } from 'react';

const ClickableImage = ({ src, alt, className }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const toggleEnlarge = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer ${className}`}
        onClick={toggleEnlarge}
      />
      {isEnlarged && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={toggleEnlarge}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-[90%] max-h-[90%] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default ClickableImage;