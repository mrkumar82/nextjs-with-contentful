import React from 'react';
import Room from '../Room';

const RoomsList = ({ rooms }) => {
  if (rooms.length === 0) {
    return (
      <div className='empty-search'>
        <h3>No result found</h3>
      </div>
    );
  }

  return (
    <section className='roomslist'>
      <div className='roomslist-center'>
        {rooms.map((room, index) => {
          return <Room room={room} key={index} />;
        })}
      </div>
    </section>
  );
};

export default RoomsList;
