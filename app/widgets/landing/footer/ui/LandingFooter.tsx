import NextLink from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/app/shared/ui/button";
import { Logo } from "@/app/shared/ui/logo"
import { Link } from "@/app/shared/ui/link";
import { Separator } from "@/app/shared/ui/separator";
import { USE_CASES, SOCIALS, RESOURCES, CONTACTS } from "../constants";


export function LandingFooter() {
  const getUseCaseLink = (useCase: string) => `/use-cases/${useCase.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <footer className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-12 md:gap-24">
        <div className="flex md:flex-col flex-row gap-6 items-center h-fit w-full justify-between md:justify-start md:w-fit">
          <NextLink className="flex items-center" href="/">
            <Logo/>
          </NextLink>
          <Button
              variant="outline"
            >
              English
              <ChevronDown/>
            </Button>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold">Use Cases</h3>
          <div className="flex gap-16">
          <ul className="space-y-2">
            {USE_CASES.slice(0, 15).map((item, index) => (
              <li key={index}>
                <Link target="_blank" href={getUseCaseLink(item)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {USE_CASES.slice(15, 30).map((item, index) => (
              <li key={index}>
                <Link target="_blank" href={getUseCaseLink(item)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold">Socials</h3>
          <ul className="space-y-2">
            {SOCIALS.map((item, index) => (
              <li key={index}>
                <Link target="_blank" href={item.url}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold">Resources</h3>
          <ul className="space-y-2">
            {RESOURCES.map((item, index) => (
              <li key={index}>
                <Link target="_blank" href={item.url}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold">Contacts</h3>
          <ul className="space-y-2">
            {CONTACTS.map((item, index) => (
              <li key={index}>
                <Link target="_blank" href={item.url}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="text-center text-sm opacity-50">
        © 2025 BioVita Lab Inc. All Rights Reserved.
      </div>
    </footer>
  );
}