import React, { useState, useEffect, useRef } from 'react'
import Rating from '@mui/material/Rating';
import DoneIcon from '@mui/icons-material/Done';

const PlaceDetails = ({place, isSelected}) => {
    const { name, photo, rating, price_level, num_reviews, address_obj, open_now_text, cuisine } = place
    const highLightMe = useRef();

    if (isSelected) {
        // console.log(isSelected)
        highLightMe?.current?.scrollIntoView()
    }
      
 

    return (
        <div className='card-box' ref={highLightMe}>
            <div className="card">
                <div className="details">
                    <h3>{name}</h3>
                    <div className="rating">
                        <span>{rating}</span>
                        <div className='stars'>
                            <Rating name="half-rating-read" value={rating ? parseFloat(rating) : 0} precision={0.5} readOnly style={{ fontSize: 'large'}} />
                        </div>
                        <span>
                            {num_reviews && `(${num_reviews})`}
                        </span>
                        <span>{price_level && `· ${price_level}`}</span>
                    </div>
                    <div className="address">{address_obj?.street1}</div>
                    <div className={open_now_text === 'Closed Now' ? 'text-red' : 'text-green'} >{open_now_text}</div>
                </div>
                <div className="place-img">
                    <img src={photo ? photo.images.large.url : process.env.PUBLIC_URL + '/images/noImageAvailable.png'} alt="Not Available" />
                </div>
            </div>
            <div className="delivery-details">
                {cuisine?.filter((item, idx) => idx < 3).map((item,i) => (
                    <div className="detail" key={i}>
                        <DoneIcon style={{ fontSize: 'large', color: 'rgb(29, 187, 29)' }} />
                        {item?.name}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PlaceDetails