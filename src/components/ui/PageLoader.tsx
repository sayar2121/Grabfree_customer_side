import { motion } from 'framer-motion';
import { APP_NAME } from '@/constants';
import { useThemeStore } from '@/store/themeStore';

export default function PageLoader() {
  const { isDark } = useThemeStore();

  return (
    <div className="fixed inset-0 z-[100] w-full flex flex-col items-center justify-center gap-10 theme-bg-primary overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative flex items-center justify-center z-10">
        
        {/* Radiating Ripple Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-brand-orange/30"
            initial={{ width: 64, height: 64, opacity: 1 }}
            animate={{ 
              width: [64, 200 + (i * 100)], 
              height: [64, 200 + (i * 100)],
              opacity: [0.8, 0],
              borderWidth: [2, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Floating Brand Logo Container */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-orange to-brand-violet p-[2px] shadow-[0_0_40px_rgba(249,115,22,0.3)] dark:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
        >
          <div className="w-full h-full bg-white dark:bg-[#0F172A] rounded-full flex items-center justify-center overflow-hidden relative">
            
            {/* Shimmer sweep inside logo */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
            
            {/* 3D Flipping Brand Logo */}
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/ICON.png" alt="GrabFree Icon" className="w-14 h-14 object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            </motion.div>
            
          </div>
        </motion.div>
      </div>

      {/* Animated Text */}
      <div className="flex flex-col items-center gap-3 z-10">
        <div className="flex gap-1">
          {APP_NAME.split('').map((char, index) => (
            <motion.span
              key={index}
              animate={{ 
                y: [0, -10, 0], 
                color: [isDark ? '#94A3B8' : '#64748B', '#F97316', isDark ? '#94A3B8' : '#64748B'],
                textShadow: ['0px 0px 0px transparent', isDark ? '0px 0px 10px rgba(249,115,22,0.8)' : '0px 0px 10px rgba(249,115,22,0.4)', '0px 0px 0px transparent']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.1,
                ease: "easeInOut"
              }}
              className="text-xl font-black tracking-[0.2em] uppercase"
            >
              {char}
            </motion.span>
          ))}
        </div>
        
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs text-brand-orange/80 font-medium tracking-widest uppercase"
        >
          Curating Best Deals...
        </motion.div>
      </div>

    </div>
  );
}
