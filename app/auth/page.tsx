import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { RiDatabase2Line, RiLeafFill, RiShieldCheckLine, RiSupabaseLine } from "@remixicon/react";
import Image from "next/image";

export default function AuthPage() {
    return (
        <main className="flex min-h-svh items-center justify-center bg-muted/30 p-3 sm:p-6 lg:p-8">
            <section className="relative isolate min-h-[680px] w-full max-w-[1400px] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl sm:min-h-[620px] lg:min-h-[min(700px,calc(100svh-4rem))]">
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/70 via-card to-muted/30" />
                    <div className="absolute -right-0 top size-[34rem] -translate-y-1/2 rounded-full border border-border/70" />
                    <div className="absolute -right-0 top size-[25rem] -translate-y-1/2 rounded-full border border-border/70" />
                    <div className="absolute right-0 top size-[16rem] -translate-y-1/2 rounded-full border border-border/70" />
                    
                    {/* <div className="absolute opacity-40 bottom-[50px] left-[-100px] flex items-end md:bottom-[-200px]]">
                        <Image src="https://pixamed.co.th/wp-content/uploads/2020/01/img-bg1.png" width={600} height={600} alt="Supabase logo" />
                    </div> */}
                </div>

                <section className="absolute inset-x-3 bottom-3 z-10 rounded-xl border border-border bg-card p-6 shadow-xl sm:inset-x-auto sm:right-[5%] sm:top-1/2 sm:bottom-auto sm:w-[min(460px,45%)] sm:-translate-y-1/2 sm:p-9">
                    <div className="space-y-2">
                        <p className="text-sm font-medium uppercase text-primary">Welcome</p>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Sign in to your workspace</h1>
                        <p className="text-sm leading-6 text-muted-foreground">Use your Google account to access machine operations and reports.</p>
                    </div>
                    <div className="mt-8 space-y-5">
                        <GoogleSignInButton />
                        <p className="text-center text-xs leading-5 text-muted-foreground">By continuing, you agree to use this workspace according to your organization’s access policies.</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
                        <span>Secure access</span>
                        <span className="flex items-center gap-1.5"> <RiShieldCheckLine className="size-4 text-green-600" /> Authorized by PiXAMED</span>
                    </div>
                </section>
            </section>
        </main>
    );
}
