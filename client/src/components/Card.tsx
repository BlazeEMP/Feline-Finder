import React from 'react';
import type Breed from '../interfaces/breedInterface';

const Card: React.FC<Breed> = ({ breeds, breedName, imgUrl, weight, origin, description, lifeSpan, indoorCat, childFriendly, dogFriendly, hairless }) => {
    return (
        <div className="card">
            <img src={imgUrl} alt={breedName} />
            <h2>{breedName}</h2>
            <p>{description}</p>
            <ul>
                <li>Weight: {weight}</li>
                <li>Origin: {origin}</li>
                <li>Life Span: {lifeSpan}</li>
                <li>Indoor Cat: {indoorCat ? 'Yes' : 'No'}</li>
                <li>Child Friendly: {childFriendly}</li>
                <li>Dog Friendly: {dogFriendly}</li>
                <li>Hairless: {hairless ? 'Yes' : 'No'}</li>
            </ul>
        </div>
    );
}

export default Card;