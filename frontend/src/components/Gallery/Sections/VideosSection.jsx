import React from 'react';

function VideosSection({ videos, onVideoSelect }) {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#221F3B] mb-6">Videos</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Watch our projects in action
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-200 cursor-pointer group"
            onClick={() => onVideoSelect(video)}
          >
            <div className="relative aspect-video overflow-hidden bg-gray-200">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ccircle cx="200" cy="150" r="40" fill="%239ca3af"/%3E%3Cpath d="M190 140 L190 160 L210 150 Z" fill="white"/%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-orange-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideosSection;
