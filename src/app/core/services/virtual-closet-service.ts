import { Injectable, signal } from '@angular/core';
import { mockClothing } from '../mock/mock-data';
import { ClothingItem } from '../models/interface';
import { environment } from '../../../enviroments/enviroment';
import { GarmentRepository } from './garment-repository';
import { AuthService } from './auht.service';

@Injectable({
  providedIn: 'root'
})

export class ClothingService {
  constructor(private garmentRep: GarmentRepository, private authService: AuthService) {
    if (authService.userIsLoggedIn() !== null) {
      garmentRep.getAllClots().then(data => this.savedGarment.set(data))
      console.log(this.savedGarment())
    }
  }
  aiAnswer = signal<ClothingItem>({} as ClothingItem);
  stateUploader = signal<'idle' | 'result' | 'added'>('idle');
  base64Image = signal<string>('')
  savedGarment = signal<ClothingItem[]>([])
  imageName: string = ''
  compressedBlob: Blob | null = null;

  async debugger() {
    console.log(this.savedGarment())
  }

  async saveGarment(event: ClothingItem) {
    this.savedGarment.update(list => [...list, { ...event }])
    this.garmentRep.insertClots(event, this.authService.currentUser()?.id, this.compressedBlob, this.imageName)
  }

  async onFileSelected(event: Event): Promise<ClothingItem> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      const imageCompressed: Blob = await this.imageCompressor(file)
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
        this.aiAnswer.set(mockClothing[Math.ceil(Math.random() * (5 - 1) + 1)])
        this.base64Image.set(reader.result as string)
        if (this.aiAnswer()) {
          this.aiAnswer().imageUrl = URL.createObjectURL(imageCompressed)
          this.compressedBlob = imageCompressed
          this.imageName = file.name
        } else {
          throw new Error
        }
      };
      reader.onerror = () => {
        console.log('Algo fallo')
      }
      reader.readAsDataURL(imageCompressed);
    }
    return this.aiAnswer()
  }

  async imageCompressor(file: File): Promise<Blob> {
    const temporalUrl = URL.createObjectURL(file)
    const image = new Image()
    return new Promise<Blob>((resolve, reject) => {
      image.onload = () => {
        let biggestSide: number = 1024
        if (image.width > image.height) {
          image.height = image.height * (biggestSide / image.width)
          image.width = biggestSide
        } else {
          image.width = image.width * (biggestSide / image.height)
          image.height = biggestSide
        }
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        canvas.getContext('2d')?.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          resolve(blob as Blob)
        }, "image/jpeg", 0.7)
      }
      image.onerror = () => {
        reject
        console.log('algo fallo en la imagen')
      }
      image.src = temporalUrl
    })
  }
}