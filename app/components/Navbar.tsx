import Image from "next/image";
import Link from "next/link";
import React from "react";
import RedditText from "@/public/logo-name.svg";
import RedditLogo from "@/public/reddit-full.svg";
import { Button } from "@/components/ui/button";
import ChangeThemeButton from "./ChangeThemeButton";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import UserDropDown from "./UserDropDown";

interface Props {}

async function Navbar(props: Props) {
  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <nav className="flex h-[10vh] lg:px-14 px-5 justify-between items-center">
      <Link href={"/"} className="flex gap-x-3 items-center">
        <Image src={RedditLogo} alt="reddit logo" className="h-10 w-fit" />
        <Image
          src={RedditText}
          alt="reddit logo"
          className="h-10 w-fit hidden lg:block"
        />
      </Link>
      <div className="gap-x-4 flex items-center">
        <ChangeThemeButton />
        {user ? (
          <div className="flex items-center gap-x-4">
            <UserDropDown userImage={user.picture} />
          </div>
        ) : (
          <div className="space-x-4">
            <Button variant={"secondary"} asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
