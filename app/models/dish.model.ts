export class Dish {
    public id: string;
    public name: string;
    public description: string;
    public tags: string;
    public imagePath: string;
    public creator: string;
<<<<<<< HEAD
    public eventId: string;

    constructor(name: string, description: string, tags: string, imagePath: string, creator: string, eventId: string)
=======

    constructor(name: string, description: string, tags: string, imagePath: string, creator: string)
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
    {
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.imagePath = imagePath;
        this.creator = creator;
<<<<<<< HEAD
        this.eventId = eventId;
=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
    }
}