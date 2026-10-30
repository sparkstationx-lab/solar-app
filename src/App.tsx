import React, { useState, useEffect } from 'react';
import { NavTab, BottomNavigation } from './components/layout/BottomNavigation';
import { MobileFrame } from './components/layout/MobileFrame';
import { Header } from './components/layout/Header';
import { ToastContainer, ToastMessage } from './components/common/Toast';

import { HomeScreen } from './components/home/HomeScreen';
import { ProductCatalogScreen } from './components/products/ProductCatalogScreen';
import { CalculatorScreen } from './components/calculator/CalculatorScreen';
import { QuotationBuilderScreen } from './components/quotations/QuotationBuilderScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';

import { SurveyBookingModal } from './components/survey/SurveyBookingModal';
import { SolarAIAssistantModal } from './components/ai/SolarAIAssistantModal';
import { ExpoExportModal } from './components/expo/ExpoExportModal';

import { StorageService } from './services/storage';
import { SolarProduct, Quotation, SurveyBooking, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');

  // Core Data State
  const [products, setProducts] = useState<SolarProduct[]>([]);
  const [savedQuotations, setSavedQuotations] = useState<Quotation[]>([]);
  const [surveyBookings, setSurveyBookings] = useState<SurveyBooking[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => StorageService.getUserProfile());

  // Current Quotation Draft State
  const [quotationProducts, setQuotationProducts] = useState<SolarProduct[]>([]);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [isAIBotOpen, setIsAIBotOpen] = useState(false);
  const [isExpoModalOpen, setIsExpoModalOpen] = useState(false);
  const [quoteContextForSurvey, setQuoteContextForSurvey] = useState<Quotation | null>(null);

  // Initial Load from Storage
  useEffect(() => {
    setProducts(StorageService.getProducts());
    setSavedQuotations(StorageService.getQuotations());
    setSurveyBookings(StorageService.getBookings());
    setUserProfile(StorageService.getUserProfile());
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Quotation Item Management
  const handleAddToQuotation = (product: SolarProduct) => {
    if (quotationProducts.some(p => p.id === product.id)) {
      setQuotationProducts(prev => prev.filter(p => p.id !== product.id));
      addToast(`Removed ${product.name} from quotation builder`, 'info');
    } else {
      setQuotationProducts(prev => [...prev, product]);
      addToast(`Added ${product.name} to quotation builder!`, 'success');
    }
  };

  const handleRemoveFromQuotation = (productId: string) => {
    setQuotationProducts(prev => prev.filter(p => p.id !== productId));
    addToast('Product removed from quotation', 'info');
  };

  const handleClearSelectedProducts = () => {
    setQuotationProducts([]);
    addToast('Cleared all items from quotation builder', 'info');
  };

  const handleSaveQuotation = (quotation: Quotation) => {
    const updated = StorageService.saveQuotation(quotation);
    setSavedQuotations(updated);
    addToast(`Quotation ${quotation.quotationNumber} saved successfully!`, 'success');
  };

  const handleSaveSurveyBooking = (booking: SurveyBooking) => {
    const updated = StorageService.saveBooking(booking);
    setSurveyBookings(updated);
    addToast(`Survey ${booking.referenceNumber} scheduled!`, 'success');
  };

  // Generate Quotation directly from Calculator
  const handleGenerateQuotationFromCalc = (capacityKw: number, monthlyBill: number) => {
    // Find system or panel matching capacity
    const systemProduct = products.find(p => p.category === 'systems' && p.capacityValue <= capacityKw) || products[0];
    const inverterProduct = products.find(p => p.category === 'inverters') || products[3];

    setQuotationProducts([systemProduct, inverterProduct]);
    setActiveTab('quotations');
    addToast(`Generated quotation for ${capacityKw} kW Solar System!`, 'success');
  };

  const handleOpenSurveyWithQuote = (quote: Quotation) => {
    setQuoteContextForSurvey(quote);
    setIsSurveyModalOpen(true);
  };

  const favoriteProducts = products.filter(p => userProfile.savedProductIds.includes(p.id));

  return (
    <MobileFrame>
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Mobile Header */}
      <Header
        selectedCity={selectedCity}
        onSelectCity={city => {
          setSelectedCity(city);
          addToast(`Location set to ${city}`, 'info');
        }}
        quotationItemsCount={quotationProducts.length}
        onOpenQuotationBuilder={() => setActiveTab('quotations')}
        onOpenAIAssistant={() => setIsAIBotOpen(true)}
      />

      {/* Main Tab Screen Body */}
      <main className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        {activeTab === 'home' && (
          <HomeScreen
            products={products}
            onNavigateToTab={setActiveTab}
            onSelectProduct={p => {
              handleAddToQuotation(p);
              setActiveTab('quotations');
            }}
            onOpenSurveyModal={() => {
              setQuoteContextForSurvey(null);
              setIsSurveyModalOpen(true);
            }}
            onOpenAIAssistant={() => setIsAIBotOpen(true)}
            selectedCity={selectedCity}
          />
        )}

        {activeTab === 'products' && (
          <ProductCatalogScreen
            products={products}
            onAddToQuotation={handleAddToQuotation}
            quotationProductIds={quotationProducts.map(p => p.id)}
            onNavigateToQuotation={() => setActiveTab('quotations')}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorScreen
            selectedCity={selectedCity}
            onGenerateQuotationFromCalc={handleGenerateQuotationFromCalc}
            onOpenSurveyModal={() => {
              setQuoteContextForSurvey(null);
              setIsSurveyModalOpen(true);
            }}
          />
        )}

        {activeTab === 'quotations' && (
          <QuotationBuilderScreen
            selectedProducts={quotationProducts}
            onRemoveProduct={handleRemoveFromFromQuotation => handleRemoveFromQuotation(handleRemoveFromFromQuotation)}
            onClearSelectedProducts={handleClearSelectedProducts}
            onSaveQuotation={handleSaveQuotation}
            savedQuotations={savedQuotations}
            onOpenSurveyModalWithQuote={handleOpenSurveyWithQuote}
            userProfileName={userProfile.name}
            userProfilePhone={userProfile.phone}
            userProfileEmail={userProfile.email}
            userProfileAddress={userProfile.address}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            userProfile={userProfile}
            onUpdateProfile={p => {
              setUserProfile(p);
              StorageService.saveUserProfile(p);
            }}
            savedQuotations={savedQuotations}
            surveyBookings={surveyBookings}
            favoriteProducts={favoriteProducts}
            onOpenAIAssistant={() => setIsAIBotOpen(true)}
            onOpenExpoExportModal={() => setIsExpoModalOpen(true)}
            onOpenSurveyModal={() => {
              setQuoteContextForSurvey(null);
              setIsSurveyModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Bottom Tab Bar Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        quotationsCount={quotationProducts.length}
      />

      {/* Modals */}
      <SurveyBookingModal
        isOpen={isSurveyModalOpen}
        onClose={() => {
          setIsSurveyModalOpen(false);
          setQuoteContextForSurvey(null);
        }}
        onSaveBooking={handleSaveSurveyBooking}
        quotationContext={quoteContextForSurvey}
        selectedCity={selectedCity}
      />

      <SolarAIAssistantModal
        isOpen={isAIBotOpen}
        onClose={() => setIsAIBotOpen(false)}
      />

      <ExpoExportModal
        isOpen={isExpoModalOpen}
        onClose={() => setIsExpoModalOpen(false)}
      />
    </MobileFrame>
  );
}
