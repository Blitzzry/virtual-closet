import { Injectable, signal } from '@angular/core';
import { mockClothing } from '../mock/mock-data';
import { ClothingItem } from '../models/interface';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class ClothingService {
  aiAnswer = signal<ClothingItem>({} as ClothingItem);
  stateUploader = signal<'idle' | 'result' | 'added'>('idle');
  base64Image = signal<string>('')
  savedGarment = signal<ClothingItem[]>([])
  savedClothes = signal<ClothingItem>

  saveGarment(event: ClothingItem) {
    this.savedGarment.set([event])
    this.aiAnswer.set({} as ClothingItem)
    console.log(this.savedGarment())
    this.stateUploader.set('added')

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.convertToBase64(file);

    }
  }
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      /* const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.groqKey}`
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${this.base64Image.split(',')[1]}`
                  }
                },
                {
                  type: 'text',
                  text: 'describe la imagen en detalle, incluyendo tipo de prenda, colores, patrones y cualquier otro detalle relevante'
                }
              ]
            }
          ]
        })
      });
 
      const data = await response.json();
      this.aiAnswer = data.choices[0].message.content;
      console.log(this.aiAnswer); */
      this.aiAnswer.set(mockClothing[0])
      this.base64Image.set(reader.result as string)
      if (this.aiAnswer()) {
        this.stateUploader.set('result')
      }
    };
    reader.readAsDataURL(file);
    
  }
}