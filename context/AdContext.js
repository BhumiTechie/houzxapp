import React, { createContext, useContext, useState } from 'react';

const AdContext = createContext();

export const useAd = () => useContext(AdContext); // ✅ Named export

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'Apartment Name',
      bhk: '2BHK',
      furnishing: 'Part-Furnished',
      location: 'Gangapur Road, Nashik, Maharashtra.',
      rent: '₹1200',
      availability: '10th October',
    },
  ]);

  const updateAd = (id, updatedAd) => {
    setAds((prevAds) =>
      prevAds.map((ad) => (ad.id === id ? { ...ad, ...updatedAd } : ad))
    );
  };

  return (
    <AdContext.Provider value={{ ads, updateAd }}>
      {children}
    </AdContext.Provider>
  );
};
