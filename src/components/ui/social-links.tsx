import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils/cn";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alialghanay", Icon: FiLinkedin },
  { label: "GitHub", href: "https://github.com/alialghanay", Icon: FiGithub },
  { label: "X (Twitter)", href: "https://x.com/alialghanay", Icon: FaXTwitter },
];

interface SocialLinksProps {
  className?: string;
  /** Classes for each icon link; sizing defaults to a 44px touch target. */
  linkClassName?: string;
}

export default function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
              linkClassName
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
