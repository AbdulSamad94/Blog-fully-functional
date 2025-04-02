import EditProfile from "@/components/Profile/EditProfile";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <EditProfile params={params} />;
};

export default Page;
