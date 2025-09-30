import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  MessageCircle,
  Phone,
} from "lucide-react";
import { getAllPosts } from "../../content/posts";
import {
  trackBlogIndexView,
  trackBlogNavigation,
  trackBlogTagClick,
  trackWhatsAppClick,
  trackPhoneClick,
} from "../../utils/analytics";
import { useEffect } from "react";

export default function BlogIndex() {
  const posts = getAllPosts();

  // Track blog index page view
  useEffect(() => {
    trackBlogIndexView();
  }, []);

  return (
    <>
      <Head>
        <title>בלוג - Amit Solutions</title>
        <meta
          name="description"
          content="טיפים ומידע על בניית אתרים, SEO, ושיווק דיגיטלי לעסקים קטנים"
        />
        <meta
          name="keywords"
          content="בלוג, אתרים, SEO, שיווק דיגיטלי, טיפים"
        />
      </Head>

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
                onClick={() =>
                  trackBlogNavigation("back_to_home", "blog_index")
                }
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                חזרה לעמוד הבית
              </Link>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                הבלוג שלנו
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                טיפים, מדריכים ומידע שימושי על בניית אתרים, SEO ושיווק דיגיטלי
                לעסקים קטנים
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={`${post.slug}-${tag}`}
                            className="px-3 py-1 bg-yellow-400 text-black text-base font-medium rounded-full cursor-pointer hover:bg-yellow-300 transition-colors"
                            onClick={() => trackBlogTagClick(tag, post.slug)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-gray-300 mb-4 line-clamp-3 text-lg">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-base text-gray-400">
                        <div className="flex items-center">
                          <User className="w-4 h-4 ml-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 ml-1" />
                          {new Date(post.publishedAt).toLocaleDateString(
                            "he-IL"
                          )}
                        </div>
                      </div>

                      <div className="flex items-center mt-3 text-yellow-400 text-base">
                        <Clock className="w-4 h-4 ml-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
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
                  מוכנים ליצור אתר לעסק שלכם?
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  אם המאמרים שלנו עזרו לכם להבין את החשיבות של אתר מהיר ומותאם
                  למובייל, בואו נדבר על הפרויקט שלכם
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="https://wa.me/+972547926661?text=שלום! קראתי את הבלוג שלכם ואני מעוניין באתר לעסק שלי"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 rtl:space-x-reverse transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackWhatsAppClick("blog_index_cta")}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>בואו נתחיל בוואטסאפ</span>
                  </motion.a>

                  <motion.a
                    href="tel:+972547926661"
                    className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 rtl:space-x-reverse border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackPhoneClick("blog_index_cta")}
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
      </main>
    </>
  );
}
