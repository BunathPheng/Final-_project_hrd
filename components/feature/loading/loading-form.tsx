import Image, { StaticImageData } from "next/image";
import defaultLogo from "../../../public/loading/loading.svg";

interface LoadingFormProps {
  title: string;
  imageSrc?: string | StaticImageData;
  titleColor?: string;
}

export default function LoadingForm({
  title,
  imageSrc,
  titleColor = "text-white", 
}: LoadingFormProps) {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={imageSrc || defaultLogo}
        className="w-7 h-7 object-cover"
        width={28}
        height={28}
        alt="loading"
      />
      <p className={`text-btb-sm ${titleColor}`}>{title}</p>
    </div>
  );
}
