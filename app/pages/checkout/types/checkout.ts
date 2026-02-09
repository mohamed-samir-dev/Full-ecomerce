import { LucideIcon } from 'lucide-react';

interface CartItem {
    product?: {
      name?: string;
      finalPrice?: number;
      basePrice?: number;
    };
    quantity?: number;
  }
  
  export interface OrderSummaryProps {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    shipping: number;
    tax: number;
    finalTotal: number;
    deliveryDateStr: string;
    isDarkMode: boolean;
  }
  export interface PaymentFormProps {
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    onBack: () => void;
    onSubmit: () => void;
    isDarkMode: boolean;
  }
  
  export interface OrderItemProps {
    item: {
      product?: {
        finalPrice?: number;
        basePrice?: number;
        name?: string;
      };
      quantity?: number;
    };
    index: number;
    isDarkMode: boolean;
  }
  export interface PriceDetailsProps {
    subtotal: number;
    shipping: number;
    tax: number;
    finalTotal: number;
    deliveryDateStr: string;
    isDarkMode: boolean;
  }
  export interface CardDetailsFormProps {
    cardDetails: { number: string; name: string; expiry: string; cvv: string };
    setCardDetails: (details: { number: string; name: string; expiry: string; cvv: string }) => void;
    isDarkMode: boolean;
  }
  export interface OrderNotesSectionProps {
    notes: string;
    setNotes: (notes: string) => void;
    isLoading: boolean;
    onBack: () => void;
    onSubmit: () => void;
    isDarkMode: boolean;
  }

  export interface PaymentMethodOptionProps {
    id: string;
    value: string;
    label: string;
    description: string;
    icon: LucideIcon;
    badge: string;
    isSelected: boolean;
    onSelect: (value: string) => void;
    colorScheme: 'green' | 'blue' | 'purple';
    isDarkMode: boolean;
  }
  export interface WalletDetailsFormProps {
    walletPhone: string;
    setWalletPhone: (phone: string) => void;
    isDarkMode: boolean;
  }

  export interface FormInputProps {
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    helperText?: string;
    pattern?: string;
    maxLength?: number;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url' | 'search' | 'none' | 'decimal';
    isDarkMode?: boolean;
  }
  export interface FormSelectProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ key: string; label: string }> | string[];
    placeholder?: string;
    isDarkMode?: boolean;
  }
  export interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  }

  export interface ShippingFormProps {
    shippingAddress: ShippingAddress;
    setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
    governorate: string;
    setGovernorate: React.Dispatch<React.SetStateAction<string>>;
    governorates: Array<{ key: string; label: string }>;
    onSubmit: (e: React.FormEvent) => void;
    isDarkMode: boolean;
  }