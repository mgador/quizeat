import Image from "next/image";
import Link from "next/link";

function AuthContainer({ children }) {
  return (
    <main className="grid grid-cols-5">
      <div
        className=" h-screen p-5 relative bg-no-repeat bg-center bg-cover col-span-2 max-sm:hidden"
        style={{ backgroundImage: "url('/assets/images/lg2.png')" }}
      >
        <h1 className="text-white font-bold text-xl">🎮 QuizEat</h1>
      </div>
      <div className="p-5 col-span-3">
        <Link href="/" className="text-white font-light text-sm">
          &lt; Back
        </Link>
        <div className="relative text-white">{children}</div>
      </div>
    </main>
  );
}

export default AuthContainer;
