import NextLink from "next/link";

export function Link({label}: {label: string}) {
    return (
        <NextLink className="opacity-50 hover:opacity-100 transition-opacity font-medium text-sm" href="#">
            {label}
        </NextLink>
    )
}