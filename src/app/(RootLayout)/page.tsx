import HomePageCarousel from "@/components/home/HomePageCarousel";
import MultiHomeSection from "@/components/home/MultiHomeSection";

async function HomePage() {

  return (
    <div>
      <div>
        <HomePageCarousel />
        <MultiHomeSection />
      </div>
    </div>
  )
}

export default HomePage
