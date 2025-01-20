// TODO build out seed data for 3 breeds
export interface Breed {
    readonly id: number;
    readonly name: string;
    readonly imgUrl: string;
    readonly weight: string;
    readonly origin: string;
    readonly description: string;
    readonly lifeSpan: string;
    readonly childFriendly: string;
    readonly dogFriendly: string;
    readonly hairless: boolean|number;
}

const seedData: Breed[] = [
    {
        id: 1,
        name: 'Bengal',
        imgUrl: 'https://cdn2.thecatapi.com/images/MTUwNjQwMw.jpg',
        weight: '8-15',
        origin: 'United States',
        description: 'Bengals are a relatively new breed of cat which was first bred in the U.S.A and came into existence in the early 1960s. They are known for their leopard-like spots, which are actually rosettes, and their sleek, muscular bodies.',
        lifeSpan: '12-16',
        childFriendly: '4',
        dogFriendly: '4',
        hairless: 0, // 0 is false and 1 is true
    },
    {
        id: 2,
        name: 'British Shorthair',
        imgUrl: 'https://cdn2.thecatapi.com/images/MTUwNjQwMw.jpg',
        weight: '7-17',
        origin: 'United Kingdom',
        description: 'The British Shorthair is a very popular breed of cat that originated in the United Kingdom. They are known for their round faces, stocky bodies, dense coats, and large, round eyes that are typically gold or copper in color.',
        lifeSpan: '12-20',
        childFriendly: '4',
        dogFriendly: '4',
        hairless: 0,
    },
    {
        id: 3,
        name: 'Siamese',
        imgUrl: 'https://cdn2.thecatapi.com/images/MTUwNjQwMw.jpg',
        weight: '6-14',
        origin: 'Thailand',
        description: 'The Siamese is one of the oldest and most recognizable breeds of domesticated cats. They are known for their striking blue almond-shaped eyes, large ears, short coat, and sleek, slender bodies.',
        lifeSpan: '8-15',
        childFriendly: '4',
        dogFriendly: '4',
        hairless: 0,
    },
];

export default seedData;