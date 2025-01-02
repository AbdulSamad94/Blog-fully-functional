import React from "react";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <div>{id}</div>
    </div>
  );
};

export default page;
