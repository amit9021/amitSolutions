import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Home,
  MessageCircle,
  Phone,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../content/posts";
import {
  trackBlogPostView,
  trackBlogNavigation,
  trackBlogReadingTime,
  trackBlogScrollDepth,
  trackBlogPostCompletion,
  trackBlogTagClick,
  trackWhatsAppClick,
  trackPhoneClick,
} from "../utils/analytics";
import { useEffect, useState } from "react";

export const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [startTime] = useState(Date.now());
  const [scrollDepth, setScrollDepth] = useState(0);

  // Scroll to top when component mounts (mobile-friendly)
  useEffect(() => {
    // Multiple methods to ensure scroll to top works on all devices
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // For mobile Safari and other browsers
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  // Track blog post view
  useEffect(() => {
    if (post) {
      trackBlogPostView(post.title, post.slug);
    }
  }, [post]);

  // Track reading time
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (post) {
        trackBlogReadingTime(post.slug, timeSpent);

        // Track completion if user spent significant time (more than 30 seconds)
        if (timeSpent > 30) {
          trackBlogPostCompletion(post.slug, timeSpent);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [post, startTime]);

  // Track scroll depth with throttling to prevent forced reflows
  useEffect(() => {
    let ticking = false;
    let lastScrollTop = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Only calculate if scroll position changed significantly
          if (Math.abs(scrollTop - lastScrollTop) > 10) {
            const scrollHeight =
              document.documentElement.scrollHeight - window.innerHeight;
            const currentDepth = Math.round((scrollTop / scrollHeight) * 100);

            if (currentDepth > scrollDepth) {
              setScrollDepth(currentDepth);

              // Track milestone scroll depths
              if (currentDepth >= 25 && scrollDepth < 25) {
                trackBlogScrollDepth(post?.slug, 25);
              } else if (currentDepth >= 50 && scrollDepth < 50) {
                trackBlogScrollDepth(post?.slug, 50);
              } else if (currentDepth >= 75 && scrollDepth < 75) {
                trackBlogScrollDepth(post?.slug, 75);
              } else if (currentDepth >= 90 && scrollDepth < 90) {
                trackBlogScrollDepth(post?.slug, 90);
              }
            }

            lastScrollTop = scrollTop;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post?.slug, scrollDepth]);

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">המאמר לא נמצא</h1>
          <a
            href="/blog/index.html"
            className="text-yellow-400 hover:text-yellow-300"
          >
            חזרה לבלוג
          </a>
        </div>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Amit Solutions</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="py-6 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <a
                href="/blog/"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                onClick={() => trackBlogNavigation("back_to_blog", "blog_post")}
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                חזרה לבלוג
              </a>
              <Link
                to="/"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                onClick={() => trackBlogNavigation("back_to_home", "blog_post")}
              >
                <Home className="w-5 h-5 ml-2" />
                עמוד הבית
              </Link>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <header className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-400 text-black text-sm font-medium rounded-full cursor-pointer hover:bg-yellow-300 transition-colors"
                    onClick={() => trackBlogTagClick(tag, post.slug)}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-gray-300 mb-8">{post.excerpt}</p>

              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center">
                  <User className="w-5 h-5 ml-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 ml-2" />
                  {new Date(post.publishedAt).toLocaleDateString("he-IL")}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 ml-2" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {post.coverImage && (
                <div className="mb-12">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </article>

        {/* CTA Section */}
        <section
          id="ctablog"
          className="py-16 bg-gradient-to-br from-gray-900 to-black"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/20 rounded-2xl p-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  מוכנים להתחיל את הפרויקט שלכם?
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  אם המאמר הזה עזר לכם, בואו נדבר על איך נוכל לעזור לעסק שלכם עם
                  אתר מהיר ומותאם למובייל
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="https://wa.me/+972547926661?text=שלום! קראתי את המאמר שלכם ואני מעוניין באתר לעסק שלי"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 rtl:space-x-reverse transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackWhatsAppClick("blog_post_cta")}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>בואו נתחיל בוואטסאפ</span>
                  </motion.a>

                  <motion.a
                    href="tel:+972547926661"
                    className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 rtl:space-x-reverse border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackPhoneClick("blog_post_cta")}
                  >
                    <Phone className="w-5 h-5" />
                    <span>התקשרו אלינו</span>
                  </motion.a>
                </div>

                <div className="mt-6 text-sm text-gray-400">
                  <p>
                    💡 <strong>טיפ:</strong> צרו קשר עכשיו וקבלו ייעוץ חינמי על
                    האתר שלכם
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation Footer */}
        <footer className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <a
                href="/blog/"
                className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-colors"
                onClick={() =>
                  trackBlogNavigation("back_to_blog", "blog_post_footer")
                }
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                חזרה לבלוג
              </a>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400 hover:text-black transition-colors"
                onClick={() =>
                  trackBlogNavigation("back_to_home", "blog_post_footer")
                }
              >
                <Home className="w-5 h-5 ml-2" />
                עמוד הבית
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};
