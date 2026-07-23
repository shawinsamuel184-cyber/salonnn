import type { SyntheticEvent } from "react";

/**
 * Universal local images — any common format works automatically.
 * Drop files in `public/images/` (see each folder's README).
 * The site tries: jpg → jpeg → png → webp → gif → avif → bmp → svg
 */

export const IMAGE_EXTENSIONS = [
  "webp",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "avif",
  "bmp",
  "svg",
] as const;

// Extension index constants
const WEBP_EXT_INDEX = IMAGE_EXTENSIONS.indexOf("webp");
const JPG_EXT_INDEX = IMAGE_EXTENSIONS.indexOf("jpg"); // for cuts only
const PNG_EXT = IMAGE_EXTENSIONS.indexOf("png"); // for logo

const u = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80&fm=jpg`;

export const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%23201a22'/><stop offset='100%' stop-color='%23100d14'/></linearGradient></defs><rect width='400' height='500' fill='url(%23g)'/><g fill='none' stroke='%23D4A373' stroke-width='2' opacity='0.7'><circle cx='200' cy='190' r='50'/><path d='M130 360c0-40 30-70 70-70s70 30 70 70'/><path d='M170 210 l60 60 M230 210 l-60 60'/><path d='M150 130 q50 -60 100 0'/></g></svg>`
  );

export type LocalImageRef = {
  folder: string;
  basename: string;
  /** Alternate file names to try (e.g. g(1) vs g (1)) */
  basenameVariants?: string[];
  /** Which extension to try first (default 0 = jpg) */
  startExtIndex?: number;
  src: string;
  fallback: string;
};

export function basenameVariantsFor(...names: string[]) {
  return [...new Set(names.filter(Boolean))];
}

export function localImagePath(folder: string, basename: string, extIndex = 0) {
  const ext = IMAGE_EXTENSIONS[extIndex] ?? IMAGE_EXTENSIONS[0];
  const file = `${basename}.${ext}`;
  const base = import.meta.env.BASE_URL;
  return `${base}images/${folder}/${encodeURI(file)}`;
}

export function createLocalImage(
  folder: string,
  basename: string,
  fallback: string,
  variants?: string[],
  startExtIndex = 0
): LocalImageRef {
  const basenameVariants = basenameVariantsFor(basename, ...(variants ?? []));
  const primary = basenameVariants[0];
  return {
    folder,
    basename: primary,
    basenameVariants,
    startExtIndex,
    fallback,
    src: localImagePath(folder, primary, startExtIndex),
  };
}

/** Enhanced error handling: try all basename variants and all extensions */
export function handleImageError(
  e: SyntheticEvent<HTMLImageElement>,
  image?: LocalImageRef | { fallback?: string; folder?: string; basename?: string; basenameVariants?: string[] }
) {
  const el = e.currentTarget;
  const folder = image?.folder ?? el.dataset.imgFolder;
  const variants = image && "basenameVariants" in image ? image.basenameVariants : (image?.basename ? [image.basename] : []);
  
  if (folder && variants.length) {
    // Parse current state from dataset
    let currentVariant = Number(el.dataset.variantIndex ?? 0);
    let currentExt = Number(el.dataset.extIndex ?? (image?.startExtIndex ?? 0));
    
    // Try next extension first
    if (currentExt + 1 < IMAGE_EXTENSIONS.length) {
      el.dataset.extIndex = String(currentExt + 1);
      el.src = localImagePath(folder, variants[currentVariant], currentExt + 1);
      return;
    }
    
    // If no more extensions, try next basename variant
    if (currentVariant + 1 < variants.length) {
      el.dataset.variantIndex = String(currentVariant + 1);
      el.dataset.extIndex = String(image?.startExtIndex ?? 0);
      el.src = localImagePath(folder, variants[currentVariant + 1], image?.startExtIndex ?? 0);
      return;
    }
  }
  
  // Fallback to placeholder if all else fails
  if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG;
}

export function localImageAttrs(image: LocalImageRef) {
  return {
    src: image.src,
    loading: "lazy",
    "data-img-folder": image.folder,
    "data-img-base": image.basename,
    "data-ext-index": String(image.startExtIndex ?? 0),
    "data-variant-index": "0",
    onError: (e: SyntheticEvent<HTMLImageElement>) => handleImageError(e, image),
  };
}

/** Portfolio marquee — 18 cuts: g (1) … g (18) (also accepts g(1) without space) */
export const CUT_COUNT = 18;

const cutBasenames = (n: number) => [`g (${n})`, `g(${n})`, `g  (${n})`];

const CUT_FALLBACK_IDS = [
  "photo-1503951458645-643d53bfd90f",
  "photo-1521490878406-ddef089da09a",
  "photo-1521590832167-7bcbfaa6381f",
  "photo-1519501025264-65ba15a82390",
  "photo-1493256338651-d82f7acb2b38",
  "photo-1599351431202-1e0f0137899a",
  "photo-1622286342621-4bd786c2447c",
  "photo-1621605815971-fbc98d665033",
  "photo-1622296089863-eb7fc530daa8",
  "photo-1512690459411-b0fd1c86b8b8",
  "photo-1622287162716-f311baa1a2b8",
  "photo-1593702288056-f173e10276be",
  "photo-1580618672591-eb180b1a973f",
  "photo-1618077360395-f3068be8e001",
  "photo-1558953428-41600a4aaf7c",
  "photo-1627904585170-78d9e78f1f33",
  "photo-1605497788044-5a32c7078486",
  "photo-1570158268183-e852d1535280",
];

