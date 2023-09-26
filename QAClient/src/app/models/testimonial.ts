export class Testimonial {
    avatarUrl: string; // URL for the profile avatar
    name: string;      // User's name
    comment: string;   // User's comment
    rating: number;    // Service rating (0-5, can be decimal)

    constructor(avatarUrl: string, name: string, comment: string, rating: number) {
        this.avatarUrl = avatarUrl;
        this.name = name;
        this.comment = comment;
        this.rating = rating;
    }
}
