import Link from "next/link";

export default function Contact() {
    return (
        <div>
            <h1>Contact us</h1>
            <div className="flex">
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
    )
}