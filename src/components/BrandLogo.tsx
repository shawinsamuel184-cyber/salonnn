import { useState } from "react";
import { logoImage } from "../config/images";
import { siteConfig } from "../config/siteConfig";
import { SiteImage } from "./SiteImage";

type BrandLogoProps = {
  className?: string;
  textClassName?: string;
  imgClassName?: string;
};

export function BrandLogo({ className = "", textClassName = "", imgClassName = "h-12 w-auto max-w-[200px] object-contain" }: BrandLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!imageFailed) {
    return (
      <SiteImage 
        image={logoImage} 
        alt={siteConfig.name} 
        className={`${imgClassName} ${className}`}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span className={`font-black tracking-[0.22em] ${textClassName} ${className}`} style={{ color: "#FFFFFF" }}>
      {siteConfig.shortName}
    </span>
  );
}
