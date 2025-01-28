import React from 'react';
import type Breed from '../interfaces/breedInterface';

const CardTwo: React.FC<Breed> = ({ name, imgUrl, weight, origin, description, lifeSpan, childFriendly, dogFriendly, hairless }) => {
    return (
        <div className="card">
            <img src={imgUrl} alt={name} className="card-image"/>
            <div className="card-content">
            <h2 className="card-title">{name}</h2>
            <p className="card-description">{description}</p>
            <ul className="card-details">
                <li>Weight: {weight}</li>
                <li>Origin: {origin}</li>
                <li>Life Span: {lifeSpan}</li>
                <li>Child Friendly: {childFriendly}</li>
                <li>Dog Friendly: {dogFriendly}</li>
                <li>Hairless: {hairless ? 'Yes' : 'No'}</li>
            </ul>
            </div>
        </div>
    );
}

export default CardTwo;