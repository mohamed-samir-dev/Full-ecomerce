'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { initialFormData, getTabs } from './utils/formData';
import { submitProduct } from './utils/submitProduct';
import { ArrayFieldType } from './types/product';
import ProductHeader from './components/ProductHeader';
import Tabs from './components/Tabs';
import BasicInfoTab from './components/BasicInfoTab';
import PricingTab from './components/PricingTab';
import MediaTab from './components/MediaTab';
import CategoriesTab from './components/CategoriesTab';
import VariantsTab from './components/VariantsTab';
import DetailsTab from './components/DetailsTab';
import FormNavigation from './components/FormNavigation';

export default function AddProductPage() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const tabs = getTabs(isArabic);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: ArrayFieldType, index: number, value: string) => {
    const fieldValue = formData[field];
    if (Array.isArray(fieldValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: fieldValue.map((item, i) => i === index ? value : item)
      }));
    }
  };

  const addArrayItem = (field: ArrayFieldType) => {
    const fieldValue = formData[field];
    if (Array.isArray(fieldValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...fieldValue, field === 'colors' ? { name: '', hex: '' } : '']
      }));
    }
  };

  const removeArrayItem = (field: ArrayFieldType, index: number) => {
    const fieldValue = formData[field];
    if (Array.isArray(fieldValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: fieldValue.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitProduct(formData);
      alert('Product added successfully!');
      router.push('/admin');
    } catch (error: unknown) {
      alert(`Error: ${error instanceof Error ? error.message : 'An error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-4 sm:py-6 px-3 sm:px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto">
        <ProductHeader isDarkMode={isDarkMode} isArabic={isArabic} onBack={() => router.back()} />

        <div className={`rounded-xl shadow-lg mb-4 sm:mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Tabs tabs={tabs} activeTab={activeTab} isDarkMode={isDarkMode} onTabChange={setActiveTab} />

          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            {activeTab === 0 && <BasicInfoTab formData={formData} isDarkMode={isDarkMode} isArabic={isArabic} onChange={handleChange} />}
            
            {activeTab === 1 && (
              <PricingTab 
                formData={formData} 
                isDarkMode={isDarkMode} 
                isArabic={isArabic} 
                onChange={handleChange}
                onDiscountChange={(field, value) => setFormData(prev => ({ ...prev, discount: { ...prev.discount, [field]: value } }))}
                onCheckboxChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
              />
            )}
            
            {activeTab === 2 && (
              <MediaTab 
                formData={formData} 
                isDarkMode={isDarkMode} 
                isArabic={isArabic} 
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
                onChange={handleChange}
                onArrayChange={handleArrayChange}
                onAddArrayItem={addArrayItem}
                onRemoveArrayItem={removeArrayItem}
              />
            )}
            
            {activeTab === 4 && (
              <VariantsTab 
                formData={formData} 
                isDarkMode={isDarkMode} 
                isArabic={isArabic}
                onArrayChange={handleArrayChange}
                onAddArrayItem={addArrayItem}
                onRemoveArrayItem={removeArrayItem}
                onColorChange={(index, field, value) => setFormData(prev => ({ 
                  ...prev, 
                  colors: prev.colors.map((c, idx) => idx === index ? { ...c, [field]: value } : c) 
                }))}
              />
            )}
            
            {activeTab === 5 && (
              <DetailsTab 
                formData={formData} 
                isDarkMode={isDarkMode} 
                isArabic={isArabic} 
                onChange={handleChange}
                onDimensionChange={(field, value) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, [field]: value } }))}
                onRatingChange={(rating) => setFormData(prev => ({ ...prev, initialReview: { ...prev.initialReview, rating } }))}
                onReviewCommentChange={(comment) => setFormData(prev => ({ ...prev, initialReview: { ...prev.initialReview, comment } }))}
              />
            )}

            <FormNavigation
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
