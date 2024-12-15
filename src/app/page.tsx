import HeroSection from "@/components/Hero/hero";
import LatestBlog from "@/components/Hero/LatestBlog";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <LatestBlog />
    </main>
  );
}
