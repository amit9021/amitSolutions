import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { getAllPosts } from "../content/posts";
import { trackBlogNavigation, trackBlogTagClick } from "../utils/analytics";

export const BlogPreview = () => {
  const posts = getAllPosts().slice(0, 3); // Show only the latest 3 posts

  return (
    <section id="blog-preview" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            הבלוג שלנו
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            טיפים, מדריכים ומידע שימושי על בניית אתרים, SEO ושיווק דיגיטלי
            לעסקים קטנים
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <a href={`/blog/${post.slug}/`} className="block">
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
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-yellow-400 text-black text-base font-medium rounded-full cursor-pointer hover:bg-yellow-300 transition-colors"
                        onClick={() => trackBlogTagClick(tag, post.slug)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h3>

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
                      {new Date(post.publishedAt).toLocaleDateString("he-IL")}
                    </div>
                  </div>

                  <div className="flex items-center mt-3 text-yellow-400 text-base">
                    <Clock className="w-4 h-4 ml-1" />
                    {post.readTime}
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/blog/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() =>
              trackBlogNavigation("view_all_posts", "homepage_blog_preview")
            }
          >
            <BookOpen className="w-5 h-5 ml-2" />
            <span>קרא עוד בבלוג</span>
            <ArrowLeft className="w-5 h-5 mr-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
