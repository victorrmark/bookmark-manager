import { logoutAction } from "@/app/actions/authActions";
import { ModeToggle } from "@/components/layout/modeToggle";


export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans ">
      <ModeToggle />
      <div>
        <p className="text-2xl text-white dark:text-neutral-300">
          Welcome to Bookmark Manager!
        </p>
        <form action={logoutAction}>
          <button className="auth-Btn">Logout</button>
        </form>
      </div>
    </div>
  );
}
