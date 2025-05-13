import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LetGoNote — Yaz, Bırak, Rahatla",
    short_name: "LetGoNote",
    description: "Duygularını ifade et, serbest bırak ve kendini daha iyi hisset.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/images/background.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/images/background.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/background.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
