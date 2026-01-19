"use client"
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-customDarkBlue text-white p-4 flex flex-col items-center px-5 text-2xl font-bold h-[400px] relative">
      {/* Text Section */}
      <div className="flex gap-8">
        <p>Tech</p>
        <p>Movie</p>
        <p>Anime</p>
        <p>Game</p>
      </div>

      {/* Logo, Garis, dan Lorem Ipsum */}
      <div className="flex flex-row gap-6 items-center pt-6 mt-4">
        {/* Logo */}
        <img src="/img/Logo_White.png" className="w-[8rem] h-[7rem]" alt="Logo" />

        {/* Garis */}
        <img src="/img/Garis.png" className="w-[0.4rem] h-[7rem]" alt="Separator" />

        {/* Text */}
        <div className="w-[472px]">
          <p className="text-lg font-semibold line-clamp-3 overflow-hidden">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros sed ultrices condimentum. Mauris imperdiet nibh metus
          </p>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="flex flex-col items-center mt-6">
        <p className="text-xl font-bold">Follow Us</p>

        {/* Social Media Icons */}
        <div className="flex gap-6 mt-4">
          {/* Gmail */}
          <Link href="mailto:example@gmail.com">
            <img src="/img/gmail-icon.png" alt="Gmail" className="w-10 h-10" />
          </Link>

          {/* Instagram */}
          <Link href="https://www.instagram.com/retrogrademedia24/" target="_blank" rel="noopener noreferrer">
            <img src="/img/instagram-icon2.png" alt="Instagram" className="w-10 h-10" />
          </Link>

          {/* Teflon */}
          <Link href="https://wa.me/6282217193687" target="_blank" rel="noopener noreferrer">
            <img src="/img/call-icon.png" alt="Teflon" className="w-10 h-10" />
          </Link>
        </div>
      </div>

      {/* Support Us Text */}
      <p className="text-gray-400 text-sm mt-auto absolute bottom-2">Support Us</p>
    </div>
  );
}