
export interface Template {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  author: string
  downloads: number
  rating: number
  isPremium: boolean
  createdAt: string
  data: {
    backgroundColor: string
    backgroundType: string
    gradientColor: string
    borderRadius: number
    width: number
    height: number
    primaryShadow: {
      x: number
      y: number
      blur: number
      spread: number
      color: string
      opacity: number
      enabled: boolean
    }
    glassmorphism?: boolean
    backdropBlur?: number
  }
}

export const templates: Template[] = [
  {
    id: "modern-business",
    name: "Modern Business",
    category: "Business",
    description: "Clean and professional design perfect for corporate presentations",
    tags: ["professional", "clean", "corporate", "minimal"],
    author: "Design Studio",
    downloads: 1250,
    rating: 4.8,
    isPremium: false,
    createdAt: "2024-01-15",
    data: {
      backgroundColor: "#667eea",
      backgroundType: "gradient",
      gradientColor: "#764ba2",
      borderRadius: 12,
      width: 350,
      height: 200,
      primaryShadow: {
        x: 0,
        y: 8,
        blur: 25,
        spread: 0,
        color: "#667eea",
        opacity: 30,
        enabled: true,
      },
    },
  },
  {
    id: "social-gradient",
    name: "Social Gradient",
    category: "Social Media",
    description: "Eye-catching gradient design for social media posts",
    tags: ["social", "gradient", "colorful", "engaging"],
    author: "Creative Team",
    downloads: 2100,
    rating: 4.9,
    isPremium: false,
    createdAt: "2024-01-20",
    data: {
      backgroundColor: "#ff6b6b",
      backgroundType: "gradient",
      gradientColor: "#feca57",
      borderRadius: 20,
      width: 400,
      height: 400,
      primaryShadow: {
        x: 0,
        y: 15,
        blur: 35,
        spread: 0,
        color: "#ff6b6b",
        opacity: 40,
        enabled: true,
      },
    },
  },
  {
    id: "neon-gaming",
    name: "Neon Gaming",
    category: "Gaming",
    description: "Futuristic cyberpunk design perfect for gaming content",
    tags: ["gaming", "neon", "cyberpunk", "futuristic"],
    author: "Cyber Studios",
    downloads: 1750,
    rating: 4.9,
    isPremium: true,
    createdAt: "2024-02-01",
    data: {
      backgroundColor: "#0f0f23",
      backgroundType: "gradient",
      gradientColor: "#1a1a2e",
      borderRadius: 15,
      width: 380,
      height: 220,
      primaryShadow: {
        x: 0,
        y: 0,
        blur: 20,
        spread: 0,
        color: "#00ffff",
        opacity: 60,
        enabled: true,
      },
    },
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    category: "Modern",
    description: "Beautiful glass effect with backdrop blur",
    tags: ["glass", "modern", "translucent", "trendy"],
    author: "Modern UI",
    downloads: 3200,
    rating: 4.9,
    isPremium: false,
    createdAt: "2024-02-10",
    data: {
      backgroundColor: "#ffffff",
      backgroundType: "solid",
      gradientColor: "#f0f0f0",
      borderRadius: 20,
      width: 320,
      height: 200,
      glassmorphism: true,
      backdropBlur: 15,
      primaryShadow: {
        x: 0,
        y: 10,
        blur: 40,
        spread: 0,
        color: "#000000",
        opacity: 10,
        enabled: true,
      },
    },
  },
]

export const templateCategories = ["All", "Business", "Social Media", "Gaming", "Modern", "Creative"]
