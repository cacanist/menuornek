'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import { Leaf, Sprout, Star, Sparkles } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

const getTagIcon = (tag: string) => {
  switch (tag) {
    case 'Vejetaryen':
      return { Icon: Leaf, color: '#708A81', label: 'Vejetaryen' };
    case 'Vegan':
      return { Icon: Sprout, color: '#708A81', label: 'Vegan' };
    case 'Şefin Seçimi':
      return { Icon: Star, color: '#C8A974', label: "Şefin Seçimi" };
    case 'Yeni':
      return { Icon: Sparkles, color: '#C8A974', label: 'Yeni' };
    default:
      return { Icon: Star, color: '#133328', label: tag };
  }
};

export default function MenuCard({ item, index = 0 }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative py-4"
    >
      <div className="flex flex-row items-start gap-4">
        {/* Image Section - Left Side */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 overflow-hidden rounded-2xl" style={{ backgroundColor: 'rgba(200, 169, 116, 0.1)' }}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 128px, 144px"
          />
        </div>
        
        {/* Content - Right Side */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Title and Price - Top Row */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-serif font-semibold text-lg leading-tight flex-1" style={{ color: '#A68B5A' }}>
              {item.name}
            </h3>
            <span className="font-bold text-lg whitespace-nowrap" style={{ color: '#5C2328' }}>
              {item.price}
            </span>
          </div>
          
          {/* Description */}
          {item.description && (
            <p className="text-sm font-sans leading-relaxed mb-3 line-clamp-2" style={{ color: '#133328', opacity: 0.6 }}>
              {item.description}
            </p>
          )}
          
          {/* Tag Icons - Bottom Row */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-3 mt-auto">
              {item.tags.map((tag) => {
                const { Icon, color, label } = getTagIcon(tag);
                return (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5"
                    title={label}
                  >
                    <Icon size={16} strokeWidth={2} style={{ color }} />
                    <span className="text-xs font-medium" style={{ color: '#133328', opacity: 0.5 }}>{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Animated Border Line - Left to Right */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1, 
          delay: index * 0.15 + 0.3, 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="absolute bottom-0 left-0 h-[1px] origin-left"
        style={{ backgroundColor: 'rgba(200, 169, 116, 0.4)' }}
      />
    </motion.div>
  );
}