export type SizedImage = LocalImageRef & {
  id: string;
  number: string;
  size: "tall" | "wide" | "square";
};

export const portfolioCuts: SizedImage[] = Array.from({ length: CUT_COUNT }, (_, i) => {
  const n = i + 1;
  const variants = cutBasenames(n);
  return {
    id: `cut-${n}`,
    ...createLocalImage("cuts", variants[0], u(CUT_FALLBACK_IDS[i], 500), variants, WEBP_EXT_INDEX),
    number: String(n).padStart(2, "0"),
    size: i % 3 === 0 ? "tall" : i % 4 === 1 ? "wide" : "square",
  };
});

/** Hero — add owner + background to public/images/hero/ */
const HERO_BG_FALLBACK =
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80";
const HERO_OWNER_FALLBACK = u("photo-1599351431202-1e0f0137899a", 1000);

export const heroImages = {
  background: createLocalImage("hero", "background", HERO_BG_FALLBACK, undefined, WEBP_EXT_INDEX),
  owner: createLocalImage("hero", "owner", HERO_OWNER_FALLBACK, ["owner", "portrait"], WEBP_EXT_INDEX),
};

/** Site logo — public/images/logo/logo.png */

export const logoImage = createLocalImage(
  "logo",
  "logo",
  "",
  ["logo"],
  WEBP_EXT_INDEX
);

/** My work collage — work-1 … work-6 (stock barber photos until you add your own) */
const WORK_FALLBACK_IDS = [
  "photo-1621605815971-fbc98d665033",
  "photo-1622296089863-eb7fc530daa8",
  "photo-1521590832167-7bcbfaa6381f",
  "photo-1503951458645-643d53bfd90f",
  "photo-1517832606299-7ae9b720a186",
  "photo-1622287162716-f311baa1a2b8",
];

const WORK_IMAGE_NAMES = [
  "work-tools",
  "work-fade",
  "work-beard-trim",
  "work-consultation",
  "work-finish",
  "work-studio",
] as const;

export const workCollage = WORK_FALLBACK_IDS.map((id, i) => ({
  ...createLocalImage("work", WORK_IMAGE_NAMES[i], u(id, 700), [WORK_IMAGE_NAMES[i], `work-${i + 1}`], WEBP_EXT_INDEX),
  position: [
      "left-[2%] top-[2%] w-32 h-44 md:w-40 md:h-52",
      "right-[10%] top-[0%] w-32 h-36 md:w-44 md:h-48",
      "right-[0%] top-[28%] w-28 h-28 md:w-36 md:h-36",
      "left-[0%] top-[42%] w-24 h-40 md:w-32 md:h-48",
      "left-[14%] bottom-[8%] w-40 h-28 md:w-56 md:h-36",
      "right-[16%] bottom-[14%] w-32 h-32 md:w-44 md:h-44",
    ][i],
}));

/** About me timeline — story-1 … story-5 */
const ABOUT_FALLBACK_IDS = [
  "photo-1599351431202-1e0f0137899a",
  "photo-1503951458645-643d53bfd90f",
  "photo-1493256338651-d82f7acb2b38",
  "photo-1521590832167-7bcbfaa6381f",
  "photo-1622286342621-4bd786c2447c",
];

export const aboutImages = ABOUT_FALLBACK_IDS.map((id, i) =>
  createLocalImage("about", `story-${i + 1}`, u(id, 900), [`story-${i + 1}`], WEBP_EXT_INDEX)
);

/** Services — descriptive file names matching each service */
const SERVICE_FALLBACK_IDS = [
  "photo-1622286342621-4bd786c2447c",
  "photo-1521490878406-ddef089da09a",
  "photo-1519501025264-65ba15a82390",
  "photo-1521590832167-7bcbfaa6381f",
  "photo-1621605815971-fbc98d665033",
  "photo-1622296089863-eb7fc530daa8",
  "photo-1599351431202-1e0f0137899a",
  "photo-1493256338651-d82f7acb2b38",
  "photo-1622296089863-eb7fc530daa8",
  "photo-1503951458645-643d53bfd90f",
];

const SERVICE_IMAGE_NAMES = [
  "hair-cut",
  "keratin-treatment",
  "hair-straightening",
  "hair-colouring",
  "hair-styling",
  "beard-trim",
  "head-massage",
  "kids-cut",
  "facial",
  "threading",
] as const;

export const serviceImages = SERVICE_FALLBACK_IDS.map((id, i) =>
  createLocalImage("services", SERVICE_IMAGE_NAMES[i], u(id, 900), undefined, WEBP_EXT_INDEX)
);
