import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  translate = inject(TranslateService);

  constructor() {
    const savedLang = localStorage.getItem('language');
    const browserLang = this.translate.getBrowserLang();
    const lang = savedLang || (browserLang === 'es' ? 'es' : 'en');

    this.translate.setFallbackLang('en');
    this.translate.use(lang);
  }
}