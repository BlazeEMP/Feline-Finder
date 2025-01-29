// use this when parsing from JWT since type of id doesnt exist in JWTPayload but can be parsed out from it
export default interface DecodedToken {
    id: number;
    // add other properties if needed
}