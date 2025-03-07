// export default function Ads(){
//     return(
//         <>
//         {/* Space for Ads */}
//       <section className="flex justify-center bg-gray-200 py-5">
//         <div className="bg-gray-300 flex items-center justify-center text-center gap-12">

//           <div className="w-full sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-gray-400">
//             <p className="text-gray-700 text-xs lg:text-sm flex">Ad Space - Leaderboard (Responsive)</p>
//           </div>

//           <div className="w-full sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-gray-400">
//             <p className="text-gray-700 text-xs lg:text-sm">Ad Space - Leaderboard (Responsive)</p>
//           </div>

//           <div className="w-full sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-gray-400">
//             <p className="text-gray-700 text-xs lg:text-sm">Ad Space - Leaderboard (Responsive)</p>
//           </div>

//           <div className="w-full sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-gray-400">
//             <p className="text-gray-700 text-xs lg:text-sm">Ad Space - Leaderboard (Responsive)</p>
//           </div>


//         </div>
//       </section>
//         </>
//     )
// }

export default function Ads() {
  const adBoxes = Array(4).fill(0);

  return (
    <section className="flex justify-center py-5">
      <div className="grid grid-cols-2 gap-28 lg:grid-cols-4">
        {adBoxes.map((_, index) => (
          <div
            key={index}
            className="w-full sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] bg-gray-400">
            <p className="Text-gray-700 text-xs lg:text-sm">
              Ad Space - {index + 1}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}