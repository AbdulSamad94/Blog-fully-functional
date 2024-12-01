import HeroSection from "@/components/hero";
import LatestBlog from "@/components/LatestBlog";

export default async function Home() {
  return (
    <main className="h-[4000px]">
      <HeroSection />
      <LatestBlog />
    </main>
  );
}
