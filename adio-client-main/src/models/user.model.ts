export class User {
    id: any
    username: any;
    picture: any;
    link: any;
    country: any;
    token: any;

    constructor(username: string, id?: string, picture?: string, link?: string, country?: string) {
        this.username = username;
        this.id = id || '';
        this.picture = picture || '';
        this.link = link || '';
        this.country = country || '';
        this.token = '';
    }
}