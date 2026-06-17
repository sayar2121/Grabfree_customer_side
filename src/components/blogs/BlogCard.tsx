import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { type Blog } from '@/types';
import { formatDate, truncate } from '@/lib/utils';

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export default function BlogCard({ blog, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="glass-card overflow-hidden group"
    >
      {/* Thumbnail */}
      <Link to={`/blogs/${blog.slug}`} className="block overflow-hidden h-48">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          {blog.category && (
            <span className="badge badge-brand text-[10px]">{blog.category}</span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-auto">
            <Clock className="w-3 h-3" /> {blog.read_time} min read
          </div>
        </div>

        {/* Title */}
        <Link to={`/blogs/${blog.slug}`}>
          <h3 className="font-bold theme-text text-base leading-snug mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="theme-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {blog.author_avatar && (
              <img src={blog.author_avatar} alt={blog.author_name} className="w-6 h-6 rounded-full" />
            )}
            <span className="text-xs text-slate-400">{blog.author_name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3 h-3" /> {formatDate(blog.created_at)}
          </div>
        </div>

        <Link to={`/blogs/${blog.slug}`} className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:gap-2.5 transition-all">
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
