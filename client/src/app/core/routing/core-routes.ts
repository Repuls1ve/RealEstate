import { Routes } from '@angular/router'

export const WildCard = '**'

export enum FeaturesRoutes {
  Home = 'home',
  About = 'about',
  Contacts = 'contacts',
  Feedback = 'feedback',
  Catalog = 'catalog',
  Tour = 'tour'
}

export const LoadChildrenCallbacks = {
  Home: () => import('../../features/home/home.module')
  .then(m => m.HomeModule),
  About: () => import('../../features/about/about.module')
  .then(m => m.AboutModule),
  Contacts: () => import('../../features/contacts/contacts.module')
  .then(m => m.ContactsModule),
  Feedback: () => import('../../features/feedback/feedback.module')
  .then(m => m.FeedbackModule),
  Catalog: () => import('../../features/catalog/catalog.module')
  .then(m => m.CatalogModule),
  Tour: () => import('../../features/tour/tour.module')
  .then(m => m.TourModule)
}


export const routes: Routes = [
  {
    path: FeaturesRoutes.Home,
    loadChildren: LoadChildrenCallbacks.Home
  },
  {
    path: FeaturesRoutes.About,
    loadChildren: LoadChildrenCallbacks.About
  },
  {
    path: FeaturesRoutes.Contacts,
    loadChildren: LoadChildrenCallbacks.Contacts
  },
  {
    path: FeaturesRoutes.Feedback,
    loadChildren: LoadChildrenCallbacks.Feedback
  },
  {
    path: FeaturesRoutes.Catalog,
    loadChildren: LoadChildrenCallbacks.Catalog
  },
  {
    path: FeaturesRoutes.Tour,
    loadChildren: LoadChildrenCallbacks.Tour
  },
  {
    path: WildCard,
    redirectTo: FeaturesRoutes.Home
  }
]