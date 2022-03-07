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
        introduction: string;
        lookingFor: string;
        interests: string;
        city: string;
        country: string;
        photos: Photo[];
    }

   

