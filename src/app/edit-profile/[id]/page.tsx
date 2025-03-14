"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { PencilIcon, CheckCircle, X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

interface UserType {
  _id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  followers: string[];
  Bannerimage: {
    id: string;
    url: string;
  };
}

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const EditProfilePage = ({ params }: RouteParams) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // User data states
  const [id, setId] = useState<string>("");
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Form states
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Resolve route params and fetch user data
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const { id } = await params;
        setId(id);
      } catch (error) {
        console.error("Failed to resolve params:", error);
      }
    };
    resolveParams();
  }, [params]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            toast.error("User not found");
            router.push("/");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const user: UserType = await response.json();
        setUserData(user);
        setName(user.name);
        setBio(user.bio);
        setProfileImagePreview(user.image);
        setBannerImagePreview(user.Bannerimage.url);
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id, router]);

  // Check if current user is authorized to edit this profile
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (userData && session && userData._id !== session.user.id) {
      toast.error("You're not authorized to edit this profile");
      router.push("/");
    }
  }, [userData, session, status, router]);

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle banner image change
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setBannerImage(file);
      setBannerImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nextjs_blog_imgs");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwd9h8qgy/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Cloudinary upload error:", errorData);
        throw new Error(errorData.error?.message || "Failed to upload image");
      }

      const data = await res.json();
      return {
        id: data.public_id,
        url: data.secure_url,
      };
    } catch (err) {
      console.error("Image upload failed:", err);
      throw new Error("Failed to upload image");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Validate inputs
      if (!name.trim()) {
        toast.error("Name cannot be empty");
        setIsSaving(false);
        return;
      }

      // Prepare update data
      const updateData: any = {
        name,
        bio,
      };

      // Upload profile image if changed
      if (profileImage) {
        const uploadedProfileImage = await uploadToCloudinary(profileImage);
        if (uploadedProfileImage) {
          updateData.image = uploadedProfileImage.url;
        }
      }

      // Upload banner image if changed
      if (bannerImage) {
        const uploadedBannerImage = await uploadToCloudinary(bannerImage);
        if (uploadedBannerImage) {
          updateData.Bannerimage = {
            id: uploadedBannerImage.id,
            url: uploadedBannerImage.url,
          };
        }
      }

      // Update user data
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.push(`/profile/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center mt-20 text-4xl text-red-600 font-semibold">
        Sign In to edit profile!
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <div className="w-full max-w-3xl">
          <Skeleton className="h-12 w-64 mb-10" />
          <Skeleton className="h-64 w-full mb-8 rounded-lg" />
          <div className="flex justify-center mb-8">
            <Skeleton className="h-32 w-32 rounded-full" />
          </div>
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-32 w-full mb-6" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center py-10 px-4"
    >
      <div className="lg:w-[85%] xl:w-[65%] mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-wide mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Image */}
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

          {/* Profile Image */}
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
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </motion.section>
  );
};

export default EditProfilePage;
