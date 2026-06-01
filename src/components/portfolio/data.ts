export type Embed = {
  id: string;
  type: "instagram" | "youtube";
  url: string; // instagram permalink or youtube video id
  category: string;
  title?: string;
  featured?: boolean;
  handle?: string; // instagram handle e.g. "kk.create"
  likes?: string; // e.g. "381K"
};

import kavyaImg from "@/assets/kavya.png";
import sushovitaImg from "@/assets/sushovita.png";

// Reels from KK Create — sourced from Yash's content sheet.
// `featured: true` marks the curated picks that show in the "All" tab.
const featuredUrls = new Set([
  "https://www.instagram.com/p/C08RlhEy8oy/",
  "https://www.instagram.com/p/C_cdLOPyBuU/",
  "https://www.instagram.com/p/C3b5rWdIQEz/",
  "https://www.instagram.com/p/C8GiSVyIElC/",
  "https://www.instagram.com/p/C6FzQgdITw4/",
  "https://www.instagram.com/p/CsfnDpNomra/",
  "https://www.instagram.com/p/C676gfQIxlE/",
  "https://www.instagram.com/p/C8Q2vI-IY5B/",
]);

const kkRaw: { url: string; title: string; category: string }[] = [
  // State Stories
  { url: "https://www.instagram.com/p/Cr7igNFoISr/", title: "Facts about Haryana", category: "State Stories" },
  { url: "https://www.instagram.com/p/Csu-gR-I_nG/", title: "Karnataka's Bus Service", category: "State Stories" },
  { url: "https://www.instagram.com/p/Cs5Rs3Pos62/", title: "IAS Village of India", category: "State Stories" },
  { url: "https://www.instagram.com/p/CuGmJQSMEn0/", title: "North East is so Diverse", category: "State Stories" },
  { url: "https://www.instagram.com/p/Cuds7xdoMQV/", title: "Gujarat's Hill has 900 temples", category: "State Stories" },
  { url: "https://www.instagram.com/p/CvBvwnXoSpU/", title: "Jharkhand is not just about Minerals", category: "State Stories" },
  { url: "https://www.instagram.com/p/CvY7GMJoaRC/", title: "This Temple survived 6 Earthquakes", category: "State Stories" },
  { url: "https://www.instagram.com/p/Cv31kJgIwIl/", title: "Karnataka more than Bengaluru", category: "State Stories" },
  { url: "https://www.instagram.com/p/Cwb36MsIpBl/", title: "Gujarat more than Ahmedabad", category: "State Stories" },
  { url: "https://www.instagram.com/p/CwecnFoNDU_/", title: "Andhra's Guntur Chilli", category: "State Stories" },
  { url: "https://www.instagram.com/p/CxHpzhqo6fe/", title: "Andhra Pradesh more than Biryani", category: "State Stories" },
  { url: "https://www.instagram.com/p/CyKu-6_IpYF/", title: "Telangana more than Hyderabad", category: "State Stories" },
  { url: "https://www.instagram.com/p/CzvF4IiyhUI/", title: "Bihar's Chhath Puja", category: "State Stories" },
  { url: "https://www.instagram.com/p/C0I3jOMSF8S/", title: "Bali Jatra of Odisha", category: "State Stories" },
  { url: "https://www.instagram.com/p/C2BwEsdS3Sn/", title: "Rajasthan more than Dal Bati", category: "State Stories" },
  { url: "https://www.instagram.com/p/C3ZTUAWIeGf/", title: "MP is more than Poha", category: "State Stories" },
  { url: "https://www.instagram.com/p/C3t8zT4IU_k/", title: "UP is not just about Taj Mahal", category: "State Stories" },
  { url: "https://www.instagram.com/p/C6xoQcUID2a/", title: "Kerala is not just about Coconuts", category: "State Stories" },
  { url: "https://www.instagram.com/p/C7YRS9HI8-L/", title: "What Indians drink in Summers", category: "State Stories" },
  { url: "https://www.instagram.com/p/DIG8DFHyK57/", title: "Rajasthan's Biggest Festival", category: "State Stories" },
  { url: "https://www.instagram.com/p/C8Q2vI-IY5B/", title: "Sohar Geet of Bihar", category: "State Stories" },
  { url: "https://www.instagram.com/p/DWeUSF9k2Fy/", title: "Marfa Dance of Hyderabad", category: "State Stories" },

  // Science
  { url: "https://www.instagram.com/p/CrlEaeOoDKJ/", title: "Solar Panel on Thar", category: "Science" },
  { url: "https://www.instagram.com/p/CsBY48koLqx/", title: "What if no Himalayas", category: "Science" },
  { url: "https://www.instagram.com/p/CsdA3tIobwW/", title: "What if no Western Ghats", category: "Science" },
  { url: "https://www.instagram.com/p/CtVmPZYo1jF/", title: "Effects of Western Disturbance", category: "Science" },
  { url: "https://www.instagram.com/p/CtnoGBGIDcT/", title: "Why all maps are wrong", category: "Science" },
  { url: "https://www.instagram.com/p/CtsxiuroZNI/", title: "Why Rajasthan doesn't get rain", category: "Science" },
  { url: "https://www.instagram.com/p/Cut6d6xoehE/", title: "Why Sriharikota is the only launchpad", category: "Science" },
  { url: "https://www.instagram.com/p/CvG5cucIGYs/", title: "How was Rann of Kutch made", category: "Science" },
  { url: "https://www.instagram.com/p/CvRM56Zobeb/", title: "How snowfall happens", category: "Science" },
  { url: "https://www.instagram.com/p/CwpcE4Kyt6e/", title: "First Solar Mission of India", category: "Science" },
  { url: "https://www.instagram.com/p/Cx9xsCfIT3X/", title: "Why northies eat more rotis than rice", category: "Science" },
  { url: "https://www.instagram.com/p/CyNK_--IDjX/", title: "Who controls ISRO's satellites", category: "Science" },
  { url: "https://www.instagram.com/p/Cypf3_uIwK4/", title: "Fuel from Garbage", category: "Science" },
  { url: "https://www.instagram.com/p/CysEng0o6qE/", title: "Mountain gap causes rain in Bengaluru", category: "Science" },
  { url: "https://www.instagram.com/p/C00lzFyS_O9/", title: "What are Hot Springs", category: "Science" },
  { url: "https://www.instagram.com/p/C10-HQcS0mu/", title: "What if Aravallis didn't exist", category: "Science" },
  { url: "https://www.instagram.com/p/C5XjZTwIMJt/", title: "How El Niño affected India", category: "Science" },
  { url: "https://www.instagram.com/p/C676gfQIxlE/", title: "Water from a Tree", category: "Science" },

  // Historical
  { url: "https://www.instagram.com/p/C08RlhEy8oy/", title: "Why South Indian languages are round", category: "Historical" },
  { url: "https://www.instagram.com/p/CsfnDpNomra/", title: "Rawalpindi was named after him", category: "Historical" },
  { url: "https://www.instagram.com/p/CsiHBp8Mv8b/", title: "Maharana Pratap vs Akbar", category: "Historical" },
  { url: "https://www.instagram.com/p/Cskr6jXo8MP/", title: "Why Shivaji is the Father of the Indian Navy", category: "Historical" },
  { url: "https://www.instagram.com/p/Csp06-OI0Ru/", title: "Why Marathi women wear Nauvari sarees", category: "Historical" },
  { url: "https://www.instagram.com/p/CsxkEsfoFEo/", title: "Untold Story of Mangarh", category: "Historical" },
  { url: "https://www.instagram.com/p/Ct8ONTGoD47/", title: "The King who brought the Ganga to the South", category: "Historical" },
  { url: "https://www.instagram.com/p/CugRj5MoHQb/", title: "How was the Kailasa Temple built", category: "Historical" },
  { url: "https://www.instagram.com/p/C0YOohmSioK/", title: "Inside Karnataka's Desert", category: "Historical" },
  { url: "https://www.instagram.com/p/C6FzQgdITw4/", title: "How was Rajasthan formed", category: "Historical" },
  { url: "https://www.instagram.com/p/C6NkHH_oHOW/", title: "Who is Raja Bhoj and Gangu Teli", category: "Historical" },

  // Human Geography
  { url: "https://www.instagram.com/p/Ct5pxBbICUE/", title: "Why Sindhi surnames end with ANI", category: "Human Geography" },
  { url: "https://www.instagram.com/p/C8GiSVyIElC/", title: "Food Line of India", category: "Human Geography" },
  { url: "https://www.instagram.com/p/CwhtOAqobyk/", title: "KVS Schools", category: "Human Geography" },
  { url: "https://www.instagram.com/p/CxFEWsroqTn/", title: "NVS Schools", category: "Human Geography" },
  { url: "https://www.instagram.com/p/CxzcmAmIljt/", title: "Haryanvi Girls' Contribution", category: "Human Geography" },
  { url: "https://www.instagram.com/p/Cy5GWuqoFJC/", title: "Udupi Food Chain", category: "Human Geography" },
  { url: "https://www.instagram.com/p/Cz5ndmeSbWk/", title: "India's Most Expensive House", category: "Human Geography" },
  { url: "https://www.instagram.com/p/C4CfT_iItMQ/", title: "How were Rajasthan cities named", category: "Human Geography" },
  { url: "https://www.instagram.com/p/C4UkvUlIkum/", title: "A mini Tibet in Karnataka", category: "Human Geography" },
  { url: "https://www.instagram.com/p/C5uvHIFoZwl/", title: "How Karnataka cities got their names", category: "Human Geography" },
  { url: "https://www.instagram.com/p/C6ac7yJIoQD/", title: "Biryani of States", category: "Human Geography" },
  { url: "https://www.instagram.com/p/C7TFnVtI58c/", title: "Languages of UP", category: "Human Geography" },
  { url: "https://www.instagram.com/p/Cr49YBVoWG3/", title: "Perks of an IAS Officer", category: "Human Geography" },

  // Geography
  { url: "https://www.instagram.com/p/CtvWQaPIGXH/", title: "Is Ladakh a Desert", category: "Geography" },
  { url: "https://www.instagram.com/p/CvEVN4EojfA/", title: "How Assam produces so much Chai", category: "Geography" },
  { url: "https://www.instagram.com/p/CvgqPf4It2-/", title: "Why India is making a Green Wall", category: "Geography" },
  { url: "https://www.instagram.com/p/CxCfZtII9PC/", title: "What is DOON in Dehradun", category: "Geography" },
  { url: "https://www.instagram.com/p/CyXglRnortA/", title: "A red desert in South India", category: "Geography" },
  { url: "https://www.instagram.com/p/C3b5rWdIQEz/", title: "Why most cities end with PUR", category: "Geography" },
  { url: "https://www.instagram.com/p/DEuPj0nSoBp/", title: "Regions of Maharashtra", category: "Geography" },

  // Manufacturing
  { url: "https://www.instagram.com/p/C0Qe3FASVUO/", title: "Plate from Sugarcane", category: "Manufacturing" },
  { url: "https://www.instagram.com/p/C0vgH-sSL2-/", title: "Tiles from Pollution", category: "Manufacturing" },
  { url: "https://www.instagram.com/p/C44jfCXoRM5/", title: "T-shirts made of Plastic Bottles", category: "Manufacturing" },

  // Geopolitics
  { url: "https://www.instagram.com/p/CrdR6K9oyos/", title: "How MP and Chhattisgarh broke up", category: "Geopolitics" },
  { url: "https://www.instagram.com/p/Crf22B2ID8P/", title: "India gave 12 villages to Pakistan", category: "Geopolitics" },
  { url: "https://www.instagram.com/p/CtN5JjmIqdD/", title: "What is NCR", category: "Geopolitics" },
  { url: "https://www.instagram.com/p/CuBX_32o4pB/", title: "Northies don't only speak Hindi", category: "Geopolitics" },
  { url: "https://www.instagram.com/p/CzK-5kmI0V_/", title: "China shows the wrong map", category: "Geopolitics" },
  { url: "https://www.instagram.com/p/C5ASteZoxJH/", title: "Why was Ladakh protesting", category: "Geopolitics" },
  { url: "https://www.instagram.com/p/C7-1VSno4bG/", title: "Political History of UP", category: "Geopolitics" },

  // Myth Busting
  { url: "https://www.instagram.com/p/DCGXPq1PqJA/", title: "These vegetables are not Indian", category: "Myth Busting" },
  { url: "https://www.instagram.com/p/CuYkUBWoiBL/", title: "Rajasthan is not just a desert", category: "Myth Busting" },
  { url: "https://www.instagram.com/p/C_cdLOPyBuU/", title: "All Rajasthanis are not Marwari", category: "Myth Busting" },
  { url: "https://www.instagram.com/p/CzX2xq8or1a/", title: "Bihari is not a language", category: "Myth Busting" },
  { url: "https://www.instagram.com/p/C05qoLASmI1/", title: "Not only Biharis wear Gamcha", category: "Myth Busting" },
  { url: "https://www.instagram.com/p/C13hZS9yEwA/", title: "All Pahadis are not the same", category: "Myth Busting" },

  // Problems
  { url: "https://www.instagram.com/p/CtlDI_WoF9p/", title: "Why is the Yamuna polluted", category: "Problems" },
  { url: "https://www.instagram.com/p/DM5INEGypdt/", title: "SSC Scam", category: "Problems" },
  { url: "https://www.instagram.com/p/DSujHYPkvzx/", title: "Aravalli Case", category: "Problems" },
];

