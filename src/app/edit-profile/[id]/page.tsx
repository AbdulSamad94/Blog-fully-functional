import EditProfile from "@/components/profile/EditProfile";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <EditProfile params={params} />;
};

export default Page;
