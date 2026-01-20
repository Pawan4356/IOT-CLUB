import React, { useState } from 'react';
import { galleryData, videosData, reportsData } from './Assets-json';
import { ImageGallerySection, VideosSection, ReportsSection} from '../../components'

const GALLERY_IMAGES = galleryData.images;
const VIDEOS = videosData.videos;
const REPORTS = reportsData.reports;

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f7f7fb] to-white text-gray-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ImageGallerySection images={GALLERY_IMAGES} onImageSelect={setSelectedImage} />
        <VideosSection videos={VIDEOS} onVideoSelect={setSelectedVideo} />
        <ReportsSection reports={REPORTS} />
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl transition"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Video Modal - Popup Style */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 text-xl font-semibold transition-all shadow-lg"
            >
              ✕
            </button>

            {/* Video Container - Handles both horizontal and vertical videos */}
            <div className="relative bg-black">
              <video
                controls
                autoPlay
                className="w-full max-h-[70vh] object-contain rounded-t-2xl"
                src={selectedVideo.video}
                style={{ aspectRatio: 'auto' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Title */}
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
