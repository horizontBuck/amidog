import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ScriptLoaderService } from '../../services/script-loader.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements AfterViewInit {
  constructor(private scriptLoaderService: ScriptLoaderService) {}


  initHeroCarousel() {
    
  }
  async ngAfterViewInit(): Promise<void> {
    // Cargar solo los scripts necesarios para el carousel (jquery ya debería estar cargado en App)
    try {
      await this.scriptLoaderService.loadAll([
        // solo plugins que NO estén ya cargados globalmente
        { src: 'assets/js/owl.carousel.min.js', attr: { defer: 'true' } },
        { src: 'assets/js/slick.min.js', attr: { defer: 'true' } },
        // ...otros plugins que tu hero necesite (solo si no están cargados)
      ]);

      // Esperar micro-tick para asegurar que DOM está actualizado
      setTimeout(() => this.initHeroCarousel(), 0);
    } catch (err) {
      console.error('Error cargando scripts en Home', err);
    }
  }

}
