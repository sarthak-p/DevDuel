export interface User {
    [key: string]: string | number | string[] | undefined | null; 
    avatar_url?: string;
    bio?: string;
    username?: string;
    name?: string;
    location?: string;
    titles?: string[];
    'fav-language'?: string;
    'total-stars'?: number;
    'highest star count'?: number;
    'public-repos'?: number;
    'perfect-repos'?: number;
    followers?: number;
    following?: number;
}