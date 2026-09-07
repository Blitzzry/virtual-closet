import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { ClothingItem } from "../models/interface";
import { AuthService } from "./auht.service";

@Injectable({
    providedIn: 'root'
})
export class GarmentRepository {
    constructor(private supaService: SupabaseService, private authService: AuthService) {

    }
    async getAllClots(): Promise<ClothingItem[]> {
        const { data, error } = await this.supaService.client
            .from('garment')
            .select('*')
        if (error) throw error;
        return (data ?? [])
    }
    async insertClots(item: ClothingItem, userId: string | undefined, blob: Blob | null, imageName: string): Promise<void> {
        const finalUrl = await this.upldImagInBucket(blob, imageName)
        const { data, error } = await this.supaService.client
            .from('garment')
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
                image_url: finalUrl,
            })
        if (error) throw error;
    }

    async upldImagInBucket(blob: Blob | null, imageName: string): Promise<string> {
        const { error } = await this.supaService.client
            .storage
            .from('images')
            .upload(`${this.authService.currentUser()?.id}/${Date.now()}-${imageName}`, blob)
        if (error) throw error
        else {
            const { data: urlData } = this.supaService.client
                .storage
                .from('images')
                .getPublicUrl(`${this.authService.currentUser()?.id}/${Date.now()}-${imageName}`)
            return urlData.publicUrl
        }
    }
}