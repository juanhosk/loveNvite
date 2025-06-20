import { Button } from "@/components/ui/button";
import { t, type Lang } from "@/i18n";

interface HeroProps {
  lang: Lang;
}

export default function Hero({ lang }: HeroProps) {
  return (
    <section className="py-20 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">
        {t(lang, "landing_title")}
      </h1>
      <p className="text-muted-foreground">{t(lang, "landing_subtitle")}</p>

      <Button size="lg" variant="default">
        {t(lang, "see_examples")}
      </Button>
    </section>
  );
}
