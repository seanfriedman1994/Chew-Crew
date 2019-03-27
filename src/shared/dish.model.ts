export class Dish {
    public id: string;
    public name: string;
    public description: string;
    public tags: string;
    public imagePath: string;

    constructor(name: string, description: string, tags: string, imagePath: string)
    {
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.imagePath = imagePath;
    }
}