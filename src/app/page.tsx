import HeroSection from "@/components/hero";
import LatestBlog from "@/components/LatestBlog";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <LatestBlog />
    </main>
  );
}
