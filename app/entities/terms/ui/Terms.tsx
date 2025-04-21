import { Button } from "@/app/shared/ui/button";
import Link from "next/link";

interface TermsProps {
    className?: string;
}

export function Terms({ className }: TermsProps) {

    const terms_link = process.env.NEXT_TERMS_LINK || "#";

    return (
        <p className={`text-[12px] text-foreground mb-0 text-center ${className || ""}`.trim()}>By continuing, you agree to the <Link href={terms_link}><Button variant="link" className="text-[12px] p-0">Snuppy Terms</Button></Link> of Use and Privacy Policy</p>
    )
}