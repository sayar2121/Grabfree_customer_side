import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react';
import { useBlogBySlug, useLatestBlogs } from '@/hooks/useBlogs';
import { formatDate } from '@/lib/utils';
import BlogCard from '@/components/blogs/BlogCard';

export default function BlogDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading } = useBlogBySlug(slug!);
  const { data: related } = useLatestBlogs(3);

  if (isLoading) return (
    <div className="section-container py-12 max-w-4xl mx-auto animate-pulse space-y-6">
      <div className="skeleton h-10 w-3/4" />
      <div className="skeleton h-80 w-full rounded-2xl" />
      <div className="space-y-3">{Array(8).fill(0).map((_, i) => <div key={i} className="skeleton h-4 w-full" />)}</div>
    </div>
  );

  if (!blog) return (
    <div className="section-container py-20 text-center">
      <p className="text-5xl mb-4">📄</p>
      <h2 className="text-xl font-bold text-white mb-2">Blog Post Not Found</h2>
      <Link to="/blogs" className="text-brand-orange text-sm hover:underline">Back to Blog</Link>
    </div>
  );

  return (
    <div className="section-container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-orange text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-6">
          {blog.category && <span className="badge badge-brand mb-3 inline-block">{blog.category}</span>}
          <h1 className="text-2xl md:text-4xl font-black text-white leading-snug mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{blog.author_name}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(blog.created_at)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blog.read_time} min read</span>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 md:h-96 object-cover" />
        </div>

        {/* Excerpt */}
        <div className="glass-card p-6 border-l-4 border-brand-orange mb-8">
          <p className="theme-text-secondary text-base italic leading-relaxed">{blog.excerpt}</p>
        </div>

        {/* Tags */}
        {blog.tags && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag className="w-4 h-4 text-slate-400" />
            {blog.tags.map((tag) => (
              <span key={tag} className="badge badge-violet text-xs">{tag}</span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="glass-card p-8 mb-16 prose-like">
          <p className="theme-text-secondary leading-relaxed">
            This is a detailed article about <strong className="theme-text">{blog.title}</strong>. Our team of shopping experts have curated the best advice and tips to help you maximize your savings. Stay tuned as we keep updating this guide with the latest information.
          </p>
          <br />
          <p className="theme-text-secondary leading-relaxed">
            Whether you are a first-time shopper or a seasoned deal hunter, this guide covers everything you need to know to get the most out of every purchase. From stacking coupons to using bank offers, we've got you covered.
          </p>
        </div>
      </div>

      {/* Related Blogs */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-black text-white mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related?.filter((b) => b.id !== blog.id).slice(0, 3).map((b, i) => <BlogCard key={b.id} blog={b} index={i} />)}
        </div>
      </div>
    </div>
  );
}
