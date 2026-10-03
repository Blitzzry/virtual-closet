import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { ClothingItem } from "../models/interface";
import { AuthService } from "./auht.service";

@Injectable({
    providedIn: "root",
})
export class GarmentRepository {
    constructor(
        private supaService: SupabaseService,
        private authService: AuthService,
    ) {
    }
    path: string = ''

    async getAllClots(): Promise<ClothingItem[]> {
        let arrayBuckets: string[] = [];
        let clotsWithImgs: ClothingItem[] = [];
        const { data, error } = await this.supaService.client
            .from("garment")
            .select("*");
        if (error) throw error;
        if (data) {
            data.forEach((clot) => arrayBuckets.push(clot.bucket_path));
            const { data: urlData } = await this.supaService.client
                .storage
                .from("images")
                .createSignedUrls(arrayBuckets, 3600);
            clotsWithImgs = data.map((clot, ind) => {
                const currentUrlObj = (urlData as any[])?.[ind];

                return {
                    ...clot,
                    imageUrl: currentUrlObj?.signedUrl ?? "",
                };
            });
        }
        return clotsWithImgs;
    }
    async insertClots(
        item: ClothingItem,
        userId: string | undefined,
        blob: Blob | null,
        imageName: string,
    ): Promise<void> {
        const path = await this.upldImagInBucket(blob, imageName);
        const { data, error } = await this.supaService.client
            .from("garment")
            .insert({
                id: item.id,
                user_id: userId,
                name: item.name,
                category: item.category,
                colors: item.colors,
                tags: item.tags,
                brand: item.brand,
                material: item.material,
                notes: item.notes,
                is_favorite: item.isFavorite,
                bucket_path: path,
            });
        if (error) throw error;
    }

    async removeClots(id: string, path: string[]) {
        console.log(path);
        const { error } = await this.supaService.client
        .from("garment")
        .delete()
        .eq("id", id);
        if (error) throw error;
        await this.delImagFromBucket(path);
    }

    async delImagFromBucket(path: string[]) {
        const { error, data } = await this.supaService.client
            .storage
            .from("images")
            .remove(path);
        console.log("data:", data, "error:", error);
        if (error) throw error;
    }

    async upldImagInBucket(
        blob: Blob | null,
        imageName: string,
    ): Promise<string> {
        this.path =
            `${this.authService.currentUser()?.id}/${Date.now()}-${imageName}`;
        const { error } = await this.supaService.client
            .storage
            .from("images")
            .upload(this.path, blob);
        if (error) throw error;
        return this.path;
    }
}
