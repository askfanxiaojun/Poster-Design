import { StyleProfile } from './types';

export const TRANSLATIONS = {
  en: {
    title: "2025 Poster Design Trends",
    subtitle: "Explore 10 avant-garde aesthetics. Powered by Nano Banana Pro.",
    selectStyles: "Select Styles",
    selected: "selected",
    inputTitle: "Input",
    promptLabel: "Describe your vision",
    promptPlaceholder: "E.g., A cybernetic cat sitting on a neon throne...",
    imageLabel: "Reference Image (Optional)",
    uploadText: "Click, drag & drop, or paste (Ctrl+V)",
    generate: "Generate",
    generating: "Generating...",
    galleryTitle: "Your Creations",
    download: "Download",
    errorApiKey: "Failed to generate images. Please check your API key and try again.",
    errorGeneric: "An unexpected error occurred.",
    noPrompt: "Please enter a prompt to continue.",
    noStyle: "Select at least one style.",
    poweredBy: "Powered by Gemini 2.5 Flash Image"
  },
  zh: {
    title: "2025 先锋海报设计趋势",
    subtitle: "探索10种未来视觉美学。由 Nano Banana Pro 驱动。",
    selectStyles: "选择风格",
    selected: "已选",
    inputTitle: "输入",
    promptLabel: "描述您的愿景",
    promptPlaceholder: "例如：一只坐在霓虹王座上的赛博朋克猫...",
    imageLabel: "参考图片（可选）",
    uploadText: "点击、拖拽或直接粘贴图片 (Ctrl+V)",
    generate: "生成",
    generating: "生成中...",
    galleryTitle: "您的作品",
    download: "下载",
    errorApiKey: "生成图片失败。请检查您的 API 密钥并重试。",
    errorGeneric: "发生了意外错误。",
    noPrompt: "请输入提示词以继续。",
    noStyle: "请至少选择一种风格。",
    poweredBy: "由 Gemini 2.5 Flash Image 驱动"
  }
};

