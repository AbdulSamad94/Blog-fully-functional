// src/components/post/MakePostImagePreview.tsx
import Image from "next/image";
import { PencilIcon } from "lucide-react";

interface MakePostImagePreviewProps {
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MakePostImagePreview = ({
  imagePreview,
  handleImageChange,
}: MakePostImagePreviewProps) => {
  return (
    <div className="relative group rounded-lg overflow-hidden">
      {imagePreview && (
        <div className="w-full h-64 relative">
          <Image
            src={imagePreview}
            alt="Post Image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <label htmlFor="post-image" className="cursor-pointer">
              <div className="bg-white bg-opacity-90 rounded-full p-3 flex flex-col items-center">
                <PencilIcon size={24} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-800 mt-1">
                  Change Image
                </span>
              </div>
            </label>
          </div>
        </div>
      )}
      <input
        id="post-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        required
      />
    </div>
  );
};

export default MakePostImagePreview;
