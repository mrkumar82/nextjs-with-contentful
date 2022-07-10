import React, { useState } from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import Title from '../Title';

const Services = () => {
  const [services, setServices] = useState([
    {
      icon: <FaCocktail />,
      title: 'Free Cocktails',
      info: 'Sit commodo nulla consectetur magna magna occaecat et dolor occaecat minim duis id',
    },
    {
      icon: <FaHiking />,
      title: 'Free Hiking',
      info: 'Ullamco commodo irure duis sunt ut. Aliqua adipisicing labore',
    },
    {
      icon: <FaShuttleVan />,
      title: 'Free Shuttle Van',
      info: 'Occaecat qui tempor ex culpa laboris eu elit velit ea eiusmod. Esse aliqua',
    },
    {
      icon: <FaBeer />,
      title: 'Free Beer',
      info: 'Mollit ad reprehenderit consequat laboris incididunt tempor. Labore qui',
    },
  ]);
  return (
    <section className='services'>
      <Title title='Services' />
      <div className='services-center'>
        {services.map((service, index) => {
          return (
            <article key={index} className='service'>
              <span>{service.icon}</span>
              <h6>{service.title}</h6>
              <p>{service.info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
