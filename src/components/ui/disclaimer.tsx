import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DisclaimerProps {
  className?: string;
  variant?: 'warning' | 'info' | 'critical';
}

export function Disclaimer({ className, variant = 'warning' }: DisclaimerProps) {
  const variants = {
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'text-yellow-600 dark:text-yellow-400',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-600 dark:text-blue-400',
    },
    critical: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-800 dark:text-red-200',
      icon: 'text-red-600 dark:text-red-400',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={cn(
        'rounded-lg border p-4 backdrop-blur-sm animate-[fadeIn_0.6s_ease-out]',
        style.bg,
        style.border,
        className
      )}
    >
      <div className="flex gap-3">
        <AlertTriangle className={cn('w-5 h-5 shrink-0 mt-0.5', style.icon)} />
        <div className={cn('text-sm leading-relaxed', style.text)}>
          <p className="font-semibold mb-1">Information importante</p>
          <p>
            Ce site présente des informations basées sur la{' '}
            <span className="font-semibold">
              NFC 15-100 (édition 2020 + amendements 2021-2026)
            </span>
            . Les données sont fournies à titre informatif et ne se substituent
            pas aux textes normatifs officiels. Consultez toujours un professionnel qualifié pour votre projet.
          </p>
          <p className="mt-2 text-xs opacity-80">
            Dernière vérification : Juin 2026 • Version du site : 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
