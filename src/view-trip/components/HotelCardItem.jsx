import React from 'react';
import { Link } from 'react-router-dom';

const fallbackImages = [
  '/public/Hotel-1.jpg',
  '/public/Hotel-2.jpg',
  '/public/Hotel-3.jpg',
  '/public/Hotel-4.jpg',
  '/public/Hotel-5.jpg'
];

function HotelCardItem({ item }) {
  const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          item?.hotelName + ', ' + item?.hotelAddress
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img
            src={randomImage}
            className="rounded-xl h-[180px] w-full object-cover"
            alt={item?.hotelName}
          />
          <div className="my-3 py-2">
            <h2 className="font-medium">{item?.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍 {item?.hotelAddress}</h2>
            <h2 className="text-sm">💰 {item?.price}</h2>
            <h2 className="text-sm">⭐ {item?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
