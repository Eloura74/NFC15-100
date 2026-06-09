'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { getDomainById } from '@/lib/content/get-domains';
import { getSheetById } from '@/lib/content/get-sheets';

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0 || pathname === '/') {
    return null;
  }

  const breadcrumbs: Array<{ label: string; href: string; isLast: boolean }> =
    [];

  breadcrumbs.push({ label: 'Accueil', href: '/', isLast: false });

  if (segments[0] === 'domaines' && segments.length >= 2) {
    const domain = getDomainById(segments[1]);
    if (domain) {
      breadcrumbs.push({
        label: domain.name,
        href: `/domaines/${segments[1]}`,
        isLast: segments.length === 2,
      });

      if (segments.length >= 3) {
        const subDomain = domain.subDomains?.find(
          (sub) => sub.id === segments[2]
        );
        if (subDomain) {
          breadcrumbs.push({
            label: subDomain.name,
            href: `/domaines/${segments[1]}/${segments[2]}`,
            isLast: true,
          });
        }
      }
    }
  } else if (segments[0] === 'fiches' && segments.length >= 2) {
    const sheet = getSheetById(segments[1]);
    if (sheet) {
      const domain = getDomainById(sheet.domain);
      if (domain) {
        breadcrumbs.push({
          label: domain.name,
          href: `/domaines/${sheet.domain}`,
          isLast: false,
        });

        if (sheet.subDomain) {
          const subDomain = domain.subDomains?.find(
            (sub) => sub.id === sheet.subDomain
          );
          if (subDomain) {
            breadcrumbs.push({
              label: subDomain.name,
              href: `/domaines/${sheet.domain}/${sheet.subDomain}`,
              isLast: false,
            });
          }
        }
      }

      breadcrumbs.push({
        label: sheet.title,
        href: `/fiches/${segments[1]}`,
        isLast: true,
      });
    }
  } else if (segments[0] === 'calculateurs') {
    breadcrumbs.push({
      label: 'Calculateurs',
      href: '/calculateurs',
      isLast: segments.length === 1,
    });

    if (segments.length >= 2) {
      const calculatorNames: Record<string, string> = {
        ohm: "Loi d'Ohm",
        puissance: 'Puissance',
        'chute-tension': 'Chute de tension',
        'section-cable': 'Section de câble',
      };

      const name = calculatorNames[segments[1]] || segments[1];
      breadcrumbs.push({
        label: name,
        href: `/calculateurs/${segments[1]}`,
        isLast: true,
      });
    }
  } else if (segments[0] === 'recherche') {
    breadcrumbs.push({
      label: 'Recherche',
      href: '/recherche',
      isLast: true,
    });
  } else if (segments[0] === 'favoris') {
    breadcrumbs.push({
      label: 'Favoris',
      href: '/favoris',
      isLast: true,
    });
  }

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="container py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-none">{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>
                      {index === 0 ? (
                        <span className="flex items-center gap-1">
                          <Home className="w-4 h-4" />
                          <span className="sr-only">{crumb.label}</span>
                        </span>
                      ) : (
                        crumb.label
                      )}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
