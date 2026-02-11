'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useProductForm } from './hooks/useProductForm';
import EditProductHeader from './components/EditProductHeader';
import TabNavigation from './components/TabNavigation';
import BasicInfoTab from './components/BasicInfoTab';
import PricingTab from './components/PricingTab';
import MediaTab from './components/MediaTab';
import CategoriesTab from './components/CategoriesTab';
import VariantsTab from './components/VariantsTab';
import DetailsTab from './components/DetailsTab';
import NavigationButtons from './components/NavigationButtons';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const {
    formData,
    setFormData,
    loading,
    fetchLoading,
    fetchProduct,
    handleChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    handleSubmit
  } = useProductForm(params.id as string);

  const tabs = [
    { id: 0, name: isArabic ? 'معلومات أساسية' : 'Basic Info', icon: '📝' },
    { id: 1, name: isArabic ? 'التسعير' : 'Pricing', icon: '💰' },
    { id: 2, name: isArabic ? 'الوسائط' : 'Media', icon: '🖼️' },
    { id: 3, name: isArabic ? 'التصنيفات' : 'Categories', icon: '📂' },
    { id: 4, name: isArabic ? 'المتغيرات' : 'Variants', icon: '🎨' },
    { id: 5, name: isArabic ? 'التفاصيل' : 'Details', icon: '📋' },
  ];

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
    isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
  }`;
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  if (fetchLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-4 sm:py-6 px-3 sm:px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto">
        <EditProductHeader isDarkMode={isDarkMode} isArabic={isArabic} onBack={() => router.back()} />

        <div className={`rounded-xl shadow-lg mb-4 sm:mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <TabNavigation tabs={tabs} activeTab={activeTab} isDarkMode={isDarkMode} onTabChange={setActiveTab} />

          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            {activeTab === 0 && (
              <BasicInfoTab
                formData={formData}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                inputClass={inputClass}
                labelClass={labelClass}
                onChange={handleChange}
              />
            )}

            {activeTab === 1 && (
              <PricingTab
                formData={formData}
                setFormData={setFormData}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                inputClass={inputClass}
                labelClass={labelClass}
                onChange={handleChange}
              />
            )}

            {activeTab === 2 && (
              <MediaTab
                formData={formData}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                inputClass={inputClass}
                labelClass={labelClass}
                onChange={handleChange}
                onArrayChange={handleArrayChange}
                onAddArrayItem={addArrayItem}
                onRemoveArrayItem={removeArrayItem}
              />
            )}

            {activeTab === 3 && (
              <CategoriesTab
                formData={formData}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                inputClass={inputClass}
                labelClass={labelClass}
                onChange={handleChange}
                onArrayChange={handleArrayChange}
                onAddArrayItem={addArrayItem}
                onRemoveArrayItem={removeArrayItem}
              />
            )}

            {activeTab === 4 && (
              <VariantsTab
                formData={formData}
                setFormData={setFormData}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                inputClass={inputClass}
                labelClass={labelClass}
                onArrayChange={handleArrayChange}
                onAddArrayItem={addArrayItem}
                onRemoveArrayItem={removeArrayItem}
              />
            )}

            {activeTab === 5 && (
              <DetailsTab
                formData={formData}
                setFormData={setFormData}
                isDarkMode={isDarkMode}
                isArabic={isArabic}
                inputClass={inputClass}
                labelClass={labelClass}
                onChange={handleChange}
              />
            )}

            <NavigationButtons
              activeTab={activeTab}
              totalTabs={tabs.length}
              loading={loading}
              isDarkMode={isDarkMode}
              isArabic={isArabic}
              onPrevious={() => setActiveTab(Math.max(0, activeTab - 1))}
              onNext={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
              onCancel={() => router.back()}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
