export interface Proverb {
  id: number;
  am: string;
  translit: string;
  en: string;
  meaningAm: string;
  meaningEn: string;
  category: string;
  featured: boolean;
}

export const PROVERBS: Proverb[] = [
  {
    id: 1,
    am: "ውሃ ጠልፎ ዐሣ አይጠመዱ",
    translit: "Wiha telf'o issa aytamadu",
    en: "One cannot fish by scooping water.",
    meaningAm: "ዐሣ ለማጥመድ ትዕግስትና ትክክለኛ ዘዴ ያስፈልጋል። ትልቅ ነገር ለማሳካት መቸኮልና ዘዴ ማጣት አይረዳም።",
    meaningEn: "Great results require patience and the right method. Rushing and working without strategy will lead to failure, no matter how hard one tries.",
    category: "patience",
    featured: true
  },
  {
    id: 2,
    am: "አንድ እጅ ጮክ አይልም",
    translit: "And ij chok aylim",
    en: "One hand cannot clap.",
    meaningAm: "ብቻዬን ምንም ማድረግ አይቻልም። ትብብርና አንድነት ሳይኖር ትልቅ ሥራ አይሳካም።",
    meaningEn: "Cooperation is essential. No significant achievement can happen alone — unity and collaboration are the foundation of success.",
    category: "unity",
    featured: false
  },
  {
    id: 3,
    am: "ሞኝ ደጋፊ ያፈርሳል",
    translit: "Mogn degafi yafersal",
    en: "A foolish supporter will destroy.",
    meaningAm: "ምንም ያህል ሊረዳ ቢፈልግ፣ የሞኝ እርዳታ ጥፋት ያመጣል። ልብ ሳለው ምካሪ ሰው ያስፈልጋል።",
    meaningEn: "Well-meaning but foolish assistance can cause more harm than good. It is better to have wise advisors than enthusiastic but misguided helpers.",
    category: "wisdom",
    featured: false
  },
  {
    id: 4,
    am: "ልብ ያለው ሰው ቀስ ብሎ ይሄዳል",
    translit: "Lib yalewu sew qes bilo yihedal",
    en: "The wise person walks slowly.",
    meaningAm: "አስቦ፣ ጥንቃቄ ታጥቆ የሚሄድ ሰው ስህተት አይሠራም። መቸኮል ሁሌ ጠቃሚ አይደለም።",
    meaningEn: "A thoughtful, careful person avoids mistakes. Haste is rarely wise — deliberate action leads to better outcomes.",
    category: "wisdom",
    featured: false
  },
  {
    id: 5,
    am: "ቤት ያለ ቤቱ ይጠብቃቸዋል",
    translit: "Bet yele betu yitebiqachew",
    en: "Those at home are kept by their home.",
    meaningAm: "ቤተሰብ ወሳኝ ዋስትና ነው። ቤት ስለሚያለ ሰው ደህንነቱ ይጠበቃል።",
    meaningEn: "Family and home are a person's greatest protection and anchor. Those who have a home and family are kept safe by that bond.",
    category: "family",
    featured: false
  },
  {
    id: 6,
    am: "ብልሃተኛ ሰው ጠላቱን ወዳጅ ያደርጋል",
    translit: "Bilihategna sew telalun wedaj yadarigal",
    en: "A clever person turns an enemy into a friend.",
    meaningAm: "ብልህ ሰው ጠላቱን ለማሸነፍ ሳይሆን ለመቀየር ይጥራል። ጥበብ ግጭትን ይፈታል።",
    meaningEn: "True cleverness lies in transforming conflict into alliance. A wise person's greatest achievement is turning adversaries into allies.",
    category: "character",
    featured: false
  },
  {
    id: 7,
    am: "ያልዘሩ ሰው ሊያጭድ አይፈልግም",
    translit: "Yalzeru sew liyadid ayfelgim",
    en: "One who did not sow cannot expect to reap.",
    meaningAm: "ያልሠራ ሰው ውጤት አያሻውም። ያለ ጥረት ስኬት አይገኝም።",
    meaningEn: "Reward follows effort. Those who have not worked, invested, or planted cannot expect to harvest the fruits of labor.",
    category: "work",
    featured: false
  },
  {
    id: 8,
    am: "ሁለት አናብስት አንድ ቦታ አይኖሩም",
    translit: "Hulet anabist and bota ayinorum",
    en: "Two lions cannot live in the same place.",
    meaningAm: "ሁለት ኃያላን ሰዎች ወይም መሪዎች ያለ ግጭት አንድ ቦታ ሊቆዩ አይችሉም።",
    meaningEn: "Two strong leaders or powers in the same domain will inevitably clash. Authority and dominance must have clear boundaries.",
    category: "wisdom",
    featured: false
  },
  {
    id: 9,
    am: "ሰው ሳይበላ ሥራ አይሠራም",
    translit: "Sew saybela sera ayyiseram",
    en: "A person cannot work without eating.",
    meaningAm: "አካል ጤና ሳይኖር ማሠራት አይቻልም። ሰው ወሳኝ ፍላጎቶቹ ሲሟሉ ነው ሥራ የሚሠራው።",
    meaningEn: "Basic needs must be met before one can perform well. You cannot expect productivity from someone who lacks fundamental sustenance.",
    category: "work",
    featured: false
  },
  {
    id: 10,
    am: "አባት ካለ ወላጅ ነው፣ ወላጅ ካለ አምላክ ነው",
    translit: "Abat kale welaj new, welaj kale amlak new",
    en: "If there is a father, there is a parent; if there is a parent, there is God.",
    meaningAm: "ወላጅ የልጅ ሕይወት ምሰሶ ነው። ወላጅ ያለ ሰው ምድራዊ ጸጋ አለው።",
    meaningEn: "Parents are divine gifts. A parent is the earthly representative of divine care — their presence is among life's greatest blessings.",
    category: "family",
    featured: false
  },
  {
    id: 11,
    am: "ዕውቀት ሲዘረጋ ሀብት ሲቀነስ",
    translit: "Iwuqet sizgerga habt siqenes",
    en: "Knowledge grows when shared; wealth diminishes.",
    meaningAm: "ዕውቀት ሲሰጥ ይጨምራል። ሀብት ሲሰጥ ግን ይቀንሳል። ስለዚህ ዕውቀት ከሀብት ይልቅ ዘላቂ ነው።",
    meaningEn: "Unlike material wealth, knowledge multiplies when it is shared. Giving knowledge away makes you richer; hoarding it stagnates both giver and receiver.",
    category: "wisdom",
    featured: false
  },
  {
    id: 12,
    am: "ትዕግስት ያለው ሰው ሁሉ ነገር ያገኛል",
    translit: "Ti'igist yalewu sew hull neger yagegnal",
    en: "The patient person achieves everything.",
    meaningAm: "ትዕግስት ቁልፍ በጎ ዋጋ ነው። ትዕግስተኛ ሰው ቢቸቅ አይሸሽም፣ ዓላማውን ያሳካል።",
    meaningEn: "Patience is a supreme virtue. The person who persists with patience ultimately achieves their goals, no matter the obstacles they face.",
    category: "patience",
    featured: false
  },
  {
    id: 13,
    am: "ቁጡ ሰው ጠፊ ቢሆን ይሻለዋል",
    translit: "Qutu sew tefi bihonn yishalewwal",
    en: "An angry person would be better off being absent.",
    meaningAm: "ቁጡ ሰው ሲኖር ጉዳት ያስከትላል። ቁጣ ቢያቸሩ ብዙ ስህተት ሊሸሽ ይችላል።",
    meaningEn: "Anger is destructive. An angry person causes harm simply by being present in a situation. Emotional self-control is essential to good relationships.",
    category: "character",
    featured: false
  },
  {
    id: 14,
    am: "ሰው ካልሠለጠነ ዕድሜ ያለፈበት አይቆጠርም",
    translit: "Sew kalselettene idme yalfebbet ayqoterim",
    en: "A person who has not grown is not considered to have lived their years.",
    meaningAm: "ዕድሜ ብቻ ልምድ አያደርግም። ዕድገት ወሳኝ ነው — ሰው ካልተለወጠ ዕድሜ ምን ዋጋ አለው?",
    meaningEn: "Age alone does not bring wisdom or maturity. A life without growth, learning, or transformation is not a life fully lived.",
    category: "wisdom",
    featured: false
  },
  {
    id: 15,
    am: "ፍቅር ዓይን የለውም",
    translit: "Fiqir ayn yeleewim",
    en: "Love has no eyes.",
    meaningAm: "ፍቅር ምንም ጉድለት አያይም። ሰው ወዳጁን እንዳለ ይወደዋል — ብቃቱን ሳይሆን።",
    meaningEn: "Love is blind to faults. A loving heart sees the beloved whole, not their imperfections — this is both love's beauty and its danger.",
    category: "character",
    featured: false
  },
  {
    id: 16,
    am: "ደሃ ጠበቃ ፈጣሪ ነው",
    translit: "Deha tebeka fetari new",
    en: "God is the guardian of the poor.",
    meaningAm: "ደሃ ሰው ከሰው ሳይረዳ ቢቀር፣ ፈጣሪ ይጠብቀዋል። ፍትህ መጨረሻ ይሸነፋል።",
    meaningEn: "The poor are not without protection — divine justice ultimately prevails. This proverb offers comfort and a reminder that human injustice is not the final word.",
    category: "wisdom",
    featured: false
  }
];
