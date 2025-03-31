// src/components/profile/EditProfilePicture.tsx
import Image from "next/image";
import { PencilIcon } from "lucide-react";

interface EditProfilePictureProps {
  profileImagePreview: string | null;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditProfilePicture = ({
  profileImagePreview,
  handleProfileImageChange,
}: EditProfilePictureProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative group">
        {profileImagePreview && (
          <div className="relative">
            <Image
              src={profileImagePreview}
              alt="Profile"
              width={140}
              height={140}
              className="rounded-full object-cover w-[140px] h-[140px] border-4 border-background shadow-lg"
            />
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <label htmlFor="profile-image" className="cursor-pointer">
                <PencilIcon size={24} className="text-white" />
              </label>
            </div>
          </div>
        )}
        <input
          id="profile-image"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default EditProfilePicture;
