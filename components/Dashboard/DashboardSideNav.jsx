import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
function DashboardSideNav() {
  return (
    <div className="drawer static">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost drawer-button text-xl"
        >
          <GiHamburgerMenu />
        </label>
      </div>
      <div className="drawer-side z-50 ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-3 w-80 min-h-full bg-base-200 text-base-content">
          <li className=" mb-3.5">
            <Link href="/dashboard" className=" text-white text-xl font-bold">
              🎮 QuizCraft
            </Link>
          </li>
          <li>
            <Link href="/dashboard/quizzes">Quizzes</Link>
          </li>
          <li>
            <Link href="/dashboard/myQuizzes">My Quizzes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardSideNav;
