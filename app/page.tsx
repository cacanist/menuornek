import Image from 'next/image';
import menuData from '@/data/menu.json';
import MenuCard from '@/components/MenuCard';
import { MenuData } from '@/types/menu';
import { ArrowDown } from 'lucide-react';

const data = menuData as unknown as MenuData;

export default function Home() {
  return (
    <main className="min-h-screen bg-white h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center px-4 snap-start shrink-0 overflow-hidden">
        {/* Background Pattern - Pasta/Makarna Inspired */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #9ca3af 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}
        />
        
        {/* Decorative Circle Blur */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-orange-100 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-green-50 rounded-full blur-[100px] opacity-60" />

        <div className="relative flex flex-col items-center justify-center text-center max-w-2xl mx-auto z-10">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900 font-serif leading-tight">
            {data.restaurantInfo.name}
            <span className="text-orange-500">.</span>
          </h1>
          
          <div className="w-16 h-1 bg-orange-500 mb-8 rounded-full opacity-80"></div>

          <p className="text-lg md:text-2xl text-gray-600 font-light font-sans tracking-wide leading-relaxed max-w-lg mb-10">
            {data.restaurantInfo.slogan}
          </p>
          
          <a 
            href="#makarna" 
            className="group flex flex-col items-center gap-2 text-sm text-gray-400 font-medium tracking-widest uppercase hover:text-orange-500 transition-colors duration-300"
          >
            Menüyü Keşfet
            <ArrowDown size={20} className="animate-bounce mt-2 text-orange-500" />
          </a>
        </div>
      </section>

      {/* Sticky Navigation - Glassmorphism */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm snap-start">
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar max-w-7xl mx-auto md:justify-center">
          {data.categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-6 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 font-medium text-sm whitespace-nowrap shadow-sm hover:shadow-md active:scale-95 transition-all hover:border-orange-400 hover:text-orange-400 focus:ring-2 focus:ring-orange-400/20 scroll-smooth font-serif tracking-wide"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Menu Sections */}
      <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-32 pb-32">
        {data.categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-28 min-h-[50vh] snap-start">
            {/* Main Category Title */}
            <div className="flex items-center gap-4 mb-12">
              <h1 className="text-4xl font-bold text-gray-900 font-serif italic">
                {category.name}
              </h1>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            
            {/* Subcategories or Direct Items */}
            {category.subcategories ? (
              <div className="space-y-20">
                {category.subcategories.map((subcat) => (
                  <div key={subcat.id} id={subcat.id}>
                    {/* Subcategory Title */}
                    <h2 className="text-3xl font-bold text-gray-800 font-serif mb-8">
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
