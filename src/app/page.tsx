export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            ElecNorme
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Votre référence métier pour l'électricité
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold">
            Application en cours de construction
          </h2>
          <p className="text-muted-foreground">
            ElecNorme sera bientôt disponible avec :
          </p>
          <ul className="text-left space-y-2 max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Recherche intelligente de normes et règles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Fiches techniques sourcées et versionnées</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Calculateurs pour chantier</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Checklists de contrôle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Mode hors ligne</span>
            </li>
          </ul>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Cette application est une aide à la consultation.
          </p>
          <p>
            Elle ne remplace pas les textes officiels ni l'intervention d'un professionnel habilité.
          </p>
        </div>
      </div>
    </main>
  );
}
