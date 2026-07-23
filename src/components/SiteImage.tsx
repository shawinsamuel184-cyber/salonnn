import type { SyntheticEvent } from "react";
import {
  type LocalImageRef,
  handleImageError,
} from "../config/images";

type SiteImageProps = {
  image: LocalImageRef;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
  onError?: () => void;
};

export function SiteImage({ image, alt, className, loading = "eager", fetchPriority = "auto", width, height, onError }: SiteImageProps) {
  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (onError) {
      onError();
    } else {
      handleImageError(e, image);
    }
  };

  return (
    <img
      src={image.src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      data-img-folder={image.folder}
      data-img-base={image.basename}
      data-ext-index={String(image.startExtIndex ?? 0)}
      onError={handleError}
    />
  );
}
