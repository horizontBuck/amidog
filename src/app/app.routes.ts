import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Shop } from './page/shop/shop';
import { Contact } from './page/contact/contact';
import { About } from './page/about/about';
import { Services } from './page/services/services';
import { ShopDetail } from './page/shop-detail/shop-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Pets | Clínica de Mascotas',
    data: {
      description: 'Solicita citas con nuestros veterinarios',
      canonical: '/',
    },
  },
  {
    path: 'shop',
    component: Shop,
    title: 'Shop | Productos para tu mascota',
    data: {
      description: 'Encuentra los mejores productos, alimentos y accesorios para tus mascotas.',
      canonical: '/shop',
    },
  },
  {
    path: 'contact',
    component: Contact,
    title: 'Contact | Contacto',
    data: {
      description: 'Contacto',
      canonical: '/contact',
    },
  },
  {
    path: 'about',
    component: About,
    title: 'About | Nosotros',
    data: {
      description: 'Nosotros',
      canonical: '/about',
    },
  },
  {
    path: 'services',
    component: Services,
    title: 'Services | Servicios',
    data: {
      description: 'Servicios',
      canonical: '/services',
    },
  },
  {
    path: 'shop-detail/:id',
    component: ShopDetail,
    title: 'Shop Detail | Productos para tu mascota',
    data: {
      description: 'Encuentra los mejores productos, alimentos y accesorios para tus mascotas.',
      canonical: '/shop-detail',
    },
  },
];
