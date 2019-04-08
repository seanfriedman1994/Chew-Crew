export interface AuthData
{
    email: string;
    password: string;
}

export interface User
{
    id: string;
    email: string;
    name: string;
    bio: string;
    image: string;
}

export interface Crew
{
    id: string;
    name: string;
    description: string;
    image: string;
    creator: string;
}

export interface EventActivity
{
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    creator: string;
    crewId: string;
}
<<<<<<< HEAD
=======


>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
