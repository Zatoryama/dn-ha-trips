export interface Route {
  id: string;
  name: string;
  nameVi: string;
  from: string;
  to: string;
  distance: number;
  duration: string;
  description: string;
  descriptionVi: string;
  highlights: string[];
  image: string;
  popular: boolean;
  category: 'transfer' | 'day-trip' | 'tour';
  pricing: {
    sedan: number;
    suv: number;
    van: number;
    motorbike: number;
  };
}

export const routes: Route[] = [
  {
    id: 'route-001',
    name: 'Da Nang Airport to Hoi An',
    nameVi: 'Sân bay Đà Nẵng đến Hội An',
    from: 'Da Nang Airport',
    to: 'Hoi An Old Town',
    distance: 30,
    duration: '40-50 min',
    description: 'The most popular transfer route connecting Da Nang International Airport to the UNESCO World Heritage town of Hoi An. Comfortable ride along the coastal road with ocean views.',
    descriptionVi: 'Tuyến đường chuyển tiếp phổ biến nhất kết nối Sân bay Quốc tế Đà Nẵng đến phố cổ Hội An.',
    highlights: ['Air-conditioned vehicle', 'Meet & greet at airport', 'Free water bottles', 'Direct door-to-door service'],
    image: '/images/route-airport-hoian.jpg',
    popular: true,
    category: 'transfer',
    pricing: { sedan: 350000, suv: 450000, van: 600000, motorbike: 200000 },
  },
  {
    id: 'route-002',
    name: 'Da Nang to Ba Na Hills',
    nameVi: 'Đà Nẵng đến Bà Nà Hills',
    from: 'Da Nang City',
    to: 'Ba Na Hills',
    distance: 25,
    duration: '45-60 min',
    description: 'Journey to the famous Golden Bridge and French Village at Ba Na Hills. Winding mountain road with stunning views of the Truong Son mountains.',
    descriptionVi: 'Hành trình đến Cầu Vàng và Làng Pháp nổi tiếng tại Bà Nà Hills.',
    highlights: ['Mountain road experience', 'Photo stops available', 'Wait & return service', 'Ticket booking assistance'],
    image: '/images/route-bana.jpg',
    popular: true,
    category: 'day-trip',
    pricing: { sedan: 500000, suv: 650000, van: 850000, motorbike: 300000 },
  },
  {
    id: 'route-003',
    name: 'Hoi An to My Son Sanctuary',
    nameVi: 'Hội An đến Thánh địa Mỹ Sơn',
    from: 'Hoi An',
    to: 'My Son Sanctuary',
    distance: 40,
    duration: '50-60 min',
    description: 'Visit the ancient Hindu temples of the Champa Kingdom, a UNESCO World Heritage Site. Journey through rural Vietnamese countryside with rice paddies and water buffalo.',
    descriptionVi: 'Thăm các ngôi đền Hindu cổ của Vương quốc Chăm Pa, Di sản Thế giới UNESCO.',
    highlights: ['UNESCO World Heritage Site', 'Rural countryside views', 'Wait & return included', 'Guide recommendations'],
    image: '/images/route-myson.jpg',
    popular: true,
    category: 'day-trip',
    pricing: { sedan: 600000, suv: 750000, van: 950000, motorbike: 350000 },
  },
  {
    id: 'route-004',
    name: 'Da Nang to Hue Imperial City',
    nameVi: 'Đà Nẵng đến Kinh thành Huế',
    from: 'Da Nang',
    to: 'Hue',
    distance: 100,
    duration: '2-2.5 hours',
    description: 'Scenic drive to the former imperial capital via the legendary Hai Van Pass. Stop at Lang Co Beach and enjoy panoramic views of the coast. One of the most beautiful drives in Vietnam.',
    descriptionVi: 'Chuyến đi đẹp đến cố đô qua đèo Hải Vân huyền thoại.',
    highlights: ['Hai Van Pass crossing', 'Lang Co Beach stop', 'Imperial City access', 'Full-day tour option'],
    image: '/images/route-hue.jpg',
    popular: true,
    category: 'tour',
    pricing: { sedan: 1200000, suv: 1500000, van: 2000000, motorbike: 700000 },
  },
  {
    id: 'route-005',
    name: 'Da Nang City Tour',
    nameVi: 'Tour thành phố Đà Nẵng',
    from: 'Da Nang',
    to: 'Da Nang (circular)',
    distance: 50,
    duration: '4-5 hours',
    description: 'Comprehensive city tour covering Dragon Bridge, Marble Mountains, Lady Buddha statue, Han Market, and the stunning Son Tra Peninsula with wild monkeys.',
    descriptionVi: 'Tour thành phố toàn diện bao gồm Cầu Rồng, Ngũ Hành Sơn, tượng Phật Bà và bán đảo Sơn Trà.',
    highlights: ['Dragon Bridge', 'Marble Mountains', 'Lady Buddha', 'Son Tra Peninsula', 'Local markets'],
    image: '/images/route-danang-city.jpg',
    popular: true,
    category: 'tour',
    pricing: { sedan: 800000, suv: 1000000, van: 1400000, motorbike: 500000 },
  },
  {
    id: 'route-006',
    name: 'Hoi An Ancient Town Tour',
    nameVi: 'Tour phố cổ Hội An',
    from: 'Hoi An',
    to: 'Hoi An (circular)',
    distance: 30,
    duration: '3-4 hours',
    description: 'Explore the enchanting ancient town including Japanese Bridge, Chinese Assembly Halls, Tra Que Vegetable Village, and the beautiful An Bang Beach.',
    descriptionVi: 'Khám phá phố cổ quyến rũ bao gồm Chùa Cầu, Hội quán Trung Hoa, Làng rau Trà Quế và biển An Bàng.',
    highlights: ['Japanese Bridge', 'Lantern-lit streets', 'Tra Que Village', 'An Bang Beach', 'Local cuisine'],
    image: '/images/route-hoian-tour.jpg',
    popular: false,
    category: 'tour',
    pricing: { sedan: 500000, suv: 650000, van: 900000, motorbike: 300000 },
  },
  {
    id: 'route-007',
    name: 'Da Nang Airport Transfer',
    nameVi: 'Đưa đón sân bay Đà Nẵng',
    from: 'Da Nang Airport',
    to: 'Da Nang Hotels',
    distance: 8,
    duration: '15-25 min',
    description: 'Quick and comfortable transfer from Da Nang International Airport to any hotel in Da Nang city center. Meet & greet service with name board.',
    descriptionVi: 'Đưa đón nhanh chóng và thoải mái từ Sân bay Quốc tế Đà Nẵng đến khách sạn trong thành phố.',
    highlights: ['Meet & greet', 'Name board service', 'Flight monitoring', '24/7 availability'],
    image: '/images/route-airport.jpg',
    popular: true,
    category: 'transfer',
    pricing: { sedan: 200000, suv: 280000, van: 400000, motorbike: 100000 },
  },
  {
    id: 'route-008',
    name: 'Hai Van Pass Adventure',
    nameVi: 'Phiêu lưu đèo Hải Vân',
    from: 'Da Nang',
    to: 'Lang Co & Return',
    distance: 60,
    duration: '3-4 hours',
    description: 'Experience the legendary Hai Van Pass featured in Top Gear. Winding mountain road with breathtaking ocean and mountain views. Stop at the summit bunker and Lang Co Beach.',
    descriptionVi: 'Trải nghiệm đèo Hải Vân huyền thoại nổi tiếng trong Top Gear.',
    highlights: ['Top Gear famous route', 'Summit viewpoint', 'Old bunkers', 'Lang Co Beach', 'Photo opportunities'],
    image: '/images/route-haivanpass.jpg',
    popular: true,
    category: 'tour',
    pricing: { sedan: 700000, suv: 900000, van: 1200000, motorbike: 400000 },
  },
];

