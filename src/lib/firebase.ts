import firebase from "firebase-admin";
import { uuidv7 } from "uuidv7";

type FirebaseResponse = Record<string, any>;
type FirebaseArgument = Record<string, any>;

const app = firebase.apps.length === 0 ? firebase.initializeApp({
    databaseURL: "https://web-application-5963b-default-rtdb.asia-southeast1.firebasedatabase.app/",
    credential: firebase.credential.cert({
        projectId: "web-application-5963b",
        clientEmail: "firebase-adminsdk-jas7p@web-application-5963b.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDimVQfjdlqew+i\ngkvQhpW6JdbCckedK8c40eSRcXJQNLI9QF77SS0UqAZy2Ab1Nr0C8GroTpVrWEX7\nCfH2dwpYWMtEKedPcLjSe8glumiWB/y8qMfL9nWN3J2E+0F23stfi4EGks7IID7Z\nM5HZcZDIqsq8/nCk7Y/uhN0Fh0nAV4e8sC9Qw1L3N0jwBaeEOSZ6HKFqwIndAmFW\nXzhXw3wibLsx4cFW2cPJsN/kczhI12dk0MZjMy+Iaqie7J/sIEbqaTy3wFTsc9zp\n8SNQ1nQOmBLSxRW5vJitIA8RDVsBmn6GpIK1upgTnO0uwmnhZEQcWQkUXByNOP4f\nzeJQ3yoxAgMBAAECggEALEbdGPBQ9h03NCAlG8kcexvXL7YAV8381tWuhZvnBBST\n6mOIW64UBLgDUI/1JheMzcT4As4OJMRCIlgyYyAmEZbCGx7b/5oNRzWgKX0X4A8N\n+7g4GBrfo/lifyBQTZ+hmhkKfGQVyyV/2lWZD2XBLnCu/khybsurpuXnwSOLDe2+\nSdtP9Y8Y8tmRbi0pqo6YfdlxRYMwI23E7OQlw4iBsJyTs+N3jDzQR2ueCOfh82vR\nPa6jeQ+ae3oq8P/+/OCU+ZiQwFm5zLIpGBgyQH3xQBV49DJHSk1AVFJ664cWMQEF\nwaedRC7AqkDBkxCoHYH4FNnPckLGWPxM8DvTtjmHBQKBgQD+HDSqL/mKq3td5MBS\nPta0TEVVg8bHBkSaM/oalTe4GCEmx8kI+a/zQwPirTD33R9N3ZgpNfm2f3b+jKvw\nx2/1+EzQJPXPS03u924+pn1pKydYkgRiVwMYYM2Q1XdM2ikgMWtsPlNoz2s4aJSh\nRSH6paNzN41P9PiQSIkROj38dQKBgQDkSL6xi7L1Hysykm7pnXCUJRijxMgj7tE9\n9nff7dnhmDYNmcbZJSVyOUhXGZqQmUNorXs7HyjHiHi2EUtax1v4133/kvTcJvV3\nJ9OYVLjvQqSjcyaD58Yl2i/0KiTTp05edtxH8XkMtjgyWe7O7eP8z850CpKk4Jsw\nl7yvGkXvTQKBgQCfuUb5OpKWMVeoGyMwD0ORrOdf6ybE7xGsA8PPdb/CPZiI8cdR\nlvCb7aHBl69R/XGx1fnQ3ZaKufAn7HAfNp0PdPWDV9gSZnkkHe7z/l6R/ogKyi1r\nStotNpu/0A3fBroW/DlTnpF7LfVtTX8vJ29GR1tIDsEKYybiOlW9uGhCCQKBgQDN\nWaa4PWtg1oXcOx8sZOSlTu1oPBaxRB3TOEfDFsl9BpfxChh2stSJeH/bYfvJASVD\nH3MPzsq3GstDNDFt2pGgOfBsm3xKIX2Djz7m86dcCr3hDi9iTnbPDANBBzwTbJex\noAgta0kxpyTMHlwUpqgEfcZAWlZpnGXdg1FGzkKErQKBgQCUwWgujUJkoZp3UhDC\n92sRT5oTugHCI4P48eWElMc50BhpA3qLq6wkXM4ecYANcchp9LPTrc9OMVLoa6r7\nkQK1btz4ENnDuUpnDgrXgJBaL5WWeHYrz0SEFSzOYpBrqOg9dIL0SljUOTboBIMQ\nPgZQQgT45Ytvod2N+zXQcpvUuQ==\n-----END PRIVATE KEY-----\n"
    })
}) : firebase.app();

export class Collection {

    private reference : string = "/";

    constructor( name:string ) {
        this.reference = name.startsWith('/') ? name : '/'.concat( name );
    }

    getReference() {
        return firebase.database( app ).ref( this.reference )
    }

    async create( metadata:FirebaseArgument ) : Promise<{ id:string }> {
        const uuid = uuidv7();
        await firebase.database( app ).ref( this.reference.concat( '/', uuid ) ).set( metadata );
        return { id:uuid }
    }

    async findAll() : Promise<FirebaseResponse[]> {
        return this.getReference().get().then( MetadataCollection => {
            const resultArray : FirebaseResponse[] = new Array();
            if ( MetadataCollection.exists() ) {
                const collection = MetadataCollection.val();
                for ( const _id of Object.keys( collection ) ) {
                    resultArray.push({
                        _id, ...collection[_id]
                    })
                }
            }
            return resultArray;
        })
    }

    async update( _id:string, update:FirebaseArgument ) {
        return firebase.database( app ).ref( this.reference.concat( '/', _id ) ).update( update );
    }

    async delete( _id:string ) {
        return firebase.database( app ).ref( this.reference.concat( '/', _id ) ).remove();
    }

}

export default { Collection };
