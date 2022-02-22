import { Photo } from "./photo";

    
    export interface Member {
        Id:number;
        username: string;
        photoUrl:string;
        age:number,
        knownAs: string;
        created: string;
        lastActive: string;
        gender:string;
        intoduction: string;
        lookingFor: string;
        interests: string;
        city: string;
        country: string;
        photos: Photo[];
    }

   

