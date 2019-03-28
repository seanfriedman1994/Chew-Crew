export class Dish {
    public id: string;
    public name: string;
    public description: string;
    public tags: string;
    public imagePath: string;
    public creator: string;

    constructor(name: string, description: string, tags: string, imagePath: string, creator: string)
    {
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.imagePath = imagePath;
        this.creator = creator;
    }
}