export const kkInstagram: Embed[] = kkRaw.map((r, i) => ({
  id: `kki${i + 1}`,
  type: "instagram",
  url: r.url,
  title: r.title,
  category: r.category,
  featured: featuredUrls.has(r.url),
  handle: "kk.create",
}));

export const kkYoutube: Embed[] = [
  { id: "kky1", type: "youtube", url: "v_iIQakTjho", title: "What do Indians eat??", category: "10 Million+ Club" },
  { id: "kky2", type: "youtube", url: "OBFjG9Z3OOE", title: "How was Rajasthan formed??", category: "10 Million+ Club" },
  { id: "kky3", type: "youtube", url: "49emHp0UipA", title: "Perks of being an IAS!!", category: "10 Million+ Club" },
  { id: "kky4", type: "youtube", url: "dXotdQX1XjQ", title: "How Indians say Hello", category: "10 Million+ Club" },
  { id: "kky5", type: "youtube", url: "F2ikz2sIJGI", title: "Potato is not Indian!", category: "10 Million+ Club" },
  { id: "kky6", type: "youtube", url: "YaLN3ZYE9qc", title: "Fuel from Garbage", category: "10 Million+ Club" },
  { id: "kky7", type: "youtube", url: "EWbZxQ4auUY", title: "Famous Milk brands of India", category: "10 Million+ Club" },
  { id: "kky8", type: "youtube", url: "tVAAXX_7ED0", title: "Pillow made of cigarette?", category: "10 Million+ Club" },
  { id: "kky9", type: "youtube", url: "NSdx_wBbiYE", title: "Water from Tree", category: "10 Million+ Club" },
  { id: "kky10", type: "youtube", url: "MKLJjAAvEUs", title: "Sohar geet of Bihar", category: "10 Million+ Club" },
  { id: "kky11", type: "youtube", url: "ahZvjPoKKFg", title: "All maps are Lie!", category: "10 Million+ Club" },
  { id: "kky12", type: "youtube", url: "9t9ofl8FeeU", title: "India during night", category: "10 Million+ Club" },
];

