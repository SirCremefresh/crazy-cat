export interface Media {
    active: boolean;
    description: string;
    fileUrls: {
        s: string, m: string, l: string
    }
    license: string
    likes: number
    name: string
    type: "video" | "image"
}

class MediaService {
    private mediaCache: Media[] = null;

    async fetchAll(): Promise<Media[]> {
        if (this.mediaCache === null)
            this.mediaCache = await fetch("https://us-central1-crazy-cat-josodo.cloudfunctions.net/media").then<Media[]>(e => e.json());
        return this.mediaCache;
    }
}

export const mediaService = new MediaService();