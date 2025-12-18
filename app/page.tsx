// import { logoutAction } from "@/app/actions/authActions";
// import { ModeToggle } from "@/components/layout/modeToggle";
import { redirect } from "next/navigation";


export default async function App() {
   redirect('/home');
  // return null;
  // return (
  //   <div className="flex min-h-screen items-center justify-center  font-sans ">
  //     <ModeToggle />
  //     <div>
  //       <p className="text-2xl text-white dark:text-neutral-300">
  //         Welcome to Bookmark Manager!
  //       </p>
  //       <form action={logoutAction}>
  //         <button className="auth-Btn">Logout</button>
  //       </form>
  //     </div>
  //   </div>
  // );
}
