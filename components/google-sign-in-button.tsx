"use client";

import { signIn } from "next-auth/react";
import { RiGoogleFill } from "@remixicon/react";
import { Button } from "./ui/button";

export function GoogleSignInButton() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="w-full justify-center gap-2"
      variant="default"
    >

      <RiGoogleFill aria-hidden="true" className="size-5" />
      Continue with Google

    </Button>
  );
}
