import React, { useContext, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { RoomContext } from '../Context';
import { Link, useParams } from 'react-router-dom';
import StyledHero from '../components/StyledHero';

const SingleRoom = () => {
  const [room, setRoom] = useState({});
  const { getRoom } = useContext(RoomContext);
  const { slug } = useParams();

  useEffect(() => {
    const rooms = getRoom(slug);
    setRoom(rooms);
  }, [room]);

  if (!room) {
    return (
      <div className='error'>
        <h3>Something went wrong</h3>
        <Link to='/' className='btn-primary'>
          Home
        </Link>
      </div>
    );
  }

  const {
    images,
    name,
    description,
    price,
    size,
    capacity,
    pets,
    breakfast,
    extras,
  } = room;
  const [mainImage, ...otherImages] = images ? images : [];

  return (
    <>
      <StyledHero bgImg={mainImage}>
        <Banner title={`${name} room`}>
          <Link to='/' className='btn-primary'>
            Back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {otherImages.map((image, index) => {
            return <img key={index} src={image} alt={name} />;
          })}
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h3>Info</h3>
            <h6>price : ${price}</h6>
            <h6>Size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity}`}
            </h6>
            <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
            <h6>{breakfast && 'Free breakfast included'}</h6>
          </article>
        </div>
      </section>
      <section className='room-extras'>
        <h6>Extras</h6>
        <ul className='extras'>
          {extras &&
            extras.map((extra, index) => {
              return <li key={index}>- {extra}</li>;
            })}
        </ul>
      </section>
    </>
  );
};

export default SingleRoom;
