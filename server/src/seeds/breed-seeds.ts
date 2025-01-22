import { Breed } from '../models/index.js';

export const seedBreeds = async () => {
    await Breed.bulkCreate([
        {
            id: 'abys',
            name: 'Abyssinian',
            imgUrl: 'https://cdn2.thecatapi.com/images/xnzzM6MBI.jpg',
            weight: '7 - 10',
            origin: 'Egypt',
            description: 'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.',
            lifeSpan: '14 - 15',
            childFriendly: 3,
            dogFriendly: 4,
            hairless: 0, // 0 is false and 1 is true
        },
        {
            id: 'aege',
            name: 'Aegean',
            imgUrl: 'https://cdn2.thecatapi.com/images/h19-vtIeX.jpg',
            weight: '7 - 10',
            origin: 'Greece',
            description: 'Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.',
            lifeSpan: '9 - 12',
            childFriendly: 4,
            dogFriendly: 4,
            hairless: 0,
        },
        {
            id: 'bali',
            name: 'Balinese',
            imgUrl: 'https://cdn2.thecatapi.com/images/13MkvUreZ.jpg',
            weight: '4 - 10',
            origin: 'United States',
            description: 'Balinese are curious, outgoing, intelligent cats with excellent communication skills. They are known for their chatty personalities and are always eager to tell you their views on life, love, and what you’ve served them for dinner.',
            lifeSpan: '10 - 15',
            childFriendly: 4,
            dogFriendly: 5,
            hairless: 0,
        },
    ]);
};