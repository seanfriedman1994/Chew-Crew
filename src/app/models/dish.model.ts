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
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    {
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.imagePath = imagePath;
        this.creator = creator;
<<<<<<< HEAD
        this.eventId = eventId;
=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    }
}