import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">ElecNorme</h3>
            <p className="text-sm text-muted-foreground">
              Référence métier pour les électriciens en France
            </p>
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/domaines"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Domaines
                </Link>
              </li>
              <li>
                <Link
                  href="/versions"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Versions
                </Link>
              </li>
              <li>
                <Link
                  href="/calculateurs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Calculateurs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/a-propos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            Cette application est une aide à la consultation. Elle ne remplace
            pas les textes officiels ni l&#39;intervention d&#39;un
            professionnel habilité.
          </p>
          <p className="mt-2">© 2026 ElecNorme - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
