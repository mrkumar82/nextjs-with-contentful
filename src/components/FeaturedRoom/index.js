import React, { useContext } from 'react';
import { RoomContext } from '../../Context/';
import Loading from '../Loading';
import Title from '../Title';
import Room from '../Room';

const FeaturedRooms = () => {
  const { rooms, featuredRooms, loading } = useContext(RoomContext);

  const froom = featuredRooms.map((item) => {
    return <Room room={item} key={item.id} />;
  });

  return (
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {loading ? <Loading /> : froom}
      </div>
    </section>
  );
};

export default FeaturedRooms;
