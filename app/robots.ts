import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://letgonote.com/sitemap.xml",
  }
}


// Birkaç değişikler yapıldı, buglar fixlendi. 

// Henüz hayatımı düzene sokamadım.
