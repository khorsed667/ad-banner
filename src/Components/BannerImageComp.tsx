"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Banner } from '@/types/index';

const EditBannerTemplateBs = dynamic(() => import('./EditBannerTemplateBs'), { ssr: false });

const BannerImageComp = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number | null>(null);
  const [bannerData, setBannerData] = useState<Banner[]>([
    {
      name: "iPhone 15",
      details: "The latest iPhone 15 with A16 Bionic chip, 6.1-inch display, and improved camera system.",
      cta: "Learn More",
      img: "/iphone_15.png",
      background: "/product_bg.jpg",
      src: "https://www.apple.com/iphone-15/"
    },
    {
      name: "iPhone 15 Pro",
      details: "Experience the iPhone 15 Pro with advanced ProMotion display, A16 Bionic chip, and triple-camera system.",
      cta: "Learn More",
      img: "/iPhone-15-Plus.png",
      background: "/product_bg.jpg",
      src: "https://www.apple.com/iphone-15-pro/"
    },
    {
      name: "iPhone 15 Pro Max",
      details: "The ultimate iPhone 15 Pro Max with a 6.7-inch display, ProMotion, and the best camera system.",
      cta: "Learn More",
      img: "/iPhone-15-Pro-Max.png",
      background: "/product_bg.jpg",
      src: "https://www.apple.com/iphone-15-pro/"
    },
    {
      name: "Samsung Galaxy S24",
      details: "Discover the new Samsung Galaxy S24 with a 6.1-inch display, Snapdragon 898, and improved camera.",
      cta: "Learn More",
      img: "/Galaxy-S24.png",
      background: "/product_bg.jpg",
      src: "https://www.samsung.com/us/smartphones/galaxy-s24/"
    },
    {
      name: "Samsung Galaxy S24+",
      details: "Upgrade to the Samsung Galaxy S24+ with a larger display, advanced camera features, and Snapdragon 898.",
      cta: "Learn More",
      img: "/Galaxy-S24.png",
      background: "/product_bg.jpg",
      src: "https://www.samsung.com/us/smartphones/galaxy-s24/"
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      details: "The most powerful Samsung Galaxy S24 Ultra with a 6.8-inch display, advanced S Pen features, and best-in-class camera.",
      cta: "Learn More",
      img: "/samsung-galaxy-s24-ultra.png",
      background: "/product_bg.jpg",
      src: "https://www.samsung.com/bd/smartphones/galaxy-s24-ultra/"
    },
  ]);

  const handleEditClick = (index: number) => {
    setCurrentBannerIndex(index);
    setIsEditOpen(true);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setCurrentBannerIndex(null);
  };

  const handleUpdateBanner = (updatedBanner: Banner) => {
    if (currentBannerIndex !== null) {
      const updatedBannerData = [...bannerData];
      updatedBannerData[currentBannerIndex] = updatedBanner;
      setBannerData(updatedBannerData);
      handleClose();
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 p-4 ">
        {bannerData.map((banner, index) => (
          <div
            key={index}
            className="flex items-center relative overflow-hidden rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${banner.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px',
            }}
          >
            <div className="w-1/2 h-full relative">
              <Image
                src={banner.img}
                alt={banner.name}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
            </div>
            <div className="w-1/2 p-4 relative z-10 text-black">
              <h3 className="text-2xl mb-5 font-bold">{banner.name}</h3>
              <p className="text-sm">{banner.details}</p>
              <Link href={banner.src}>
                <button className="mt-5 px-4 py-2 bg-black text-white rounded">
                  {banner.cta}
                </button>
              </Link>
            </div>
            <FaEdit
              className="absolute text-xl top-5 right-5 cursor-pointer"
              onClick={() => handleEditClick(index)}
            />
          </div>
        ))}
      </div>
      {isEditOpen && currentBannerIndex !== null && (
        <EditBannerTemplateBs
          banner={bannerData[currentBannerIndex]}
          onClose={handleClose}
          onUpdateBanner={handleUpdateBanner}
        />
      )}
    </div>
  );
};

export default BannerImageComp;
