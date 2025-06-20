import geoip from "geoip-lite";

export type Lang = "es" | "en" | "fr" | "it" | "de" | "pt";

const SUPPORTED_LANGS: Lang[] = ["es", "en", "fr", "it", "de", "pt"];

const COUNTRY_TO_LANG: Record<string, Lang> = {
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  PE: "es",
  CL: "es",
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  FR: "fr",
  IT: "it",
  DE: "de",
  PT: "pt",
};

export function getClientLang(request: Request): Lang {
  // ✅ 1. Revisar si hay una cookie `lang`
  const cookieLang = request.headers
    .get("cookie")
    ?.match(/lang=(\w{2})/)?.[1] as Lang | undefined;

  if (cookieLang && SUPPORTED_LANGS.includes(cookieLang)) {
    return cookieLang;
  }

  // 2. Detectar IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

  const geo = geoip.lookup(ip);
  if (geo?.country && COUNTRY_TO_LANG[geo.country]) {
    return COUNTRY_TO_LANG[geo.country];
  }

  // 3. Usar idioma del navegador
  const acceptLang = request.headers.get("accept-language") || "en";
  const browserLang = acceptLang.split(",")[0]?.split("-")[0]?.toLowerCase();

  return SUPPORTED_LANGS.includes(browserLang as Lang)
    ? (browserLang as Lang)
    : "en";
}

