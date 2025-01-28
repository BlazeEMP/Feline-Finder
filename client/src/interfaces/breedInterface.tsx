export default interface Breed {
    readonly id: string;
    readonly name: string;
    readonly imgUrl: string;
    readonly weight: string;
    readonly lifeSpan: string;
    readonly origin: string;
    readonly hairless: boolean|number;
    readonly description: string;
    readonly childFriendly: number;
    readonly dogFriendly: number;
}