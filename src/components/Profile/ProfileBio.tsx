// src/components/profile/ProfileBio.tsx

interface ProfileBioProps {
  bio: string;
}

const ProfileBio = ({ bio }: ProfileBioProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">Bio</h3>
      <p className="text-gray-700">{bio}</p>
    </div>
  );
};

export default ProfileBio;
