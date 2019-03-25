export class Dish {
    public id: string;
    public name: string;
    public description: string;
    public imagePath: string; //image URL
    public tags: string;

    constructor(name: string, description: string, imagePath: string, tags: string)
    {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.tags = tags;
    }
}