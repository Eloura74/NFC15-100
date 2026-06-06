import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20',
        outline: 'border-primary/30 bg-primary/5 text-primary hover:bg-primary/10',
        success:
          'border-success/50 bg-success/10 text-success hover:bg-success/20',
        warning:
          'border-warning/50 bg-warning/10 text-warning hover:bg-warning/20',
        critical:
          'border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
