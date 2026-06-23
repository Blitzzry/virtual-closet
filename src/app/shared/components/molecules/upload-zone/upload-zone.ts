import { Component, Output, EventEmitter } from '@angular/core';
import { Icon } from '../../atoms/icon/icons';
import { environment } from '../../../../../enviroments/enviroment';
import { mockAiAnswers, mockClothing } from '../../../../core/mock/mock-data';
import { ClothingItem } from '../../../../core/services/interface';

@Component({
  selector: 'app-upload-zone',
  imports: [Icon],
  templateUrl: './upload-zone.html',
  styleUrl: './upload-zone.css',
})
export class UploadZone {
  constructor() {}
  @Output() Image = new EventEmitter<any>();
  @Output() Text = new EventEmitter<ClothingItem>();

  fileSelected: File | null = null;
  aiAnswer?: ClothingItem
  base64Image: string = '';


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.convertToBase64(file);
      this.fileSelected = file;
      console.log(file)
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
      this.aiAnswer = mockClothing[0];
      this.base64Image = reader.result as string;
      if (this.aiAnswer) {
        this.Text.emit(this.aiAnswer);
        this.Image.emit(this.base64Image.split(',')[1]);
      }
      console.log(this.base64Image.split(',')[1]);
    };
    reader.readAsDataURL(file);
  }
}
