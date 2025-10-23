'use client';

import { useState } from 'react';

export default function ProfileForm() {
  // State untuk setiap field
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  // Mengambil placeholder dari gambar
  const [description, setDescription] = useState('saya suka makan mie ayam');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [tiktok, setTikTok] = useState('');
  const [x, setX] = useState('');

  // Handler untuk submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan data (misalnya, kirim ke API)
    console.log({
      username,
      displayName,
      description,
      instagram,
      facebook,
      tiktok,
      x,
    });
    alert('Profile Saved!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h1 className="text-3xl font-bold">Complete Your Profile</h1>

      {/* --- Bagian Profile Image --- */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          {/* Placeholder Avatar */}
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-3xl font-bold">
            CN
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="bg-gray-200 text-black py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300"
            >
              Change Image
            </button>
            <button
              type="button"
              className="bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-600"
            >
              Remove Image
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Supported formats: JPG, or PNG. Max size 2MB.
        </p>
      </div>

      {/* --- Bagian User Info --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
      </div>

      {/* --- Bagian Description --- */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      {/* --- Bagian Social Media --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Social Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Instagram */}
          <div>
            <label
              htmlFor="instagram"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Instagram <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-md bg-gray-900 border border-gray-700 focus-within:ring-1 focus-within:ring-yellow-500 focus-within:border-yellow-500">
              <span className="pl-3 pr-2 text-gray-500">instagram.com/</span>
              <input
                type="text"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="yourusername"
                className="flex-1 bg-transparent p-3 border-0 text-white placeholder-gray-500 focus:ring-0"
                required
              />
            </div>
          </div>
          {/* Input Facebook */}
          <div>
            <label
              htmlFor="facebook"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Facebook <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-md bg-gray-900 border border-gray-700 focus-within:ring-1 focus-within:ring-yellow-500 focus-within:border-yellow-500">
              <span className="pl-3 pr-2 text-gray-500">facebook.com/</span>
              <input
                type="text"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="yourusername"
                className="flex-1 bg-transparent p-3 border-0 text-white placeholder-gray-500 focus:ring-0"
                required
              />
            </div>
          </div>
          {/* Input TikTok */}
          <div>
            <label
              htmlFor="tiktok"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              TikTok <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-md bg-gray-900 border border-gray-700 focus-within:ring-1 focus-within:ring-yellow-500 focus-within:border-yellow-500">
              <span className="pl-3 pr-2 text-gray-500">tiktok.com/@</span>
              <input
                type="text"
                id="tiktok"
                value={tiktok}
                onChange={(e) => setTikTok(e.target.value)}
                placeholder="yourusername"
                className="flex-1 bg-transparent p-3 border-0 text-white placeholder-gray-500 focus:ring-0"
                required
              />
            </div>
          </div>
          {/* Input X */}
          <div>
            <label
              htmlFor="x"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              X <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-md bg-gray-900 border border-gray-700 focus-within:ring-1 focus-within:ring-yellow-500 focus-within:border-yellow-500">
              <span className="pl-3 pr-2 text-gray-500">x.com/</span>
              <input
                type="text"
                id="x"
                value={x}
                onChange={(e) => setX(e.target.value)}
                placeholder="yourusername"
                className="flex-1 bg-transparent p-3 border-0 text-white placeholder-gray-500 focus:ring-0"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Tombol Save --- */}
      <div>
        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}