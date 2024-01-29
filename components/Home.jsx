import Image from "next/image";

function Home() {
  return (
    <main className="grid grid-cols-2">
      <div className="relative max-sm:static  max-sm:text-center">
        <div className="absolute top-64 left-10 max-sm:left-24">
          <h1 className="text-white text-4xl">
            Satisfy Your Curiosity,
            <br />
            One Question At A Time!
          </h1>
          <h3 className="text-xl text-gray-400">Handle your quiz with ease.</h3>
          <button className="border border-none text-white bg-blue-600 px-3 py-1 rounded-full ms-20 mt-3 max-sm:ms-0">
            Browse Quizzes
          </button>
        </div>
      </div>
      <div className=" max-sm:hidden">
        <Image src="/assets/images/lg1.png" width={500} height={500} />
      </div>
    </main>
  );
}

export default Home;
