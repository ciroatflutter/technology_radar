import styles from "./RestrictedFilter.module.css";

import { Badge, RestrictedBadge } from "@/components/Badge/Badge";
import { cn } from "@/lib/utils";

interface RestrictedFilterProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RestrictedFilter({
  value,
  onChange,
  className,
}: RestrictedFilterProps) {
  return (
    <ul className={cn(styles.filter, className)}>
      <li>
        <RestrictedBadge
          size="large"
          selectable
          selected={value}
          onClick={() => onChange(value ? "" : "true")}
        />
      </li>
    </ul>
  );
}
