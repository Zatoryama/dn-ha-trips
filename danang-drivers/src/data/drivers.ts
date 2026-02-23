export interface Driver {
  id: string;
  name: string;
  nameVi: string;
  photo: string;
  rating: number;
  reviewCount: number;
  experience: number;
  languages: string[];
  vehicleType: 'sedan' | 'suv' | 'van' | 'motorbike';
  vehicleName: string;
  vehicleCapacity: number;
  services: string[];
  areas: string[];
  bio: string;
  bioVi: string;
  phone: string;
  whatsapp: string;
  pricePerKm: number;
  featured: boolean;
  available: boolean;
}

export const drivers: Driver[] = [
  {
    id: 'driver-001',
    name: 'Nguyen Van Minh',
    nameVi: 'Nguyễn Văn Minh',
    photo: '/images/driver-minh.jpg',
    rating: 4.9,
    reviewCount: 342,
    experience: 12,
    languages: ['English', 'Vietnamese', 'French'],
    vehicleType: 'sedan',
    vehicleName: 'Toyota Camry 2023',
    vehicleCapacity: 4,
    services: ['Airport Transfer', 'City Tour', 'Day Trip', 'Multi-day Tour'],
    areas: ['Da Nang', 'Hoi An', 'Hue', 'My Son', 'Ba Na Hills'],
    bio: 'Professional driver with 12 years of experience in Central Vietnam tourism. Former hotel concierge with deep knowledge of local culture, cuisine, and hidden gems. I love sharing stories about Vietnamese history and helping travelers discover authentic experiences.',
    bioVi: 'Tài xế chuyên nghiệp với 12 năm kinh nghiệm du lịch miền Trung Việt Nam.',
    phone: '+84 905 123 456',
    whatsapp: '+84905123456',
    pricePerKm: 12000,
    featured: true,
    available: true,
  },
  {
    id: 'driver-002',
    name: 'Tran Thi Lan',
    nameVi: 'Trần Thị Lan',
    photo: '/images/driver-lan.jpg',
    rating: 4.8,
    reviewCount: 218,
    experience: 8,
    languages: ['English', 'Vietnamese', 'Korean'],
    vehicleType: 'suv',
    vehicleName: 'Ford Everest 2022',
    vehicleCapacity: 6,
    services: ['Airport Transfer', 'Day Trip', 'Multi-day Tour', 'Shopping Tour'],
    areas: ['Da Nang', 'Hoi An', 'Ba Na Hills', 'Marble Mountains'],
    bio: 'One of the few female drivers in Da Nang, I bring a unique perspective to touring. Fluent in Korean from 3 years living in Seoul. Specialist in family tours and shopping excursions. My SUV is perfect for families with kids and extra luggage.',
    bioVi: 'Một trong số ít nữ tài xế tại Đà Nẵng, mang đến góc nhìn độc đáo cho du lịch.',
    phone: '+84 905 234 567',
    whatsapp: '+84905234567',
    pricePerKm: 14000,
    featured: true,
    available: true,
  },
  {
    id: 'driver-003',
    name: 'Le Hoang Nam',
    nameVi: 'Lê Hoàng Nam',
    photo: '/images/driver-nam.jpg',
    rating: 4.9,
    reviewCount: 456,
    experience: 15,
    languages: ['English', 'Vietnamese'],
    vehicleType: 'van',
    vehicleName: 'Mercedes Sprinter 2023',
    vehicleCapacity: 12,
    services: ['Group Tour', 'Airport Transfer', 'Multi-day Tour', 'Corporate Transfer'],
    areas: ['Da Nang', 'Hoi An', 'Hue', 'My Son', 'Ba Na Hills', 'Phong Nha'],
    bio: 'Veteran driver specializing in group tours with the most spacious vehicle in our fleet. 15 years navigating every road in Central Vietnam. Expert in multi-day itineraries from Da Nang to Phong Nha caves. Clean driving record and first-aid certified.',
    bioVi: 'Tài xế kỳ cựu chuyên tour nhóm với xe rộng rãi nhất trong đội xe.',
    phone: '+84 905 345 678',
    whatsapp: '+84905345678',
    pricePerKm: 18000,
    featured: true,
    available: true,
  },
  {
    id: 'driver-004',
    name: 'Pham Duc Thanh',
    nameVi: 'Phạm Đức Thành',
    photo: '/images/driver-thanh.jpg',
    rating: 4.7,
    reviewCount: 189,
    experience: 6,
    languages: ['English', 'Vietnamese', 'Japanese'],
    vehicleType: 'sedan',
    vehicleName: 'Honda Civic 2023',
    vehicleCapacity: 4,
    services: ['Airport Transfer', 'City Tour', 'Food Tour', 'Photography Tour'],
    areas: ['Da Nang', 'Hoi An', 'My Son', 'Marble Mountains'],
    bio: 'Young and energetic driver who studied tourism in Da Nang. Passionate about food and photography - I know the best street food spots and most photogenic locations. Japanese-speaking for our many Japanese visitors. Tech-savvy with real-time route optimization.',
    bioVi: 'Tài xế trẻ trung và năng động, tốt nghiệp ngành du lịch tại Đà Nẵng.',
    phone: '+84 905 456 789',
    whatsapp: '+84905456789',
    pricePerKm: 11000,
    featured: false,
    available: true,
  },
  {
    id: 'driver-005',
    name: 'Vo Van Hai',
    nameVi: 'Võ Văn Hải',
    photo: '/images/driver-hai.jpg',
    rating: 4.8,
    reviewCount: 267,
    experience: 10,
    languages: ['English', 'Vietnamese', 'Chinese'],
    vehicleType: 'suv',
    vehicleName: 'Toyota Fortuner 2023',
    vehicleCapacity: 6,
    services: ['Airport Transfer', 'Day Trip', 'Multi-day Tour', 'Adventure Tour'],
    areas: ['Da Nang', 'Hoi An', 'Hue', 'Ba Na Hills', 'Son Tra Peninsula'],
    bio: 'Adventure specialist with extensive knowledge of off-the-beaten-path destinations. 10 years of driving experience including mountain and coastal roads. Mandarin Chinese speaker serving our Chinese-speaking guests. Expert on Son Tra Peninsula monkey tours.',
    bioVi: 'Chuyên gia phiêu lưu với kiến thức sâu rộng về các điểm đến ít người biết.',
    phone: '+84 905 567 890',
    whatsapp: '+84905567890',
    pricePerKm: 14000,
    featured: false,
    available: true,
  },
  {
    id: 'driver-006',
    name: 'Nguyen Thanh Tung',
    nameVi: 'Nguyễn Thanh Tùng',
    photo: '/images/driver-tung.jpg',
    rating: 4.6,
    reviewCount: 134,
    experience: 4,
    languages: ['English', 'Vietnamese'],
    vehicleType: 'motorbike',
    vehicleName: 'Honda Winner X 2023',
    vehicleCapacity: 1,
    services: ['City Tour', 'Food Tour', 'Motorbike Tour', 'Photography Tour'],
    areas: ['Da Nang', 'Hoi An', 'Hai Van Pass', 'Son Tra Peninsula'],
    bio: 'The motorbike experience specialist! Perfect for solo travelers and couples wanting an authentic Vietnamese adventure. Expert rider with advanced safety gear provided. The iconic Hai Van Pass ride is my signature tour - featured in Top Gear Vietnam Special.',
    bioVi: 'Chuyên gia trải nghiệm xe máy! Hoàn hảo cho du khách solo và cặp đôi.',
    phone: '+84 905 678 901',
    whatsapp: '+84905678901',
    pricePerKm: 8000,
    featured: false,
    available: true,
  },
];

export const vehicleTypes = {
  sedan: { label: 'Sedan', icon: '🚗', capacity: '1-4 passengers' },
  suv: { label: 'SUV', icon: '🚙', capacity: '1-6 passengers' },
  van: { label: 'Van', icon: '🚐', capacity: '1-12 passengers' },
  motorbike: { label: 'Motorbike', icon: '🏍️', capacity: '1 passenger' },
};
