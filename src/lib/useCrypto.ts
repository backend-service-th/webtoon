import { createHmac } from "crypto";

export function hash( context:string ) {
    const hmac = createHmac('sha256','webtoon.service.encrypt --digest-algorithms sha3-256');
    hmac.update( Buffer.from( context, "utf8" ) );
    return hmac.digest("hex")
}

export function compare( context:string, encoded:string ) {
    return hash( context ) == encoded;
}
