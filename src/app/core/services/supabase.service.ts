import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable({
    providedIn: 'root'
})

export class SupabaseService {
    private _client: SupabaseClient;
    constructor() {
        this._client = createClient(
            environment.SUPABASE_URL,
            environment.SUPABASE_PUBLISHABLE_KEY,
        )
    }
    get client(): SupabaseClient {
        return this._client;
    }
}