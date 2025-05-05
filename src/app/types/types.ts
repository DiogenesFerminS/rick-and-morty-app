
export type RickResponse = {
    info: Info;
    results: Result[];
};


export type Info = {
  count: number;
  next: string;
  pages: number; 
  prev: null  
};

export type Result = {
    id: number;
    name: string;
    status: Status;
    species: Species;
    type: string;
    gender: Gender;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
};

export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
};

export type Location = {
    name:  string;
    url:  string;
};

export enum Species {
    Alien = "Alien",
    Human = "Human",
};

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}

export type FavoriteContextProps = {
    favoriteCharacters: Result[] | [],
    onAddCharacter: (Result: Result) => void,
    onDeleteCharacter: (Result: Result) => void,
    onToggleCharacter: (Result: Result) => void,
}