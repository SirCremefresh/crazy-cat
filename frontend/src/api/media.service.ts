export interface Medium {
    id: string;
    active: boolean;
    description: string;
    fileUrls: {
        s: string, m: string, l: string, thumbnail: string
    }
    license: string;
    likes: number;
    dislikes: number;
    name: string;
    type: "video" | "image";
    liked: boolean,
    disliked: boolean
}

class MediaService {
    private static readonly LIKES_LOCAL_STORAGE_KEY = "LIKES";
    private static readonly DISLIKES_LOCAL_STORAGE_KEY = "DISLIKES";
    private static readonly BASE_URL = "https://europe-west1-crazy-cat-josodo.cloudfunctions.net/";

    private mediaCache: Medium[] = null;

    async fetchAll(): Promise<Medium[]> {
        if (this.mediaCache === null) {
            this.mediaCache = await fetch(`${MediaService.BASE_URL}media`).then<Medium[]>(e => e.json());
            const likes = this.getArrayFromLocalStorage(MediaService.LIKES_LOCAL_STORAGE_KEY);
            const dislikes = this.getArrayFromLocalStorage(MediaService.DISLIKES_LOCAL_STORAGE_KEY);
            this.mediaCache = this.mediaCache.map(value => {
                return {
                    ...value,
                    liked: likes.includes(value.id),
                    disliked: dislikes.includes(value.id)
                }
            })
        }
        return this.mediaCache;
    }

    async fetch(id: string): Promise<Medium> {
        if (this.mediaCache === null) {
            await this.fetchAll();
        }
        return this.mediaCache.find((medium) => medium.id === id);
    }

    async like(id: string) {
        const medium = await this.fetch(id);
        medium.likes++;
        const likes = this.getArrayFromLocalStorage(MediaService.LIKES_LOCAL_STORAGE_KEY);
        likes.push(id);
        this.setArrayInLocalStorage(MediaService.LIKES_LOCAL_STORAGE_KEY, likes);
        await fetch(`${MediaService.BASE_URL}like?id=${id}`)
    }

    async unlike(id: string) {
        const medium = await this.fetch(id);
        medium.likes--;
        let likes = this.getArrayFromLocalStorage(MediaService.LIKES_LOCAL_STORAGE_KEY);
        likes = likes.filter(value => value !== id);
        this.setArrayInLocalStorage(MediaService.LIKES_LOCAL_STORAGE_KEY, likes);
        await fetch(`${MediaService.BASE_URL}unlike?id=${id}`)
    }

    async dislike(id: string) {
        const medium = await this.fetch(id);
        medium.dislikes++;
        const dislikes = this.getArrayFromLocalStorage(MediaService.DISLIKES_LOCAL_STORAGE_KEY);
        dislikes.push(id);
        this.setArrayInLocalStorage(MediaService.DISLIKES_LOCAL_STORAGE_KEY, dislikes);
        await fetch(`${MediaService.BASE_URL}dislike?id=${id}`)
    }

    async undislike(id: string) {
        const medium = await this.fetch(id);
        medium.dislikes--;
        let dislikes = this.getArrayFromLocalStorage(MediaService.DISLIKES_LOCAL_STORAGE_KEY);
        dislikes = dislikes.filter(value => value !== id);
        this.setArrayInLocalStorage(MediaService.DISLIKES_LOCAL_STORAGE_KEY, dislikes);
        await fetch(`${MediaService.BASE_URL}undislike?id=${id}`)
    }

    setArrayInLocalStorage(key: string, value: unknown[]) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getArrayFromLocalStorage(key: string) {
        const array = localStorage.getItem(key);
        if (array === null) {
            return [];
        } else {
            return JSON.parse(array);
        }
    }
}

export const mediaService = new MediaService();