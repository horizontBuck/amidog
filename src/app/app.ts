import { CommonModule } from '@angular/common';
import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ScriptLoaderService } from './services/script-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CommonModule,
    Header,
    Footer
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('amidog');
  constructor(private scriptLoaderService: ScriptLoaderService) {
    // this.loadScripts();
  }
  async ngAfterViewInit() {
    try {
      await this.scriptLoaderService.loadAll([
        { src: 'assets/js/jquery-3.6.0.min.js', attr: { defer: 'true' } },
       
       { src: 'assets/js/bootstrap.min.js', attr: { defer: 'true' } },
     { src: 'assets/js/owl.carousel.min.js', attr: { defer: 'true' } },
     { src: 'assets/js/slick.min.js', attr: { defer: 'true' } },
     { src: 'assets/js/jquery.nice-select.min.js', attr: { defer: 'true' } },
     { src: 'assets/js/jquery.fancybox.min.js', attr: { defer: 'true' } },
     { src: 'assets/js/slider_input.js', attr: { defer: 'true' } },
     { src: 'assets/js/custom.js', attr: { defer: 'true' } }


      ]);

      // ahora inicializa código que depende de esos scripts
      // p.ej. SVGInject(...) o cualquier init de plugins
      // si la librería expone global, casteamos any
      (window as any).SVGInject?.(document.querySelectorAll("img.injectable"));

      // también puedes llamar a funciones de main.js si exporta globales
    } catch (err) {
      console.error('Error cargando scripts', err);
    }
  }
}
