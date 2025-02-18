export default function Landingpage() {
    return (
        <>
            {/* Wrapper Section for Article and Guide */}
            <div className="flex gap-8 w-full">

                {/* Article Section */}
                <section className="relative flex gap-8 flex-wrap w-[856px]">
                    {/* Artikel 1 dan 2 */}
                    <div className="flex gap-8 w-full">
                        {/* Artikel 1 */}
                        <div className="relative w-[500px] h-[280px]">
                            {/* kotak Artikel 1 */}
                            <img
                                src="https://via.placeholder.com/500x280"
                                alt="Article Image"
                                className="w-full h-[280px] object-cover"
                            />
                            {/* Judul artikel 1 */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat. Duis hendrerit, erat vitae efficitur volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Artikel 2 */}
                        <div className="flex flex-col items-center w-[337px]">
                            {/* kotak Artikel 2 */}
                            <img
                                src="https://via.placeholder.com/337x189"
                                alt="Article Image"
                                className="w-full h-[189px] object-cover"
                            />
                            {/* Judul artikel 2 */}
                            <div className="w-[337px] h-[90px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Artikel 3 dan 4 berada di bawah Artikel 1 dan 2 */}
                    <div className="flex gap-8 w-full mt-8">
                        {/* Artikel 3 */}
                        <div className="relative overflow-hidden w-[500px] h-[280px]">
                            {/* kotak Artikel 3 */}
                            <img
                                src="https://via.placeholder.com/500x280"
                                alt="Article Image"
                                className="w-full h-[280px] object-cover"
                            />
                            {/* Judul artikel 3 */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat. Duis hendrerit, erat vitae efficitur volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Artikel 4 */}
                        <div className="flex flex-col items-center w-[337px] relative" style={{ top: '-50px' }}>
                            {/* kotak Artikel 4 */}
                            <img
                                src="https://via.placeholder.com/337x189"
                                alt="Article Image"
                                className="w-full h-[189px] object-cover"
                            />
                            {/* Judul artikel 4 */}
                            <div className="w-[337px] h-[90px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>




                {/* Guide Section */}
                <section className="relative py-5 flex justify-start w-[405px]">
                    {/* Buat kotak nya */}
                    <div className="absolute top-0 right-0 bg-[#ECB365] w-[405px] h-[28px] items-center flex">
                        <span className="text-white font-semibold pl-2">Tips & Guide</span>
                    </div>

                    {/* Container Guide */}
                    <div className="flex flex-col gap-2 pt-4">

                        {/* Guide 1 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Guide 1 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover" />
                            {/* Judul Guide 1 */}
                            <div className="flex-grow w-[270px] h-[97px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Guide 2 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Guide 2 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover"
                            />
                            {/* Judul Guide 2 */}
                            <div className="flex-grow h-[97px] w-[270px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Guide 3 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Guide 2 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover" />

                            {/* Judul Guide 3 */}
                            <div className="flex-grow h-[97px] w-[270px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Guide 4 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Guide 4 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover" />

                            {/* Judul Guide 4 */}
                            <div className="flex-grow h-[97px] w-[270px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Guide 5 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Guide 5 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover" />

                            {/* Judul Guide 5 */}
                            <div className="flex-grow h-[97px] w-[270px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                    </div>
                </section>
            </div>







            <section className="flex flex-row gap-4">
                {/* Ad Space Left */}
                <div className="relative flex pt-28 flex-wrap w-[279px]">
                    <div className="bg-gray-300 flex items-center justify-center text-center">
                        <div className="w-full sm:w-[100px] sm:h-[100px] bg-gray-400 md:w-[150px] md:h-[200px] lg:w-[279px] lg:h-[578px]">
                            <p className="text-gray-700 text-xs lg:text-sm flex">Ad Space</p>
                        </div>
                    </div>
                </div>

                {/* Trending Section */}
                <div className="relative pt-28 w-full">
                    {/* Buat kotak Trending */}
                    <div className="top-0 right-0 bg-[#ECB365] w-[740px] h-[28px] items-center flex">
                        <span className="text-white font-semibold pl-2">Trending</span>
                    </div>

                    {/* Container Trending */}
                    <div className="flex flex-col gap-2 pt-4">
                        {/* Trending 1 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Trending 1 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover"
                            />
                            {/* Judul Trending 1 */}
                            <div className="flex-grow h-[97px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-2 overflow-hidden w-[500px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Trending 2 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Trending 2 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover"
                            />
                            {/* Judul Trending 2 */}
                            <div className="flex-grow h-[97px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-2 overflow-hidden w-[500px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Trending 3 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Trending 3 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover"
                            />
                            {/* Judul Trending 3 */}
                            <div className="flex-grow h-[97px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-2 overflow-hidden w-[500px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Trending 4 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Trending 4 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover"
                            />
                            {/* Judul Trending 4 */}
                            <div className="flex-grow h-[97px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-2 overflow-hidden w-[500px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>

                        {/* Trending 5 */}
                        <div className="flex flex-row items-start gap-4">
                            {/* Kotak Trending 5 */}
                            <img
                                src="https://via.placeholder.com/173x97"
                                alt="Article Image"
                                className="w-[173px] h-[97px] object-cover"
                            />
                            {/* Judul Trending 5 */}
                            <div className="flex-grow h-[97px]">
                                <h3 className="text-lg font-semibold text-black line-clamp-2 overflow-hidden w-[500px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Aliquam erat volutpat.
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ad Space Right */}
                <div className="relative flex pt-28 flex-wrap w-[279px]">
                    <div className="bg-gray-300 flex items-center justify-center text-center">
                        <div className="w-full sm:w-[100px] sm:h-[100px] bg-gray-400 md:w-[150px] md:h-[200px] lg:w-[279px] lg:h-[578px]">
                            <p className="text-gray-700 text-xs lg:text-sm flex">Ad Space</p>
                        </div>
                    </div>
                </div>

            </section>

            <div className="relative flex pt-10 flex-wrap w-[1332px]">
                <div className="bg-gray-300 flex items-center justify-center text-center">
                    <div className="w-full sm:w-[100px] sm:h-[100px] bg-gray-400 md:w-[150px] md:h-[200px] lg:w-[1332px] lg:h-[200px]">
                        <p className="text-gray-700 text-xs lg:text-sm flex">Ad Space</p>
                    </div>
                </div>
            </div>

        </>
    );
}
