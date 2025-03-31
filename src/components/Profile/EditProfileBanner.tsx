// src/components/profile/EditProfileBanner.tsx
import Image from "next/image";
import { PencilIcon } from "lucide-react";

interface EditProfileBannerProps {
  bannerImagePreview: string | null;
  handleBannerImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditProfileBanner = ({
  bannerImagePreview,
  handleBannerImageChange,
}: EditProfileBannerProps) => {
  return (
    <div className="relative group rounded-lg overflow-hidden">
      {bannerImagePreview && (
        <div className="w-full h-64 relative">
          <Image
            src={bannerImagePreview}
            alt="Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <label htmlFor="banner-image" className="cursor-pointer">
              <div className="bg-white bg-opacity-90 rounded-full p-3 flex flex-col items-center">
                <PencilIcon size={24} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-800 mt-1">
                  Change Banner
                </span>
              </div>
            </label>
          </div>
        </div>
      )}
      <input
        id="banner-image"
        type="file"
        accept="image/*"
        onChange={handleBannerImageChange}
        className="hidden"
      />
    </div>
  );
};

export default EditProfileBanner;
