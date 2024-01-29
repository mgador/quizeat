"use client";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSideNav from "./DashboardSideNav";

function DashboardNav({ children }) {
  // const { data: session } = useSession();
  const pathname = usePathname();
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const session = await getSession();
      const id = session?.user?.id;
      const res = await fetch(`../api/users/${id}`);
      const body = await res.json();
      setData(body.user);
    }

    getData();
  }, []);

  return (
    <nav className="navbar fixed z-50" style={{ backgroundColor: "#353D62" }}>
      <div className="flex-1">
        <div className="flex-none">
          <DashboardSideNav />
        </div>
        <div className="flex-none max-sm:hidden">
          <Link href="/dashboard" className=" text-white text-xl font-bold">
            🎮 QuizCraft
          </Link>
        </div>
      </div>
      <div className="flex-none gap-2">
        {children}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="/assets/images/placeholder.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-slate-500"
          >
            <li>
              <Link
                href="dashboard/profile"
                className={`
                  ${
                    pathname === "/dashboard/profile"
                      ? "bg-slate-600 pointer-events-none"
                      : ""
                  } justify-between`}
              >
                Profile
                <span className="badge">{`@${data?.username}`}</span>
              </Link>
            </li>
            <li>
              <Link
                href="dashboard/settings"
                className={`
                  ${
                    pathname === "/dashboard/settings"
                      ? "bg-slate-600 pointer-events-none"
                      : ""
                  } justify-between`}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link href="" onClick={() => signOut()}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
