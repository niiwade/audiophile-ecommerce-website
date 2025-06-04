export const products = [
  {
    id: 1,
    slug: 'xx99-mark-ii-headphones',
    name: 'XX99 Mark II Headphones',
    category: 'headphones',
    price: 2999,
    description: 'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.',
    features: 'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you\'re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you\'ll never miss a beat.',
    inBox: [
      { item: 'Headphone Unit', quantity: 1 },
      { item: 'Replacement Earcups', quantity: 2 },
      { item: 'User Manual', quantity: 1 },
      { item: '3.5mm 5m Audio Cable', quantity: 1 },
      { item: 'Travel Bag', quantity: 1 }
    ],
    image: '/images/xx99-mark-ii.jpg',
    gallery: [
      '/images/xx99-mark-ii-1.jpg',
      '/images/xx99-mark-ii-2.jpg',
      '/images/xx99-mark-ii-3.jpg'
    ]
  },
  {
    id: 2,
    slug: 'xx99-mark-i-headphones',
    name: 'XX99 Mark I Headphones',
    category: 'headphones',
    price: 1750,
    description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike.',
    features: 'As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.',
    inBox: [
      { item: 'Headphone Unit', quantity: 1 },
      { item: 'Replacement Earcups', quantity: 2 },
      { item: 'User Manual', quantity: 1 },
      { item: '3.5mm 5m Audio Cable', quantity: 1 }
    ],
    image: '/images/xx99-mark-i.jpg',
    gallery: [
      '/images/xx99-mark-i-1.jpg',
      '/images/xx99-mark-i-2.jpg',
      '/images/xx99-mark-i-3.jpg'
    ]
  },
  {
    id: 3,
    slug: 'xx59-headphones',
    name: 'XX59 Headphones',
    category: 'headphones',
    price: 899,
    description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.',
    features: 'These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.',
    inBox: [
      { item: 'Headphone Unit', quantity: 1 },
      { item: 'Replacement Earcups', quantity: 2 },
      { item: 'User Manual', quantity: 1 },
      { item: '3.5mm 5m Audio Cable', quantity: 1 }
    ],
    image: '/images/xx59.jpg',
    gallery: [
      '/images/xx59-1.jpg',
      '/images/xx59-2.jpg',
      '/images/xx59-3.jpg'
    ]
  },
  {
    id: 4,
    slug: 'zx9-speaker',
    name: 'ZX9 Speaker',
    category: 'speakers',
    price: 4500,
    description: 'Upgrade your sound system with the all new ZX9 active speaker. It\'s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.',
    features: 'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).',
    inBox: [
      { item: 'Speaker Unit', quantity: 2 },
      { item: 'Speaker Cloth Panel', quantity: 2 },
      { item: 'User Manual', quantity: 1 },
      { item: '3.5mm 7.5m Audio Cable', quantity: 1 },
      { item: '7.5m Optical Cable', quantity: 1 }
    ],
    image: '/images/zx9.jpg',
    gallery: [
      '/images/zx9-1.jpg',
      '/images/zx9-2.jpg',
      '/images/zx9-3.jpg'
    ]
  },
  {
    id: 5,
    slug: 'zx7-speaker',
    name: 'ZX7 Speaker',
    category: 'speakers',
    price: 3500,
    description: 'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
    features: 'Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.',
    inBox: [
      { item: 'Speaker Unit', quantity: 2 },
      { item: 'Speaker Cloth Panel', quantity: 2 },
      { item: 'User Manual', quantity: 1 },
      { item: '3.5mm 7.5m Audio Cable', quantity: 1 },
      { item: '7.5m Optical Cable', quantity: 1 }
    ],
    image: '/images/zx7.jpg',
    gallery: [
      '/images/zx7-1.jpg',
      '/images/zx7-2.jpg',
      '/images/zx7-3.jpg'
    ]
  },
  {
    id: 6,
    slug: 'yx1-earphones',
    name: 'YX1 Earphones',
    category: 'earphones',
    price: 599,
    description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
    features: 'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.',
    inBox: [
      { item: 'Earphone Unit', quantity: 2 },
      { item: 'Multi-size Earplugs', quantity: 6 },
      { item: 'User Manual', quantity: 1 },
      { item: 'USB-C Charging Cable', quantity: 1 },
      { item: 'Travel Pouch', quantity: 1 }
    ],
    image: '/images/image-product.jpg',
    gallery: [
      '/images/image-gallery-1.jpg',
      '/images/image-gallery-2.jpg',
      '/images/image-gallery-3.jpg'
    ]
  }
];

export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getAllProducts = () => {
  return products;
};
