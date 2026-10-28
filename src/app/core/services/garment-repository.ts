import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { ClothingItem, GarmentRow } from "../models/interface";
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
    path: string = "";

    private fromRow(clot: Omit<GarmentRow, 'created_at'>): ClothingItem {
        return {
            id: clot.id,
            name: clot.name,
            category: clot.category,
            colors: clot.colors,
            tags: clot.tags,
            brand: clot.brand,
            material: clot.material,
            notes: clot.notes,
            isFavorite: clot.is_favorite,
            imageUrl: clot.imageUrl,
            isDirty: clot.is_dirty
        };
    }

    async getAllClots(): Promise<ClothingItem[]> {
        let arrayBuckets: string[] = [];
        let clotsWithImgs: GarmentRow[] = [];
        const { data, error } = await this.supaService.client
            .from("garment")
            .select("*")
            .order("created_at", { ascending: true })
            .order("id", { ascending: true });
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
        return clotsWithImgs.map((clot: GarmentRow) => this.fromRow(clot));
    }
    async insertClots(
        item: ClothingItem,
        userId: string | undefined,
        blob: Blob | null,
        imageName: string,
    ): Promise<void> {
        const path = await this.upldImagInBucket(blob, imageName);
        const { error } = await this.supaService.client
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
                is_dirty: item.isDirty
            });
        if (error) throw error;
    }

    async updateGarment(id: string, clot: Partial<ClothingItem>) {
        const { error } = await this.supaService.client
            .from("garment")
            .update({
                name: clot.name,
                category: clot.category,
                brand: clot.brand,
                material: clot.material,
                notes: clot.notes,
                is_favorite: clot.isFavorite,
                is_dirty: clot.isDirty,
            })
            .eq('id', id);
        if (error) throw error;
    }

    async removeClots(id: string, path: string[]) {
        const { error } = await this.supaService.client
            .from("garment")
            .delete()
            .eq("id", id);
        if (error) throw error;
        await this.delImagFromBucket(path);
    }

    async delImagFromBucket(path: string[]) {
        const { error } = await this.supaService.client
            .storage
            .from("images")
            .remove(path);
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
