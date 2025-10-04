import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  isMenuOpen = false;
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
goTo(path: string) {
  this.router.navigate([path]);
this.toggleMenu();
  this.closeMobileMenu();

}
toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.style.display = this.isMenuOpen ? 'block' : 'none';  // Mostrar u ocultar el menú
  }
}

closeMobileMenu() {
  this.isMenuOpen = false; // Actualizamos el estado del menú
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.style.display = 'none';  // Ocultar el menú
  }
}




}
