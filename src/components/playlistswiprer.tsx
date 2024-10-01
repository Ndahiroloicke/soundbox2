import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module

interface PlaylistCarouselProps {
  tracks: { 
    added_at: string; 
    added_by: { 
      href: string; 
      id: string; 
      type: string; 
    }; 
    track: { 
      album: { 
        images: Array<{ url: string }>; 
      }; 
      artists: Array<{ name: string }>; 
      name: string; 
      id: string; 
      external_urls: { 
        spotify: string; 
      }; 
    }; 
  }[];
}

const PlaylistCarousel: React.FC<PlaylistCarouselProps> = ({ tracks }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]} // Add Autoplay module
      spaceBetween={20}
      slidesPerView={1} // Show one slide at a time
      navigation
      autoplay={{
        delay: 3000, // Time between transitions (in ms)
        disableOnInteraction: false, // Allow interaction after autoplay starts
      }}
      className="my-5"
    >
      {tracks.map(({ track }) => (
        <SwiperSlide key={track.id} className="relative flex justify-center">
          <div className="w-full h-[350px] overflow-hidden rounded-lg"> {/* Increased height for landscape */}
            <img
              src={track.album.images[0]?.url || "default-image-url"} // Use a default image URL if not available
              alt={track.name}
              className="w-full h-full object-cover" // Fill the div while maintaining aspect ratio
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-semibold text-4xl text-white">{track.name}</p>
            <p className="text-white text-xl ml-1 font-bold">By <span className="text-green-400">{track.artists[0]?.name}</span></p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlaylistCarousel;
