import Link from "next/link";

import styles from "./Navigation.module.css";

import IconOverview from "@/components/Icons/Overview";
import IconQuestion from "@/components/Icons/Question";
import IconSearch from "@/components/Icons/Search";
import IconSocialGithub from "@/components/Icons/SocialGithub";
import { Links } from "@/components/Links/Links";
import { getLabel, getSocialLinks, getToggle } from "@/lib/data";

function getGitHubLink(links: any): string {
  let githubLink = links.find((link: any) => link.icon === "github");
  return githubLink ? githubLink.href : "";
}

export function Navigation() {
  const links = getSocialLinks();
  const githubLink = getGitHubLink(links);
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/help-and-about-tech-radar">
            <IconQuestion className={styles.icon} />
            <span className={styles.label}>{getLabel("pageAbout")}</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/overview">
            <IconOverview className={styles.icon} />
            <span className={styles.label}>{getLabel("pageOverview")}</span>
          </Link>
        </li>
        {getToggle("showSearch") && (
          <li className={styles.item}>
            <Link href="/overview">
              <IconSearch className={styles.icon} />
              <span className={styles.label}>{getLabel("pageSearch")}</span>
            </Link>
          </li>
        )}
        {githubLink && (
          <li className={styles.item}>
            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
              <IconSocialGithub className={styles.icon} />
              <span className={styles.label}></span>
            </Link>
          </li>
        )}
        <Links className={styles.links} position="header" />
      </ul>
    </nav>
  );
}
