"use server"

export type Quote = {
  content: string
  author: string
  tags: string[]
}

// Changed from export const to const (no export)
const localQuotes: Quote[] = [
  {
    content: "Geçmiş seni tanımlamaz, sadece seni buraya getirir. Bundan sonra nereye gideceğin senin elinde.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Kendini affetmek, özgürlüğe açılan kapıdır.",
    author: "Anonim",
    tags: ["forgiveness"],
  },
  {
    content: "Fırtına ne kadar şiddetli olursa olsun, gökkuşağı her zaman görünür.",
    author: "Anonim",
    tags: ["hope"],
  },
  {
    content: "Bugün yeni bir başlangıç için mükemmel bir gün.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Nefes al. Bu an geçecek.",
    author: "Anonim",
    tags: ["calm"],
  },
  {
    content: "Huzur, dışarıda değil içeride bulunur.",
    author: "Anonim",
    tags: ["peace"],
  },
  {
    content: "Kendine gösterdiğin şefkat, başkalarına gösterdiğin şefkatin temelidir.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content:
      "Değiştiremeyeceğin şeyleri kabul etme cesareti, değiştirebileceğin şeyleri değiştirme gücü ve ikisi arasındaki farkı bilme bilgeliği.",
    author: "Serenity Prayer",
    tags: ["wisdom"],
  },
  {
    content: "Her şey geçer, bu da geçecek.",
    author: "Anonim",
    tags: ["calm"],
  },
  {
    content: "Kendine nazik davran, zor bir süreçten geçiyorsun.",
    author: "Anonim",
    tags: ["forgiveness"],
  },
  {
    content: "Hayat, seni yıkan şey değil, seni ayağa kaldıran şeydir.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Düşüncelerini değiştir, hayatını değiştir.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content: "Mutluluk bir seçimdir, bir sonuç değil.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Başkalarının seni nasıl gördüğü, senin kendini nasıl gördüğünden daha az önemlidir.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content: "Hayat, şu an olduğun yerde değil, gittiğin yoldadır.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Öfke, içtiğin zehirdir ve başkasının ölmesini beklersin.",
    author: "Buddha",
    tags: ["peace"],
  },
  {
    content: "Huzur, olanı kabul etmekle başlar.",
    author: "Anonim",
    tags: ["peace"],
  },
  {
    content: "Endişe, yarının sorunlarını çözmez, sadece bugünün gücünü çalar.",
    author: "Anonim",
    tags: ["calm"],
  },
  {
    content: "Hayatın en büyük keşfi, insanın bakış açısını değiştirebileceğini fark etmesidir.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content: "Affetmek geçmişi değiştirmez, ama geleceğin önünü açar.",
    author: "Anonim",
    tags: ["forgiveness"],
  },
  {
    content: "Kendini sevmek, hayatının aşkını bulmaktır.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Bugün yaptığın seçimler, yarının nasıl olacağını belirler.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content: "Hayat, nefes aldığın anlarda değil, nefesini kesen anlarda ölçülür.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Başarı, başarısızlıktan başarısızlığa, hiç hevesini kaybetmeden gitmektir.",
    author: "Winston Churchill",
    tags: ["inspirational"],
  },
  {
    content: "Hayat, ya cesur bir macera olacak, ya da hiçbir şey.",
    author: "Helen Keller",
    tags: ["inspirational"],
  },
  {
    content: "Huzur, dışarıda değil içeride bulunur.",
    author: "Anonim",
    tags: ["peace"],
  },
  {
    content: "Kendine gösterdiğin şefkat, başkalarına gösterdiğin şefkatin temelidir.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content: "Hayat, şu an olduğun yerde değil, gittiğin yoldadır.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Öfke, içtiğin zehirdir ve başkasının ölmesini beklersin.",
    author: "Buddha",
    tags: ["peace"],
  },
  {
    content: "Huzur, olanı kabul etmekle başlar.",
    author: "Anonim",
    tags: ["peace"],
  },
  {
    content: "Endişe, yarının sorunlarını çözmez, sadece bugünün gücünü çalar.",
    author: "Anonim",
    tags: ["calm"],
  },
  {
    content: "Hayatın en büyük keşfi, insanın bakış açısını değiştirebileceğini fark etmesidir.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content: "Affetmek geçmişi değiştirmez, ama geleceğin önünü açar.",
    author: "Anonim",
    tags: ["forgiveness"],
  },
  {
    content: "Kendini sevmek, hayatının aşkını bulmaktır.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Bugün yaptığın seçimler, yarının nasıl olacağını belirler.",
    author: "Anonim",
    tags: ["wisdom"],
  },
  {
    content: "Hayat, nefes aldığın anlarda değil, nefesini kesen anlarda ölçülür.",
    author: "Anonim",
    tags: ["inspirational"],
  },
  {
    content: "Başarı, başarısızlıktan başarısızlığa, hiç hevesini kaybetmeden gitmektir.",
    author: "Winston Churchill",
    tags: ["inspirational"],
  },
  {
    content: "Hayat, ya cesur bir macera olacak, ya da hiçbir şey.",
    author: "Helen Keller",
    tags: ["inspirational"],
  },
  {
    content: "Düşünceleriniz sözlerinize, sözleriniz eylemlerinize, eylemleriniz alışkanlıklarınıza dönüşür.",
    author: "Mahatma Gandhi",
    tags: ["wisdom"],
  },
  {
    content: "Hayatta en büyük zafer, hiç düşmemek değil, her düştüğünde ayağa kalkmaktır.",
    author: "Nelson Mandela",
    tags: ["inspirational"],
  },
  {
    content: "Sakinlik, fırtınanın ortasında huzur bulabilmektir.",
    author: "Anonim",
    tags: ["calm"],
  },
]

