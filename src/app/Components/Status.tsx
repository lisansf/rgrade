import Link from "next/link";

export const LoadingComponent = () => <p className="text-center text-gray-500">Loading...</p>; // * LOADING COMPONENT :D
export const ErrorComponent = ({ msg }: { msg: string }) => <p className="text-red-500 text-center">{msg}</p>; // * ERROR COMPONENT :D
export const PostNotFound = () => (
    <div className="w-full p-6 bg-yellow-100 text-yellow-700 text-center rounded-lg">
        <h1 className="text-2xl font-bold">Postingan atau Halaman Tidak Ditemukan</h1>
        <p>Maaf, postingan yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link href="/" className="text-blue-500 hover:underline">Kembali ke Beranda</Link>
    </div>
)
