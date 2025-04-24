import NextLink from "next/link";

import { Button } from "@/app/shared/ui/button";
import { ThemeToggle } from "@/app/shared/ui/theme-toggle";
import { Separator } from "@/app/shared/ui/separator"
import { Link } from "@/app/shared/ui/link/Link";
import { Logo } from "@/app/shared/ui/logo";


export function LandingHeader() {
    return (
        <header className="w-full flex items-center justify-between">
            {/* left */}
            <div className="flex items-center gap-8">
                <NextLink className="flex items-center" href="/">
                    <Logo/>
                </NextLink>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#">Use cases</Link>
                    <Link href="#">Demo</Link>
                    <Link href="#">Pricing</Link>
                    <Link href="#">FAQ</Link>
                </nav>
            </div>
            {/* right */}
            <div className="flex items-center gap-4">
                <ThemeToggle className="hidden md:flex"/>
                <Separator orientation="vertical" className="h-6! hidden md:flex"/>
                <Button
                    variant="ghost"
                    asChild
                    className="hidden md:flex"
                >
                    <NextLink href="/pages/auth/login">Log in</NextLink>
                </Button>
                <Button
                    variant="default"
                    asChild
                >
                <NextLink href="/pages/auth/register">Try for free</NextLink>
                </Button>
            </div>
        </header>
    );
}