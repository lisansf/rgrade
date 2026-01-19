import Link from "next/link";

export default function Category() {
    return (
        <div className="w-full">
            <h1 className="w-fit">Category</h1>
            <div className="w-fit flex flex-col">
                <Link href="/category/film">Film & Series</Link>
                <Link href="/category/music">Musik</Link>
                <Link href="/category/games">Games</Link>
                <Link href="/category/photography">Photography</Link>
                <Link href="/category/art">Art & Design</Link>
            </div>
        </div>
    )
}