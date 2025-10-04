import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ScriptLoaderService } from '../../services/script-loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit, OnDestroy {
  private initialized = false;
  activeIndex = 1;
  
  constructor(private scriptLoaderService: ScriptLoaderService) {}

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

  ngOnDestroy(): void {
    // Limpiar/Destruir carousel al salir del componente
    this.destroyHeroCarousel();
  }

  private initHeroCarousel() {
    const $ = (window as any).jQuery || (window as any).$;
    if (!($ && $.fn && $.fn.owlCarousel)) {
      console.warn('jQuery u OwlCarousel no disponible para inicializar hero-two-slider');
      return;
    }
    const el = $('.hero-two-slider');

    // Si ya está inicializado, destrúyelo antes de reinit
    if (el.length && el.hasClass('owl-loaded')) {
      try {
        el.trigger('destroy.owl.carousel'); // comando de owl para destruir
        el.removeClass('owl-loaded owl-carousel');
        // a veces owl envuelve nodos; opcionalmente limpiar DOM extra
        el.find('.owl-stage-outer').children().unwrap();
      } catch (e) {
        // fallback: remover HTML generado por owl
        console.warn('Fallo al destruir owl, limpiando manualmente', e);
      }
    }

    // Inicializar con tus opciones
    el.owlCarousel({
      loop: true,
      margin: 30,
      items: 1,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        992: { items: 1 }
      }
      // agrega aquí las opciones que uses en tu theme
    });

    this.initialized = true;
  }

  private destroyHeroCarousel() {
    const $ = (window as any).jQuery || (window as any).$;
    if (!($ && $.fn && $.fn.owlCarousel)) return;
    const el = $('.hero-two-slider');
    if (el.length && el.hasClass('owl-loaded')) {
      try {
        el.trigger('destroy.owl.carousel');
        el.removeClass('owl-loaded owl-carousel');
        el.find('.owl-stage-outer').children().unwrap();
      } catch (e) {
        console.warn('Error destruyendo carousel', e);
      }
    }
    this.initialized = false;
  }
  // toggle(index: number) {
  //   this.activeIndex = this.activeIndex === index ? -1 : index;
  // }
}
