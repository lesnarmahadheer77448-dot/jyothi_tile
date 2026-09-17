import { redirect } from 'next/navigation';

export default function CategoryPage() {
  // Since all categories are within the products page catalog, 
  // we redirect the user to the products catalog.
  redirect('/products');
}
