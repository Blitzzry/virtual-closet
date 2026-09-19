import { computed, Injectable, signal } from "@angular/core";
import { mockClothing } from "../mock/mock-data";
import { AiAnswer, ClothingCategory, ClothingItem } from "../models/interface";
import { GarmentRepository } from "./garment-repository";
import { AuthService } from "./auht.service";
import { debounceTime, fromEvent } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SupabaseService } from "./supabase.service";

@Injectable({
  providedIn: "root",
})
export class ClothingService {
  constructor(
    private garmentRep: GarmentRepository,
    private authService: AuthService,
    public supabase: SupabaseService,
  ) {
    fromEvent(window, "resize")
      .pipe(
        debounceTime(150),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.windowWidth.set(window.innerWidth);
      });
    if (authService.userIsLoggedIn() !== null) {
      garmentRep.getAllClots().then((data) => this.savedGarment.set(data));
    }
  }

  aiAnswer = signal<AiAnswer>({} as AiAnswer);
  stateUploader = signal<"idle" | "result" | "added">("idle");
  base64Image = signal<string>("");
  savedGarment = signal<ClothingItem[]>([]);
  imageName: string = "";
  compressedBlob: Blob | null = null;
  windowWidth = signal<number>(window.innerWidth);
  selectedCategories = signal<Set<ClothingCategory>>(new Set());

  toggleCategory(cat: ClothingCategory, counter: number) {
    if (counter == 0) {
      console.log("ej");
    } else {
      this.selectedCategories.update((current) => {
        const next = new Set(current);
        if (next.has(cat)) {
          next.delete(cat);
        } else {
          next.add(cat);
        }
        return next;
      });
    }
  }

  filteredClots = computed(() => {
    if (this.selectedCategories().size == 0) {
      return this.savedGarment();
    } else {
      return this.savedGarment().filter((ele) =>
        this.selectedCategories().has(ele.category)
      );
    }
  });

  categoryCount = computed(() => {
    const valorInicial: Record<ClothingCategory, number> = {
      tops: 0,
      bottoms: 0,
      dresses: 0,
      outerwear: 0,
      shoes: 0,
      accessories: 0,
    };
    return this.savedGarment().reduce((acc, garment) => {
      acc[garment.category] = acc[garment.category] + 1;
      return acc;
    }, {} = valorInicial);
  });

  async saveGarment(event: ClothingItem) {
    this.savedGarment.update((list) => [...list, { ...event }]);
    await this.garmentRep.insertClots(
      event,
      this.authService.currentUser()?.id,
      this.compressedBlob,
      this.imageName,
    );
  }

  async onFileSelected(event: Event): Promise<AiAnswer> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      const imageCompressed: Blob = await this.imageCompressor(file);
      reader.onload = async () => {
        this.base64Image.set(reader.result as string);
        const { data, error } = await this.supabase.client.functions.invoke(
          "ai-caller",
          { body: { image: this.base64Image().split("base64")[1] } },
        );
        if (error) throw error;
        this.aiAnswer.set(JSON.parse(data.aiAnswer.choices[0].message.content));
        console.log(typeof this.aiAnswer());
        if (!this.aiAnswer().isGarmnet) {
          this.aiAnswer.update(ele => ({
            ...ele,
            item: {
              ...ele.item!,
              id: crypto.randomUUID(),
              imageUrl: URL.createObjectURL(imageCompressed),
              isFavorite: false
            }
          }))
          this.compressedBlob = imageCompressed;
          this.imageName = file.name;
          return this.aiAnswer().item;
        } else {
          console.log('paila');
          return this.aiAnswer();
        }
      };
      reader.onerror = () => {
        console.log("Algo fallo");
      };
      reader.readAsDataURL(imageCompressed);
    }
    return this.aiAnswer();
  }

  async imageCompressor(file: File): Promise<Blob> {
    const temporalUrl = URL.createObjectURL(file);
    const image = new Image();
    return new Promise<Blob>((resolve, reject) => {
      image.onload = () => {
        let biggestSide: number = 1024;
        if (image.width > image.height) {
          image.height = image.height * (biggestSide / image.width);
          image.width = biggestSide;
        } else {
          image.width = image.width * (biggestSide / image.height);
          image.height = biggestSide;
        }
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d")?.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
        );
        canvas.toBlob(
          (blob) => {
            resolve(blob as Blob);
          },
          "image/jpeg",
          0.7,
        );
      };
      image.onerror = () => {
        reject;
        console.log("algo fallo en la imagen");
      };
      image.src = temporalUrl;
    });
  }
}