export const destinations = [
  {
    id: 'da-nang',
    name: 'Da Nang',
    nameVi: 'Đà Nẵng',
    description: 'Vietnam\'s most liveable city with stunning beaches, the iconic Dragon Bridge, and gateway to Central Vietnam\'s attractions.',
    descriptionVi: 'Thành phố đáng sống nhất Việt Nam với bãi biển tuyệt đẹp và Cầu Rồng biểu tượng.',
    image: '/images/dest-danang.jpg',
    highlights: ['My Khe Beach', 'Dragon Bridge', 'Son Tra Peninsula', 'Marble Mountains', 'Han Market'],
    travelTips: [
      'Best visited March to September for beach weather',
      'Dragon Bridge breathes fire every Saturday and Sunday at 9 PM',
      'My Khe Beach was named one of the most beautiful beaches in the world',
      'Street food around Han Market is excellent and affordable',
    ],
  },
  {
    id: 'hoi-an',
    name: 'Hoi An',
    nameVi: 'Hội An',
    description: 'A beautifully preserved ancient trading port, now a UNESCO World Heritage Site famous for lantern-lit streets, tailoring shops, and incredible cuisine.',
    descriptionVi: 'Cảng thương mại cổ được bảo tồn tuyệt đẹp, Di sản Thế giới UNESCO.',
    image: '/images/dest-hoian.jpg',
    highlights: ['Japanese Covered Bridge', 'Ancient Town', 'Lantern Festival', 'Tailoring Shops', 'Cooking Classes'],
    travelTips: [
      'Visit the ancient town in the evening when lanterns are lit',
      'Full moon lantern festival on the 14th of each lunar month',
      'Get custom tailoring done - many shops can complete orders in 24 hours',
      'Try Cao Lau, Hoi An\'s signature noodle dish',
    ],
  },
  {
    id: 'ba-na-hills',
    name: 'Ba Na Hills',
    nameVi: 'Bà Nà Hills',
    description: 'A mountaintop resort featuring the world-famous Golden Bridge held by giant stone hands, French Village, and one of the longest cable car systems in the world.',
    descriptionVi: 'Khu nghỉ dưỡng trên đỉnh núi với Cầu Vàng nổi tiếng thế giới.',
    image: '/images/dest-bana.jpg',
    highlights: ['Golden Bridge', 'French Village', 'Cable Car', 'Fantasy Park', 'Alpine Coaster'],
    travelTips: [
      'Arrive early (before 10 AM) to avoid crowds',
      'Weather is cooler than sea level - bring a light jacket',
      'Cable car ticket includes all attractions inside',
      'Allow a full day to experience everything',
    ],
  },
  {
    id: 'my-son',
    name: 'My Son Sanctuary',
    nameVi: 'Thánh địa Mỹ Sơn',
    description: 'Ancient Hindu temple complex of the Champa Kingdom dating back to the 4th century. Often compared to Angkor Wat, this UNESCO site is set in a lush jungle valley.',
    descriptionVi: 'Quần thể đền thờ Hindu cổ của Vương quốc Chăm Pa có từ thế kỷ thứ 4.',
    image: '/images/dest-myson.jpg',
    highlights: ['Champa Temples', 'UNESCO Heritage', 'Traditional Dance Show', 'Jungle Setting', 'Ancient History'],
    travelTips: [
      'Best visited in the morning before the heat',
      'Traditional Cham dance performances at 9:30 AM and 10:30 AM',
      'Hire a local guide for the full historical context',
      'Combine with a countryside bike ride from Hoi An',
    ],
  },
  {
    id: 'hue',
    name: 'Hue Imperial City',
    nameVi: 'Kinh thành Huế',
    description: 'Former capital of Vietnam and seat of the Nguyen Dynasty emperors. The Imperial City, royal tombs, and Perfume River make this a must-visit destination.',
    descriptionVi: 'Cố đô Việt Nam và nơi ngự trị của các vua triều Nguyễn.',
    image: '/images/dest-hue.jpg',
    highlights: ['Imperial Citadel', 'Royal Tombs', 'Perfume River', 'Thien Mu Pagoda', 'Royal Cuisine'],
    travelTips: [
      'The drive from Da Nang via Hai Van Pass is spectacular',
      'Visit at least 2-3 royal tombs - each has a unique style',
      'Try Hue royal cuisine - the most refined in Vietnam',
      'A sunset boat ride on the Perfume River is magical',
    ],
  },
  {
    id: 'marble-mountains',
    name: 'Marble Mountains',
    nameVi: 'Ngũ Hành Sơn',
    description: 'Five limestone and marble hills named after the five elements. Filled with caves, Buddhist pagodas, and panoramic viewpoints overlooking Da Nang and the coast.',
    descriptionVi: 'Năm ngọn đồi đá vôi và đá cẩm thạch được đặt tên theo ngũ hành.',
    image: '/images/dest-marble.jpg',
    highlights: ['Cave Temples', 'Panoramic Views', 'Buddhist Pagodas', 'Stone Carving Village', 'Elevator Access'],
    travelTips: [
      'There\'s an elevator for those who don\'t want to climb stairs',
      'Thuy Son (Water Mountain) has the most to see',
      'Bring a flashlight for exploring the darker caves',
      'Visit the stone carving village at the base',
    ],
  },
];

export function calculatePrice(
  routeId: string,
  vehicleType: 'sedan' | 'suv' | 'van' | 'motorbike'
): number | null {
  const route = routes.find((r) => r.id === routeId);
  if (!route) return null;
  return route.pricing[vehicleType];
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  const usdAmount = amount / 25000;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usdAmount);
}
