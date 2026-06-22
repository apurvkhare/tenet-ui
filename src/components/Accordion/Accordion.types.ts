import type { ReactNode } from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionProps {
  /** `single` allows one open item (collapsible); `multiple` allows many. */
  type?: AccordionType;
  /** Controlled set of open item values. */
  value?: string[];
  /** Uncontrolled initial open item values. */
  defaultValue?: string[];
  /** Called with the new set of open values. */
  onValueChange?: (value: string[]) => void;
  children?: ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  /** Unique value identifying this item. */
  value: string;
  /** Header text shown on the trigger button. */
  title: ReactNode;
  /** Disable this item. */
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
}
