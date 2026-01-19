"use client";
import { useEffect, useState } from "react";
import { LoadingComponent, ErrorComponent } from "@/app/Components/Status";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";

export default function Landingpage() {
	const [posts, setPosts] = useState<Post[]>([]); // Tambahkan tipe array Post
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState("");

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const data: Post[] = await getPosts(); // Berikan tipe untuk respons data
				// console.log(data) // Debugging
				setPosts(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setIsError(err.message);
				} else {
					setIsError("unknown Error!");
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (isLoading) {
		return <LoadingComponent />;
	}

	if (isError) {
		return <ErrorComponent msg={`Error: ${isError}`} />;
	}

	return (
		<>
			<div className="flex gap-8 w-full">
				{/* Wrapper Section for Article and Guide */}
				<section className="relative flex gap-8 flex-wrap w-[856px]">
					<div className="flex gap-8 w-full">
						{/* Artikel 1 */}
						{posts.length > 0 && (
							<div key={posts[0]._id} className="relative w-[500px] h-[280px]">
								<img
									src={posts[0].images[0] || "https://placehold.co/337x189"}
									alt="Article Image"
									className="w-full h-[280px] object-cover"
								/>
								<div className="absolute bottom-0 left-0 right-0 p-4">
									<h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
										<a href={`${posts[0].title.replace(/\s+/g, "-")}`}>
											{posts[0].title}
										</a>
									</h3>
								</div>
							</div>
						)}
						{/* Artikel 2 */}
						{posts.length > 1 && (
							<div
								key={posts[1]._id}
								className="flex flex-col items-center w-[337px]"
							>
								<img
									src={posts[1]?.images[1] || "https://placehold.co/337x189"}
									alt="Article Image"
									className="w-full h-[189px] object-cover"
								/>
								<div className="w-[337px] h-[90px]">
									<h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
										<a href={`${posts[1].title.replace(/\s+/g, "-")}`}>
											{posts[1].title}
										</a>
									</h3>
								</div>
							</div>
						)}
					</div>
					<div className="flex gap-8 w-full">
						{/* Artikel 3 */}
						{posts.length > 0 && (
							<div key={posts[2]._id} className="relative w-[500px] h-[280px]">
								<img
									src={posts[2]?.images[0] || "https://placehold.co/337x189"}
									alt="Article Image"
									className="w-full h-[280px] object-cover"
								/>
								<div className="absolute bottom-0 left-0 right-0 p-4">
									<h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
										<a href={`${posts[2].title.replace(/\s+/g, "-")}`}>
											{posts[2].title}
										</a>
									</h3>
								</div>
							</div>
						)}
						{/* Artikel 4 */}
						{posts.length > 1 && (
							<div
								key={posts[3]._id}
								className="flex flex-col items-center w-[337px]"
							>
								<img
									src={posts[3]?.images[1] || "https://placehold.co/337x189"}
									alt="Article Image"
									className="w-full h-[189px] object-cover"
								/>
								<div className="w-[337px] h-[90px]">
									<h3 className="text-lg font-semibold text-black line-clamp-3 overflow-hidden">
										<a href={`${posts[3].title.replace(/\s+/g, "-")}`}>
											{posts[3].title}
										</a>
									</h3>
								</div>
							</div>
						)}
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
						{posts.map((post, index) => (
							<div key={index} className="flex flex-row items-start gap-4">
								<img
									src={post.images[0] || "https://placehold.co/173x97"}
									alt="Article Image"
									className="w-[173px] h-[97px] object-cover"
								/>
								<div className="flex-grow h-[97px]">
									<h3 className="text-lg font-semibold text-black line-clamp-2 overflow-hidden w-[500px]">
										<a href={`${post.title.replace(/\s+/g, "-")}`}>
											{post.title}
										</a>
									</h3>
								</div>
							</div>
						))}
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
						{/* Trending Section */}
						<div className="flex flex-col gap-2 pt-4">
							{posts.slice(0, 5).map((post, index) => (
								<div key={index} className="flex flex-row items-start gap-4">
									<img
										src={post.images[0] || "https://placehold.co/173x97"}
										alt="Article Image"
										className="w-[173px] h-[97px] object-cover"
									/>
									<div className="flex-grow h-[97px]">
										<h3 className="text-lg font-semibold text-black line-clamp-2 overflow-hidden w-[500px]">
											<a href={`${post.title.replace(/\s+/g, "-")}`}>
												{post.title}
											</a>
										</h3>
									</div>
								</div>
							))}
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
