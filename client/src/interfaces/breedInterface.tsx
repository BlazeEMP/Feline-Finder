export default interface Breed {
    readonly id: string;
    readonly name: string;
    readonly imgUrl: string;
    readonly weight: string;
    readonly origin: string;
    readonly description: string;
    readonly lifeSpan: string;
    readonly childFriendly: number;
    readonly dogFriendly: number;
    readonly hairless: boolean|number;
}