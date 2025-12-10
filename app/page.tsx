import Image from 'next/image';
import menuData from '@/data/menu.json';
import MenuCard from '@/components/MenuCard';
import { MenuData } from '@/types/menu';
import { ArrowDown, Wheat, Salad, Cake } from 'lucide-react';

const data = menuData as unknown as MenuData;

// Category icon mapping
const getCategoryIcon = (categoryId: string) => {
  const icons = {
    makarna: Wheat,
    baslangic: Salad,
    tatlilar: Cake,
  };
  return icons[categoryId as keyof typeof icons] || Wheat;
};

export default function Home() {
  return (
    <main className="min-h-screen h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth" style={{ backgroundColor: '#F4F1EA' }}>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center px-4 snap-start shrink-0 overflow-hidden" style={{ backgroundColor: '#F4F1EA' }}>
        {/* Background Pattern - Dots */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #133328 1.5px, transparent 1.5px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 25px 25px'
          }}
        />
        
        {/* Text Pattern - Restaurant Name */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none animate-pattern-slide"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='35' font-weight='bold' fill='%23133328' text-anchor='middle' dominant-baseline='central'%3E${encodeURIComponent(data.restaurantInfo.name)}%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '120px 60px',
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="relative flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10">
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight font-serif leading-tight mb-8" style={{ color: '#133328' }}>
            {data.restaurantInfo.name}
            <span style={{ color: '#C8A974' }}>.</span>
          </h1>

          {/* Slogan with Better Typography */}
          <p className="text-xl md:text-3xl font-light font-serif tracking-wide leading-relaxed max-w-2xl mb-12 italic" style={{ color: '#133328', opacity: 0.7 }}>
            {data.restaurantInfo.slogan}
          </p>
          
          {/* CTA Button */}
          <a 
            href="#makarna" 
            className="cta-button flex items-center gap-2 px-6 py-3 font-serif font-medium text-sm"
          >
            Menüyü Keşfet
            <ArrowDown size={16} />
          </a>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #F4F1EA, transparent)' }}></div>
      </section>

      {/* Sticky Navigation - Glassmorphism */}
      <nav className="sticky top-0 z-50 backdrop-blur-md py-4 shadow-sm snap-start" style={{ backgroundColor: 'rgba(244, 241, 234, 0.95)', borderBottom: '1px solid rgba(200, 169, 116, 0.2)' }}>
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar max-w-7xl mx-auto md:justify-center">
          {data.categories.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="category-pill flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 font-medium text-sm whitespace-nowrap shadow-sm hover:shadow-md active:scale-95 scroll-smooth font-serif tracking-wide"
              >
                <Icon size={16} strokeWidth={2} />
                {cat.name}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Menu Sections */}
      <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-32 pb-32">
        {data.categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-28 min-h-[50vh] snap-start">
            {/* Main Category Title */}
            <div className="flex items-center gap-4 mb-12">
              <h1 className="text-4xl font-bold font-serif italic" style={{ color: '#A68B5A' }}>
                {category.name}
              </h1>
              <div className="h-px flex-1" style={{ backgroundColor: 'rgba(200, 169, 116, 0.3)' }}></div>
            </div>
            
            {/* Subcategories or Direct Items */}
            {category.subcategories ? (
              <div className="space-y-20">
                {category.subcategories.map((subcat) => (
                  <div key={subcat.id} id={subcat.id}>
                    {/* Subcategory Title */}
                    <h2 className="text-3xl font-bold font-serif mb-8" style={{ color: '#133328' }}>
                      {subcat.name}
                    </h2>
                    
                    {/* Items */}
                    <div className="flex flex-col gap-3">
                      {subcat.items.map((item, index) => (
                        <MenuCard key={item.id} item={item} index={index} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Direct Items (no subcategories) */
              <div className="flex flex-col gap-3">
                {category.items?.map((item, index) => (
                  <MenuCard key={item.id} item={item} index={index} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
