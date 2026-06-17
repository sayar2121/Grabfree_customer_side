import { useBlogs } from '@/hooks/useBlogs';
import BlogCard from '@/components/blogs/BlogCard';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const CardSkeleton = () => <div className="glass-card overflow-hidden"><div className="skeleton h-48 w-full" /><div className="p-5 space-y-3"><div className="skeleton h-4 w-full" /><div className="skeleton h-4 w-3/4" /><div className="skeleton h-3 w-1/2" /></div></div>;

export default function BlogsPage() {
  const { data, isLoading } = useBlogs();
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="section-container py-12">
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Shopping Tips & Guides</h1>
        <p className="text-slate-400">Expert advice to help you save more on every purchase</p>
      </motion.div>
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />) :
          data?.data.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
      </motion.div>
    </motion.div>
  );
}
