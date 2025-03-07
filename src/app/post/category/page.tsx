import Link from "next/link";

export default function Category() {
    return (
        <div className="w-full">
            <h1 className="w-fit">Category</h1>
            <div className="w-fit flex flex-col">
                <Link href="/post/category/film">Film & Series</Link>
                <Link href="/post/category/music">Musik</Link>
                <Link href="/post/category/games">Games</Link>
                <Link href="/post/category/photography">Photography</Link>
                <Link href="/post/category/art">Art & Design</Link>
            </div>
        </div>
    )
}