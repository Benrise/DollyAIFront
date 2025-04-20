import { Button } from "@/app/shared/ui/button";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-[#1A132F] text-gray-400 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <span className="text-xl font-bold text-[#A855F7]">snuppy</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              English
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Use Cases</h3>
          <ul className="space-y-2">
            {[
              "AI Influencer Generator",
              "LinkedIn Headshots",
              "Dubai Influencer",
              "AI Dating",
              "Boudoir",
              "Cyberpunk",
              "Old Money",
              "Rap Album Cover",
              "AI Yearbook",
              "OnlyFans",
              "AI Anime Character",
              "Avatar AI",
              "AI Tattoo Generator",
              "Y2K Aesthetic",
              "Mob Wife",
              "Neon Tokyo",
              "Cyberpunk Boudoir",
              "AI Girlfriend",
            ].map((item, index) => (
              <li key={index}>
                <Link href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-[#A855F7] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Social</h3>
          <ul className="space-y-2">
            {["TikTok", "Instagram", "Twitter", "Telegram", "YouTube"].map((item, index) => (
              <li key={index}>
                <Link href={`/${item.toLowerCase()}`} className="hover:text-[#A855F7] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {["FAQ", "Gallery", "Privacy", "Terms"].map((item, index) => (
              <li key={index}>
                <Link href={`/${item.toLowerCase()}`} className="hover:text-[#A855F7] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contacts</h3>
          <ul className="space-y-2">
            <li>+1 424 2985059</li>
            <li>
              <a href="mailto:biovitalabinc@gmail.com" className="hover:text-[#A855F7] transition-colors">
                biovitalabinc@gmail.com
              </a>
            </li>
            <li>30 N Gould St, Ste R, Sheridan, WY</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        © 2025 BIOVita Lab Inc. All Rights Reserved.
      </div>
    </footer>
  );
}