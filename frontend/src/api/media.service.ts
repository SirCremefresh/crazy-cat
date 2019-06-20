export interface Medium {
    id: string;
    active: boolean;
    description: string;
    fileUrls: {
        s: string, m: string, l: string,thumbnail: string
    }
    license: string
    likes: number
    name: string
    type: "video" | "image"
}

class MediaService {
    private mediaCache: Medium[] = null;

    async fetchAll(): Promise<Medium[]> {
        if (this.mediaCache === null)
            this.mediaCache = await fetch("https://us-central1-crazy-cat-josodo.cloudfunctions.net/media").then<Medium[]>(e => e.json());
        return this.mediaCache;
    }

    async fetch(id: string) {
        if (this.mediaCache === null) {
            throw new Error("not implemented lazy loading");
        }
        return this.mediaCache.find((medium) => medium.id === id);
    }
}

export const mediaService = new MediaService();