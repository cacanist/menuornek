'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuCard({ item, index = 0 }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative py-4"
    >
      <div className="flex flex-row items-center gap-6">
        {/* Text Content - Left Side */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* Product Name */}
          <h3 className="text-gray-800 font-serif font-semibold text-xl mb-1.5 leading-tight">
            {item.name}
          </h3>
          
          {/* Description */}
          {item.description && (
            <p className="text-gray-500 text-sm font-sans leading-relaxed mb-2 line-clamp-2">
              {item.description}
            </p>
          )}
          
          {/* Price */}
          <p className="text-gray-900 font-bold text-xl font-serif">
            {item.price}
          </p>
          
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags.map((tag) => (
                <span 
                  key={tag} 
                  className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full text-white
                    ${tag === 'Vejetaryen' || tag === 'Vegan' ? 'bg-green-500' : 'bg-orange-400'}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Image Section - Right Side */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden bg-gray-100 rounded-md">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 128px, 160px"
          />
        </div>
      </div>
      
      {/* Animated Border Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-px bg-gray-200"
      />
    </motion.div>
  );
}
