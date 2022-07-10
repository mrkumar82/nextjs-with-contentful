import React, { useContext } from 'react';
import { RoomContext } from '../../Context';
import Title from '../Title';

const getUniquValue = (items, value) => {
  var filterItem = [...new Set(items.map((item) => item[value]))];
  return filterItem;
};

const RoomsFilter = ({ rooms }) => {
  const { filters, handleChange } = useContext(RoomContext);
  const {
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = filters;

  let typesOption = getUniquValue(rooms, 'type');
  typesOption = ['all', ...typesOption];
  typesOption = typesOption.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  let people = getUniquValue(rooms, 'capacity');
  people = people.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <section className='filter-container'>
      <Title title='Search rooms'></Title>
      <form className='filter-form'>
        {/* {select type} */}
        <div className='form-group'>
          <label htmlFor='type'>room type</label>
          <select
            name='type'
            id='type'
            value={type}
            className='form-control'
            onChange={handleChange}
          >
            {typesOption}
          </select>
        </div>
        {/* {end select type} */}

        {/* {select type} */}
        <div className='form-group'>
          <label htmlFor='capacity'>Guest</label>
          <select
            name='capacity'
            id='capacity'
            value={capacity}
            className='form-control'
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/* {end select type} */}

        {/* {select price} */}
        <div className='form-group'>
          <label htmlFor='price'>room price {price}</label>
          <input
            type='range'
            name='price'
            id='price'
            min={minPrice}
            max={maxPrice}
            step={10}
            value={price}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        {/* {end select price} */}
        {/* {select price} */}
        <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs'>
            <input
              type='number'
              name='minSize'
              id='size'
              value={minSize}
              onChange={handleChange}
              className='size-input'
            />
            <input
              type='number'
              name='maxSize'
              value={maxSize}
              onChange={handleChange}
              className='size-input'
            />
          </div>
        </div>
        {/* {end select price} */}

        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RoomsFilter;
