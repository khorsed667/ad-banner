"use client";
import Image from 'next/image';
import { useState } from 'react';

interface EditBannerTemplateBsProps {
  banner: Banner;
  onClose: () => void;
  onUpdateBanner: (banner: Banner) => void;
}

interface Banner {
  name: string;
  details: string;
  cta: string;
  img: string;
  background: string;
  src: string;
}

const EditBannerTemplateBs = ({ banner, onClose, onUpdateBanner }: EditBannerTemplateBsProps) => {
  const [title, setTitle] = useState(banner.name);
  const [details, setDetails] = useState(banner.details);
  const [updatedImg, setUpdatedImg] = useState(banner.img);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDoneClick = () => {
    const updatedBanner = {
      ...banner,
      name: title,
      details: details,
      img: updatedImg,
    };
    onUpdateBanner(updatedBanner);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex transition duration-300 justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3 relative">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          &times;
        </button>
        <div className="mb-4 w-3/4 mx-auto">
          <Image src={updatedImg} alt={banner.name} width={300} height={300} className="object-cover rounded-lg" />
          <p className="text-xs text-gray-500 mt-1">
            Image Attribution: Photo by Xu Haiwei on Unsplash
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <input type="file" onChange={handlePhotoChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleDoneClick}>
          Done
        </button>
      </div>
    </div>
  );
};

export default EditBannerTemplateBs;
