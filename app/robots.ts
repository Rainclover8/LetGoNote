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
// Bu günden sonra yani yarın 14.08.2025'de bu işe başlayacağım ve daha düzenli bir hayat yaşayacağım. 


// Kabataslak ilk planım sabah kalk kitap oku yemek ıvır zıvır sonrasında yazılımla ilgili şeyler, sonrasında kişisel gelişim yatırım vs.