// What A Playerr — sourced from the WAP categories sheet.
const wapFeaturedIg = new Set([
  "https://www.instagram.com/reel/DWgPOGnAZ5J/",
  "https://www.instagram.com/reel/DSUD7stgf3m/",
  "https://www.instagram.com/reel/DUK4nj1Aewp/",
  "https://www.instagram.com/reel/DPVnzfDD4xf/",
  "https://www.instagram.com/reel/DQmaaARgccH/",
  "https://www.instagram.com/reel/DTPfe1Dgbnk/",
]);

const wapIgRaw: { url: string; title: string; category: string }[] = [
  // Cricket Stories
  { url: "https://www.instagram.com/reel/DSUD7stgf3m/", title: "How Mallya's mistake costed RCB", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DWgPOGnAZ5J/", title: "How Rohit became Mumbai Cha Raja?", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DTcWA3bAR4E/", title: "How was Ashes series started?", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DSZWhZQAZs1/", title: "England Cricket team out of Olympics", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DSHzlJJgRrw/", title: "How Nehru saved Bihar with Cricket?", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DR6moHsAQ4D/", title: "How BCCI earns money?", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DQmaaARgccH/", title: "Women who won us 1st world cup", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DPLloTNAd8I/", title: "Cricket world cup without final", category: "Cricket Stories" },
  { url: "https://www.instagram.com/reel/DUSom2xgeQq/", title: "Spain gave us IPL tune", category: "Cricket Stories" },
  // Tech in Sports
  { url: "https://www.instagram.com/reel/DUK4nj1Aewp/", title: "What's Hotspot in Cricket", category: "Tech in Sports" },
  { url: "https://www.instagram.com/reel/DTPfe1Dgbnk/", title: "Difference between Snicko and UltraEdge", category: "Tech in Sports" },
  // Others
  { url: "https://www.instagram.com/reel/DPVnzfDD4xf/", title: "How are shuttlecocks made?", category: "Others" },
  { url: "https://www.instagram.com/reel/DT41_y5gVj4/", title: "What if I won an Olympic Gold?", category: "Others" },
  { url: "https://www.instagram.com/reel/DSmJb5RgTbx/", title: "How India won the Squash World Cup?", category: "Others" },
  { url: "https://www.instagram.com/reel/DSegJ8KAZZQ/", title: "Man who laid the foundation of Indian football", category: "Others" },
  { url: "https://www.instagram.com/reel/DP0uRR5gVoy/", title: "A hockey player who made Jharkhand", category: "Others" },
  { url: "https://www.instagram.com/reel/DPi0lZrAUFh/", title: "Indian Para Athletes created history", category: "Others" },
  { url: "https://www.instagram.com/reel/DPQXH6MgVGB/", title: "World's largest team sport from Kerala", category: "Others" },
];

export const wapInstagram: Embed[] = wapIgRaw.map((r, i) => ({
  id: `wai${i + 1}`,
  type: "instagram",
  url: r.url,
  title: r.title,
  category: r.category,
  featured: wapFeaturedIg.has(r.url),
  handle: "what.a.playerr",
}));

const wapYtFeatured = new Set(["9XWvwZsCsms", "484Ueh4f3uE", "vZSVRtImyHk", "JYvNaLWLXbo"]);
const wapYtRaw: { id: string; title: string; category: string }[] = [
  { id: "9XWvwZsCsms", title: "What's Hotspot in Cricket", category: "Tech in Sports" },
  { id: "484Ueh4f3uE", title: "Mumbai cha Raja Rohit Sharma", category: "Cricket Stories" },
  { id: "vZSVRtImyHk", title: "Snicko v/s UltraEdge", category: "Tech in Sports" },
  { id: "5t9_-WSAon8", title: "England are out of Olympics", category: "Cricket Stories" },
  { id: "WqCfos-rI7I", title: "Mallya's mistake costed RCB", category: "Cricket Stories" },
  { id: "1HO43fE9PXg", title: "How Shuttles are made?", category: "Others" },
  { id: "YPfwk8Hk8o8", title: "Biryani won the test match", category: "Cricket Stories" },
  { id: "1YRJipJ78lI", title: "India won squash world cup 1st time", category: "Others" },
  { id: "JYvNaLWLXbo", title: "Indian women lift the world cup", category: "Cricket Stories" },
  { id: "MCry-DiOIK0", title: "Who gave the oldest football tournament", category: "Others" },
  { id: "IztuONepazI", title: "How was Badminton invented", category: "Others" },
];

export const wapYoutube: Embed[] = wapYtRaw.map((r, i) => ({
  id: `way${i + 1}`,
  type: "youtube",
  url: r.id,
  title: r.title,
  category: r.category,
  featured: wapYtFeatured.has(r.id),
}));

export const kkCategories = [
  "All", "State Stories", "Science", "Historical", "Human Geography",
  "Geography", "Manufacturing", "Geopolitics", "Myth Busting", "Problems",
] as const;
export const kkYoutubeCategories = ["10 Million+ Club"] as const;
export const wapCategories = ["All", "Cricket Stories", "Tech in Sports", "Others"] as const;
export const skills = {
  Production: ["Short-form scripting", "Topic ideation", "Research", "Fact-checking", "Quality control"],
  Strategy: ["Audience growth", "Performance tracking", "Trend spotting", "SOP building", "Content planning"],
  Leadership: ["Team coordination", "Editor management", "Community management", "On-ground direction"],
  Tools: ["Basic editing", "Graphic design", "A.I Integration"],
};

export const testimonials = [
  {
    name: "Kavya Karnatac",
    designation: "Founder, KK Create",
    initials: "KK",
    image: kavyaImg,
    quote:
      "I hired Yash based on his; Honesty: He was upfront about how many hours he can commit in a day. Hustle: He was willing to work two part time jobs while also attending college. Homework: He had studied my work extensively and knew exactly what I wanted. Humility: He was willing to work for free, for the sheer joy of learning.",
    linkedin:
      "https://www.linkedin.com/feed/update/urn:li:activity:7265726565571846145/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIgPccBMnCZd4P4ZjRZPThBnfDC2hdvGR4",
  },
  {
    initials: "S",
    image: sushovitaImg,
    name: "Sushovita Das",
    designation: "Community Manager",
    quote:
      "Yash showed me how to write scripts which hit millions of views. No question was too silly for him, he had my back!",
    linkedin:
      "https://www.linkedin.com/feed/update/urn:li:activity:7259226872448786434/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIgPccBMnCZd4P4ZjRZPThBnfDC2hdvGR4",
  },
];

export const milestones = [
  { stat: "Day 1", label: "Started as Researcher & Writer" },
  { stat: "3 mo", label: "Promoted to Instagram Lead" },
  { stat: "350K → 1M", label: "KK Create in 6 months" },
  { stat: "1M → 1.6M", label: "KK Create followers" },
  { stat: "0 → 750K", label: "YouTube subscribers built" },
  { stat: "0 → 47K", label: "What A Playerr in 3 months" },
];