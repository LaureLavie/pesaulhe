
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  
  eslint: {
    // Attention: cela permet de déployer, mais ne règle pas les erreurs de code
    ignoreDuringBuilds: true, 
  },
  typescript: {
    // Idem pour TypeScript si tu veux forcer le passage
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['node-ical'],
};



module.exports = nextConfig;