export const mockClothing = [
  {
    id: crypto.randomUUID(),
    name: 'Ribbed Knit Sweater',
    category: 'tops' as const,
    colors: ['#F5F0E8', '#C4B9A8', '#8B7355'],
    tags: ['casual', 'winter'],
    brand: 'Zara',
    material: '80% Cotton, 20% Polyester',
    notes: 'Comfortable everyday sweater, great for layering.',
    isFavorite: false,
    imageUrl: 'images/ribbed-knit-sweater.jpg'
  },
  {
    id: crypto.randomUUID(),
    name: 'Satin Button-Up Shirt',
    category: 'tops' as const,
    colors: ['#8FAF8F'],
    tags: ['work', 'spring', 'minimal'],
    brand: 'Massimo Dutti',
    material: '100% Polyester',
    notes: 'Lightweight and silky feel. Perfect for work or dinner outings.',
    isFavorite: true,
    imageUrl: 'images/satin-button-up.jpg'
  },
  {
    id: crypto.randomUUID(),
    name: 'Classic Trench Coat',
    category: 'outerwear' as const,
    colors: ['#C4A882', '#D4B896'],
    tags: ['work', 'casual', 'autumn'],
    brand: 'Mango',
    material: '65% Polyester, 35% Cotton',
    notes: 'Timeless trench, works for both office and weekend.',
    isFavorite: false,
    imageUrl: 'images/trench-coat.jpg'
  },
  {
    id: crypto.randomUUID(),
    name: 'Straight Leg Jeans',
    category: 'bottoms' as const,
    colors: ['#6B8CAE', '#8BA4BE'],
    tags: ['casual', 'summer'],
    brand: 'Levi\'s',
    material: '100% Denim',
    notes: 'Versatile straight cut, fits most tops.',
    isFavorite: true,
    imageUrl: 'images/straight-jeans.jpg'
  },
  {
    id: crypto.randomUUID(),
    name: 'White Leather Sneakers',
    category: 'shoes' as const,
    colors: ['#FFFFFF', '#F5F5F5'],
    tags: ['casual', 'summer'],
    brand: 'Nike',
    material: 'Genuine Leather',
    notes: 'Clean everyday sneakers, goes with almost everything.',
    isFavorite: false,
    imageUrl: 'images/white-sneakers.jpg'
  },
  {
    id: crypto.randomUUID(),
    name: 'Leather Tote Bag',
    category: 'accessories' as const,
    colors: ['#8B5E3C'],
    tags: ['work', 'casual'],
    brand: 'Coach',
    material: 'Full-grain Leather',
    notes: 'Spacious work bag, fits laptop and essentials.',
    isFavorite: true,
    imageUrl: 'images/leather-tote.jpg'
  },
  {
    id: crypto.randomUUID(),
    name: 'Slip Dress',
    category: 'dresses' as const,
    colors: ['#1A1A1A', '#4A4A4A'],
    tags: ['evening', 'minimal'],
    brand: 'H&M',
    material: '100% Satin',
    notes: 'Elegant minimalist dress for evening occasions.',
    isFavorite: false,
    imageUrl: 'images/slip-dress.jpg'
  },
  {
    id: crypto.randomUUID(),
    name: 'Pleated Midi Skirt',
    category: 'bottoms' as const,
    colors: ['#E8DFD0', '#D4C9B5'],
    tags: ['work', 'spring', 'casual'],
    brand: 'Zara',
    material: '100% Polyester',
    notes: 'Flowy pleated skirt, perfect for spring workdays.',
    isFavorite: false,
    imageUrl: 'images/pleated-skirt.jpg'
  }
];