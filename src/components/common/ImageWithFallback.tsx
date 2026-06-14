'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type ImageWithFallbackProps = Omit<ImageProps, 'src'> & {
  src?: ImageProps['src'] | null;
  fallbackSrc: ImageProps['src'];
};

export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const initialSrc = src || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const isFallback = currentSrc === fallbackSrc;

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [fallbackSrc, src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        onError?.(event);
        if (!isFallback) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
