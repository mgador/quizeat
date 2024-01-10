"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const pathname = usePathname();
  return (
    <nav className="flex justify-between text-white mt-1.5 items-center ">
      <h1 className="font-bold text-xl">🎮 QuizEat</h1>
      <div className="md:space-x-20">
        {links.map((link) => {
          return (
            <Link
              className={pathname === link.href ? "text-blue-600" : ""}
              key={link.name}
              href={link.href}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="">
        <Link href="/login" className="me-2">
          Log in
        </Link>
        <Link
          href="/signup"
          className="border border-none bg-blue-600 rounded-full px-3 py-1 "
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
