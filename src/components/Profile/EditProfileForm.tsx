// src/components/profile/EditProfileForm.tsx
import { useRouter } from "next/navigation";
import { CheckCircle, X } from "lucide-react";

interface EditProfileFormProps {
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  isSaving: boolean;
  router: ReturnType<typeof useRouter>;
  id: string;
}

const EditProfileForm = ({
  name,
  setName,
  bio,
  setBio,
  isSaving,
  router,
  id,
}: EditProfileFormProps) => {
  return (
    <>
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-lg font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm py-3 px-4"
          required
        />
      </div>

      {/* Bio Input */}
      <div className="space-y-2">
        <label htmlFor="bio" className="block text-lg font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
          rows={4}
          className="w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm py-3 px-4"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 rounded-md transition-all bg-blue-600 text-white py-2 px-6 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <CheckCircle size={18} />
              Save Changes
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push(`/profile/${id}`)}
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white text-gray-700 py-2 px-6 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <X size={18} />
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditProfileForm;