// Add a new async function to get all quotes
export async function getAllQuotes(): Promise<Quote[]> {
  try {
    return [...localQuotes]
  } catch (error) {
    console.error("Error in getAllQuotes:", error)
    return []
  }
}

// Belirli bir duygu durumuna göre alıntı etiketlerini eşleştiren yardımcı fonksiyon
export async function getTagForEmotion(emotion: string): Promise<string> {
  const tagMap: Record<string, string> = {
    sad: "inspirational",
    angry: "peace",
    anxious: "calm",
    hurt: "forgiveness",
    uncertain: "wisdom",
  }

  return tagMap[emotion] || "inspirational"
}

// Rastgele bir yerel alıntı döndürür
export async function getRandomQuote(tag?: string): Promise<Quote> {
  try {
    let filteredQuotes = localQuotes

    if (tag) {
      filteredQuotes = localQuotes.filter((quote) => quote.tags.includes(tag))

      if (filteredQuotes.length === 0) {
        filteredQuotes = localQuotes
      }
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
    return filteredQuotes[randomIndex]
  } catch (error) {
    console.error("Error in getRandomQuote:", error)
    // Return a default quote if something goes wrong
    return {
      content: "Her şey geçer, bu da geçecek.",
      author: "Anonim",
      tags: ["calm"],
    }
  }
}

// Belirli bir etikete sahip tüm alıntıları döndürür
export async function getQuotesByTag(tag?: string): Promise<Quote[]> {
  try {
    if (!tag || tag === "all") {
      return [...localQuotes]
    }

    const filteredQuotes = localQuotes.filter((quote) => quote.tags.includes(tag))
    return filteredQuotes.length > 0 ? filteredQuotes : [...localQuotes]
  } catch (error) {
    console.error("Error in getQuotesByTag:", error)
    // Return a default array if something goes wrong
    return [
      {
        content: "Her şey geçer, bu da geçecek.",
        author: "Anonim",
        tags: ["calm"],
      },
    ]
  }
}

// Belirli sayıda rastgele alıntı döndürür
export async function getRandomQuotes(count: number, tag?: string): Promise<Quote[]> {
  try {
    const availableQuotes = tag ? await getQuotesByTag(tag) : [...localQuotes]
    const result: Quote[] = []
    const usedIndices = new Set<number>()

    // Eğer istenen sayı mevcut alıntı sayısından fazlaysa, tüm alıntıları döndür
    if (count >= availableQuotes.length) {
      return [...availableQuotes]
    }

    // Belirtilen sayıda benzersiz rastgele alıntı seç
    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * availableQuotes.length)

      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex)
        result.push(availableQuotes[randomIndex])
      }
    }

    return result
  } catch (error) {
    console.error("Error in getRandomQuotes:", error)
    // Return a default array if something goes wrong
    return Array(count)
      .fill(null)
      .map(() => ({
        content: "Her şey geçer, bu da geçecek.",
        author: "Anonim",
        tags: ["calm"],
      }))
  }
}