export const STYLES: StyleProfile[] = [
  {
    id: 'neo-song',
    name: 'Neo-Song Aesthetics',
    name_zh: '新宋式极简美学',
    description: 'Minimalist, negative space, archaic elegance, low saturation.',
    description_zh: '极简，留白，古朴雅致，低饱和度高级灰。',
    previewColor: '#7D929F',
    icon: '🍵',
    promptInstruction: `Style: Neo-Song Aesthetics (新宋式极简美学). 
    Core Philosophy: Minimalist, negative space (reserving white space), archaic elegance, serenity.
    Visuals: Low saturation 'advanced gray' tones (Ru Kiln Blue, Rice Paper White, Ink Black). 
    Typography: Thin Serif/Song Ti, vertical layout. 
    Texture: Rice paper texture, ink wash blur, slight noise. 
    Composition: Asymmetrical balance. 
    Mood: Quiet, elegant, scholarly.`
  },
  {
    id: 'avant-garde-guochao',
    name: 'Avant-Garde Guochao',
    name_zh: '先锋国潮',
    description: 'Cyber-traditional, neon meets ink, psychedelic, fluid.',
    description_zh: '赛博紫与水墨的碰撞，迷幻流体，故障艺术。',
    previewColor: '#B026FF',
    icon: '🔮',
    promptInstruction: `Style: Avant-Garde Guochao (先锋国潮).
    Core Philosophy: Collision of traditional Chinese ink/porcelain with future tech/glitch art.
    Visuals: Cyber Purple, Neon Pink, Holographic Blue against Midnight Black.
    Elements: Fluidity, mesh gradients, luminous glow, digital glitches mixed with traditional patterns.
    Mood: Psychedelic, conflicting, deja vu, high impact.`
  },
  {
    id: 'playful-guochao',
    name: 'Playful Guochao Pop',
    name_zh: '趣味国潮波普',
    description: 'Historical figures with modern items, flat vector, humorous.',
    description_zh: '古人玩转现代科技，扁平矢量插画，反差萌。',
    previewColor: '#FFD700',
    icon: '🕶️',
    promptInstruction: `Style: Playful Guochao Pop Fusion (趣味国潮).
    Core Concept: Anachronistic collage. Ancient figures (emperors, scholars) using modern tech (laptops, sunglasses).
    Visuals: Flat faux-traditional vector illustration with thick lines.
    Colors: Low saturation background (beige) with high saturation accents (pop red, fluorescent).
    Mood: Humorous, playful, absurd, relatable.`
  },
  {
    id: 'diffusion-dream',
    name: 'Diffusion Dream',
    name_zh: '浮光幻梦',
    description: 'Frosted glass, gradients, grainy noise, hazy, pastel.',
    description_zh: '磨砂玻璃质感，柔和渐变，胶片噪点，朦胧诗意。',
    previewColor: '#FFB7B2',
    icon: '🌫️',
    promptInstruction: `Style: Diffusion Gradient & Grainy Dream (浮光幻梦).
    Core Concept: Out of focus, fluid, atmospheric, frosted glass effect.
    Visuals: Gaussian blur, gradient mesh, high-key dreamy pastels (pink, blue, mint).
    Texture: Essential heavy film grain/noise overlay.
    Mood: Hazy, poetic, fluid, healing, soft.`
  },
  {
    id: 'dopamine-brights',
    name: 'Dopamine Brights',
    name_zh: '多巴胺高亮风',
    description: 'High saturation, collage, Y2K, maximalist, joyful.',
    description_zh: '高饱和度彩虹色，拼贴艺术，Y2K，快乐张扬。',
    previewColor: '#00FF00',
    icon: '🌈',
    promptInstruction: `Style: Dopamine Brights / Gen Z Maximalism.
    Core Concept: Visual vitamin. High saturation, acid pop.
    Visuals: Rainbow palette (Gen Z Yellow, Klein Blue, Barbie Pink). 
    Elements: Collage art, stickers, Memphis shapes, emojis. 
    Layout: Chaotic, overlapping, breaking the grid.
    Mood: Energetic, joyful, expressive, loud.`
  },
  {
    id: 'deconstructed',
    name: 'Deconstructed Layout',
    name_zh: '现代解构排版',
    description: 'Broken grid, typography heavy, brutalist, experimental.',
    description_zh: '打破网格，文字为主，粗野主义，实验性设计。',
    previewColor: '#1A1A1A',
    icon: '📐',
    promptInstruction: `Style: Modern Experimental Deconstructed Layout.
    Core Concept: Order within disorder. Typography as the main visual element.
    Visuals: Oversized headlines, mixed fonts (Serif vs Sans), utilitarian UI elements (barcodes, timestamps).
    Composition: Overlapping text and images, cropped edges, chaotic but balanced.
    Colors: High contrast (Black/White + Neon) or Morandi.
    Mood: Avant-garde, free, artsy.`
  },
  {
    id: 'soft-3d',
    name: 'Soft 3D / Clay',
    name_zh: '软萌3D / 粘土风',
    description: 'Claymorphism, inflated shapes, soft lighting, cute.',
    description_zh: '粘土拟物，膨胀形状，柔光渲染，Q弹治愈。',
    previewColor: '#FF99CC',
    icon: '🎈',
    promptInstruction: `Style: 3D Hyper-Tactile & Material Pop (Soft 3D).
    Core Concept: Tactile empathy, claymorphism, inflated art.
    Visuals: Materials like matte clay, glossy balloon/plastic, felt/fur.
    Shapes: Rounded, chubby, no sharp edges.
    Lighting: Soft studio global illumination, occlusion.
    Colors: Candy pastels, bright warm tones.
    Mood: Healing, cute, playful, warm.`
  },
  {
    id: 'acid-collage',
    name: 'Acid Collage',
    name_zh: '酸性波普拼贴',
    description: 'Receipts, stickers, high contrast, industrial, chaotic.',
    description_zh: '生活碎片，贴纸感，高对比度，有序混乱的工业风。',
    previewColor: '#CCFF00',
    icon: '🧾',
    promptInstruction: `Style: Playful Acid Collage / Gen Z Scrapbook.
    Core Concept: Organized chaos, everyday symbols (receipts, warnings).
    Visuals: Sticker art look with white strokes, pixel icons, Windows 95 UI elements.
    Colors: High contrast, acid neon accents (Hot Pink, Caution Yellow) on neutral backgrounds.
    Mood: Trendy, rebellious, deconstructed.`
  },
  {
    id: 'y3k',
    name: 'Y3K Future',
    name_zh: 'Y3K 未来美学',
    description: 'Liquid metal, silver, bio-tech, ethereal, AI surrealism.',
    description_zh: '液态金属，生化科技，空灵，AI超现实主义。',
    previewColor: '#C0C0C0',
    icon: '👽',
    promptInstruction: `Style: Y3K (Year 3000 Aesthetics).
    Core Concept: Fluid organic forms meet high-tech. Liquid metal.
    Visuals: Chrome/Silver, Holographic Ice Blue, Iridescent White.
    Texture: High-gloss liquid metal, aerogel, bionic skin.
    Subject: Cyborgs, avatars, mutated nature, floating tech.
    Mood: Ethereal, cold, post-human, surreal.`
  },
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    name_zh: '新丑风 / 酸性设计',
    description: 'Eye-straining contrast, raw, glitch, anti-design.',
    description_zh: '视觉冲击，反设计，故障艺术，高对比撞色。',
    previewColor: '#0000FF',
    icon: '⚠️',
    promptInstruction: `Style: Neo-Brutalism & Acid Graphics.
    Core Concept: Rebellion, anti-design, "ugly-cool".
    Visuals: Eye-straining colors (Klein Blue + Green), stretched fonts, pixel art, glitch effects.
    Composition: Decentralized, raw, unpolished.
    Mood: Raw, playful, maverick, retro-futurist.`
  }
];

export const MODEL_NAME = 'gemini-2.5-flash-image';