import Homepage from "./Components/Homepage";
import Ads from "./Components/Ads";

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