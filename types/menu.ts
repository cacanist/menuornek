export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  name: string;
  subcategories?: SubCategory[];
  items?: MenuItem[];
}

export interface RestaurantInfo {
  name: string;
  slogan: string;
  heroImage: string;
}

export interface MenuData {
  restaurantInfo: RestaurantInfo;
  categories: MenuCategory[];
}
