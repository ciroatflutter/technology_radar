import styles from "./Links.module.css";

import { getAppName, getLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

interface LinksProps {
  className?: string;
  position?: string;
  size?: "small" | "large";
}

function validPosition(linkPosition: string, position?: string) {
  return [position, "both"].includes(linkPosition);
}

export function Links({ className, position, size = "small" }: LinksProps) {
  const links = getLinks();
  return (
    <ul className={cn(styles.links, className)}>
      {links.map((link, i) => {
        return (
          validPosition(link.position, position) && (
            <li key={i}>
              <a
                href={link.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={link.iconUrl}
                  className={cn(styles.logo, styles[`size-${size}`])}
                  alt={getAppName()}
                  title={link.title}
                />
              </a>
            </li>
          )
        );
      })}
    </ul>
  );
}
