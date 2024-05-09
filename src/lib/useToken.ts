
import jwt from "jsonwebtoken";

const PrivateKeyJWT = "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAoMhf56uA45jaj1Zt1Cx9gygxFJ5VVTY+dl8IJjCAx4NYbMRR\ng3+OrJ3SaI6aQ9e1WNOPVALTd6+MApJ6uaaWo8DfL8Givep8fwRngBipXcqqtOZ5\n1/QfZ4VrHUejZdny0dSFaTx6NywnsMG/7/OdYf9NRJpfz5TItsCG/Wmlf0Lj5YDX\nBvpzkN57JOtSlWmG+ny65Iu8gpgfkTiN2/m1yk36+XMy23n07fkOSJ1GdwJL1bWV\n9cwhJFt5SOQnxlr05ZjiIPKL7r9e0STPIou+B+KzHGPZOvidKHWyW8/I5y5KMD35\nxi+Tt514s9lZVEOjW/78j3fQyP8pBfD/rDQLaQIDAQABAoIBAATM2q0nXgidgYf2\nQf7ryZ8C8g0uKXjK7uw4i90dBVk/iwIrTc413pf5ecTQnhswq1vArDarQ24/NdhF\nUIfuqPBwY5Fwz+eo4qjlpCPrSJIx6O0P9PsNMStVbMRh5UdXDZR1anrA+Rqg1ToG\nHNGAhdY9Saymyb3AMMpg/t69utjM5bTn37yVrvJpFkTb+/+mfWGIo9JIyMuwbieZ\n2eibrnKwPwF3C29C/YI2pAM2PRHNqoGf98LP8eTDSnTZpy68RYk4aleYSKfen/dM\nuqVOKDGb7mJ/NjYtzUVpPbNtAmPMP5r3NeJ7Mm+onYAGwnV1G2b8hOZ2dz6y+J3/\n328k51ECgYEAy6J5vtwF5SvScx+r9pSKonnN1daLLksSPSKi7nRxFlZFIZn25aaF\nye2TzyF6d+38IMznMc7l+9UmVbxO+2LwDePo5OZA0Pfug3vXfETSfwbYPDrNEMCY\nGlDkw6ccVxyjlkbSGj5DzQn8SnAT3B5I3eiURZiI7hTmX/2iICuxy/kCgYEAyiDm\nueed/JjBj7CP/YE1HETjP6trKUuopG1fmhP/nL0ySGj7JTZWYA/t5K6A7IY2hWez\nE9SChMsrGeGlPuqciTrWTM9TWOn9YR/csjFvty0d5QG6zTPWYsqtU23O/lou7tN7\nKwP17ULw9FnAOY5JSst25b3KgH0ExlqnwM1QtvECgYAAsJY0/U3Pzuwxk6Pje/FU\nR5FY7hcemwZ+yoU+xYo0hypIyNq7QGsnmfRsOTLPATFfcxI9avQAfGJa2/5wf49M\nnL8HN3h0vMJEE8FRHHKSF5XX7mMPcXeSbz+3IfPIn8I2GhtQF3HnWedO4T5P+pJI\nnicSbUfZdpypKpTIAx3hEQKBgQDDYvCFrl5qyWL6OivGWrrzO6gMaPCqt4cqgsuS\nTlids8nCczCqdQ8jxuIoV4MqoEZdyLMzrQ4JvbdJSnUJD5MHmIeFMjiYT3/t/fXB\njsY15HfsYjKnn79SOic36YLZHmYV2PpLx4VXt4jiO0v0lxVEJtAlHsR8Vd1ivElC\nt3WZkQKBgFIr44flkNuomDJmhkoYd6zAwZ1IJnBMqUbIwVNQKKeUqMGBYqqQEnNk\nDNHKj5VLXJMREJkV+IgcrleVbzOZDIrtM7Cudcoutf8Jg/MyqeT21Rm57KKAoTHI\nGlZiqBY61eajwDRBsUfLA62CheitP+5iCks92/o6yQIEWIpJ06fM\n-----END RSA PRIVATE KEY-----"

export interface Payload { id:string, username:string, iat:number, exp:number };

export function encodeToken( payload:{ id:string, username:string }) {
    return jwt.sign( payload, PrivateKeyJWT, { algorithm:"RS256", expiresIn:"30d" } );
}

export function decodeToken( token:string ) : Payload | undefined {
    try {
        return jwt.verify( token, PrivateKeyJWT, { complete:true, algorithms:['RS256'] } ).payload as Payload;
    } catch {
        return undefined;
    }
}

export default { encodeToken, decodeToken };
