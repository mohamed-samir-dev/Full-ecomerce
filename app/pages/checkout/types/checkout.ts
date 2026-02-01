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
  }
  export interface PaymentFormProps {
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    onBack: () => void;
    onSubmit: () => void;
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
  }
  export interface PriceDetailsProps {
    subtotal: number;
    shipping: number;
    tax: number;
    finalTotal: number;
    deliveryDateStr: string;
  }
  export interface CardDetailsFormProps {
    cardDetails: { number: string; name: string; expiry: string; cvv: string };
    setCardDetails: (details: { number: string; name: string; expiry: string; cvv: string }) => void;
  }
  export interface OrderNotesSectionProps {
    notes: string;
    setNotes: (notes: string) => void;
    isLoading: boolean;
    onBack: () => void;
    onSubmit: () => void;
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
  }
  export interface WalletDetailsFormProps {
    walletPhone: string;
    setWalletPhone: (phone: string) => void;
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
  }
  export interface FormSelectProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
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
    governorates: string[];
    onSubmit: (e: React.FormEvent) => void;
  }