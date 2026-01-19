import Homepage from "@/app/Components/Homepage";
import Ads from "@/app/Components/ads";

export default function Home() {
  return (
    <>
      {/* max-width 1365px */}
      <div className="max-w-[1365px] mx-auto px-4 py-5">
        <Ads />
      </div>
      <div className="max-w-[1365px] px-4 py-5">
        <Homepage />
      </div>
    </>
  );
}