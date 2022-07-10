import React, { createContext, useEffect, useState } from 'react';
import client from '../Contentful';

export const RoomContext = createContext();

const Context = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilter] = useState({
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  const getData = async () => {
    try {
      let response = await client.getEntries({
        content_type: 'hotelRooms',
      });

      const rooms = formatData(response.items);
      const featuredRooms = rooms.filter((item) => item.featured === true);
      const maxPrice = Math.max(...rooms.map((item) => item.price));
      const maxSize = Math.max(...rooms.map((item) => item.size));

      setRooms(rooms);
      setFeaturedRooms(featuredRooms);
      setSortedRooms(rooms);
      setLoading(false);
      setFilter({
        ...filters,
        maxPrice: maxPrice,
        maxSize: maxSize,
        price: maxPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formatData = (items) => {
    const tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, id, images };
      return room;
    });
    return tempItems;
  };

  const getRoom = (slug) => {
    const tempRooms = [...rooms];
    const room = tempRooms.find((item) => item.slug === slug);
    return room;
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = e.target.name;
    setFilter({ ...filters, [name]: value });
  };

  const filterRooms = () => {
    let tempRooms = [...rooms];
    let { type, capacity, price, minSize, maxSize, breakfast, pets } = filters;
    let capacityNo = parseInt(capacity);
    let roomPrice = parseInt(price);

    if (type !== 'all') {
      tempRooms = tempRooms.filter((item) => item.type === type);
    }

    if (capacityNo !== 1) {
      tempRooms = tempRooms.filter((item) => item.capacity === capacityNo);
    }

    tempRooms = tempRooms.filter((item) => item.price <= roomPrice);

    tempRooms = tempRooms.filter(
      (item) => item.size >= minSize && item.size <= maxSize
    );
    if (breakfast) {
      tempRooms = tempRooms.filter((item) => item.breakfast === true);
    }
    if (pets) {
      tempRooms = tempRooms.filter((item) => item.pets === true);
    }

    setSortedRooms(tempRooms);
  };

  useEffect(() => {
    filterRooms();
  }, [filters]);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        sortedRooms,
        featuredRooms,
        loading,
        getRoom,
        setLoading,
        filters,
        handleChange,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default Context;
