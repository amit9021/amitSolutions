import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ImageViewer from "react-simple-image-viewer";
import { ExternalLink, Clock } from "lucide-react";
import data from "../data/data.json";

export const Gallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const galleryData = data.Portfolio || [];
  const images = galleryData.map((item) => item.image || item.large);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            פורטפוליו
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            דוגמאות מהעבודה שלי - אתרים מהירים שמביאים תוצאות
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
                {project.status === "coming-soon" ? (
                  <div className="text-center z-10">
                    <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <p className="text-yellow-400">בקרוב</p>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                {project.status === "completed" && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-yellow-400 hover:text-yellow-500 font-semibold"
                  >
                    צפייה באתר
                    <ExternalLink className="w-4 h-4 mr-2" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {isViewerOpen && (
          <ImageViewer
            src={images}
            backgroundStyle={{ zIndex: 99999 }}
            currentIndex={currentImage}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </section>
  );
};
