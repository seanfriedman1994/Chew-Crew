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
