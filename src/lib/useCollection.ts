
import { Collection } from "@/lib/firebase";

export const dbChapters = new Collection('collectionChapters');
export const dbMembers = new Collection('collectionMembers');
export const dbComics = new Collection('collectionComics');

export interface typeCollectionMembers {
    _id?: string;
    email: string;
    username: string;
    password: string;
    timestamp: number
}

export interface typeCollectionComics {
    _id?: string;
    type: "manga" | "manhwa" | "manhua" | "fansub";
    title: string;
    description: string;
    thumbnail: string;
    timestamp: number
}

export interface typeCollectionChapters {
    _id?: string;
    chapter: number;
    images: string[];
    timestamp: number
}
