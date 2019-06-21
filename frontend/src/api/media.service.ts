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
}

class MediaService {
    private mediaCache: Medium[] = null;

    async fetchAll(): Promise<Medium[]> {
        if (this.mediaCache === null)
            this.mediaCache = await fetch("https://europe-west1-crazy-cat-josodo.cloudfunctions.net/media").then<Medium[]>(e => e.json());
        return this.mediaCache;
    }

    async fetch(id: string): Promise<Medium> {
        if (this.mediaCache === null) {
            await this.fetchAll();
            console.error("not implemented lazy loading");
        }
        return this.mediaCache.find((medium) => medium.id === id);
    }

    async like(id: string) {
        const medium = await this.fetch(id);
        medium.likes++;
        await fetch(`https://europe-west1-crazy-cat-josodo.cloudfunctions.net/like?id=${id}`)
    }

    async unlike(id: string) {
        const medium = await this.fetch(id);
        medium.likes--;
        await fetch(`https://europe-west1-crazy-cat-josodo.cloudfunctions.net/unlike?id=${id}`)
    }

    async dislike(id: string) {
        const medium = await this.fetch(id);
        medium.dislikes++;
        await fetch(`https://europe-west1-crazy-cat-josodo.cloudfunctions.net/dislike?id=${id}`)
    }

    async undislike(id: string) {
        const medium = await this.fetch(id);
        medium.dislikes--;
        await fetch(`https://europe-west1-crazy-cat-josodo.cloudfunctions.net/undislike?id=${id}`)
    }
}

export const mediaService = new MediaService();