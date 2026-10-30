import { SolarProduct, Quotation, SurveyBooking, UserProfile } from '../types';
import { INITIAL_PRODUCTS, SAMPLE_QUOTATIONS, SAMPLE_BOOKINGS } from '../data/mockData';

const KEYS = {
  PRODUCTS: 'solar_showroom_products',
  QUOTATIONS: 'solar_showroom_quotations',
  BOOKINGS: 'solar_showroom_bookings',
  USER: 'solar_showroom_user_profile',
  CART: 'solar_showroom_cart'
};

export class StorageService {
  // Products
  static getProducts(): SolarProduct[] {
    try {
      const stored = localStorage.getItem(KEYS.PRODUCTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading products from local storage:', e);
    }
    // Default initial dataset
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }

  // Quotations
  static getQuotations(): Quotation[] {
    try {
      const stored = localStorage.getItem(KEYS.QUOTATIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading quotations:', e);
    }
    localStorage.setItem(KEYS.QUOTATIONS, JSON.stringify(SAMPLE_QUOTATIONS));
    return SAMPLE_QUOTATIONS;
  }

  static saveQuotation(quotation: Quotation): Quotation[] {
    const existing = this.getQuotations();
    const index = existing.findIndex(q => q.id === quotation.id);
    let updated: Quotation[];
    
    if (index >= 0) {
      updated = [...existing];
      updated[index] = quotation;
    } else {
      updated = [quotation, ...existing];
    }

    try {
      localStorage.setItem(KEYS.QUOTATIONS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving quotation:', e);
    }
    return updated;
  }

  static deleteQuotation(id: string): Quotation[] {
    const existing = this.getQuotations();
    const updated = existing.filter(q => q.id !== id);
    try {
      localStorage.setItem(KEYS.QUOTATIONS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error deleting quotation:', e);
    }
    return updated;
  }

  // Bookings
  static getBookings(): SurveyBooking[] {
    try {
      const stored = localStorage.getItem(KEYS.BOOKINGS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading survey bookings:', e);
    }
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(SAMPLE_BOOKINGS));
    return SAMPLE_BOOKINGS;
  }

  static saveBooking(booking: SurveyBooking): SurveyBooking[] {
    const existing = this.getBookings();
    const index = existing.findIndex(b => b.id === booking.id);
    let updated: SurveyBooking[];

    if (index >= 0) {
      updated = [...existing];
      updated[index] = booking;
    } else {
      updated = [booking, ...existing];
    }

    try {
      localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving survey booking:', e);
    }
    return updated;
  }

  // User Profile & Favorites
  static getUserProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(KEYS.USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading user profile:', e);
    }
    const defaultUser: UserProfile = {
      name: 'Rahul Verma',
      phone: '+91 98765 43210',
      email: 'rahul.verma@example.com',
      city: 'Mumbai',
      address: 'Flat 402, Green Palms, Andheri West',
      isLoggedIn: true,
      savedProductIds: ['prod-p1', 'prod-i1', 'prod-s1']
    };
    localStorage.setItem(KEYS.USER, JSON.stringify(defaultUser));
    return defaultUser;
  }

  static saveUserProfile(profile: UserProfile): UserProfile {
    try {
      localStorage.setItem(KEYS.USER, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile:', e);
    }
    return profile;
  }

  static toggleFavoriteProduct(productId: string): UserProfile {
    const user = this.getUserProfile();
    const exists = user.savedProductIds.includes(productId);
    const updatedIds = exists
      ? user.savedProductIds.filter(id => id !== productId)
      : [...user.savedProductIds, productId];

    const updatedUser = { ...user, savedProductIds: updatedIds };
    this.saveUserProfile(updatedUser);
    return updatedUser;
  }
}
