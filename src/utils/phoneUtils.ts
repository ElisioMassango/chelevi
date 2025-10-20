// Phone number utilities for Chelevi
// WhatsApp phone number validation and formatting

// WhatsApp phone number validation
export function validateWhatsAppNumber(phone: string): boolean {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid length (7-15 digits)
  if (cleanPhone.length < 7 || cleanPhone.length > 15) {
    return false;
  }
  
  // Check if it starts with a valid country code or local number
  // Mozambique numbers: +258 or 8X, 2X, 3X, 4X, 5X, 6X, 7X
  if (cleanPhone.startsWith('258')) {
    // International format with country code
    const localNumber = cleanPhone.substring(3);
    return /^[2-7]\d{8}$/.test(localNumber);
  } else if (cleanPhone.startsWith('8') || cleanPhone.startsWith('2') || 
             cleanPhone.startsWith('3') || cleanPhone.startsWith('4') || 
             cleanPhone.startsWith('5') || cleanPhone.startsWith('6') || 
             cleanPhone.startsWith('7')) {
    // Local format
    return /^[2-7]\d{8}$/.test(cleanPhone);
  }
  
  return false;
}

// Format phone number for WhatsApp
export function formatPhoneForWhatsApp(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // If it starts with 258, it's already in international format
  if (cleanPhone.startsWith('258')) {
    return cleanPhone;
  }
  
  // If it's a local number, add Mozambique country code
  if (cleanPhone.length === 9 && /^[2-7]\d{8}$/.test(cleanPhone)) {
    return `258${cleanPhone}`;
  }
  
  // If it's already 12 digits and starts with 258, return as is
  if (cleanPhone.length === 12 && cleanPhone.startsWith('258')) {
    return cleanPhone;
  }
  
  return cleanPhone;
}

// Format phone number for display
export function formatPhoneForDisplay(phone: string): string {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  // If it's in international format (258XXXXXXXXX)
  if (cleanPhone.startsWith('258') && cleanPhone.length === 12) {
    const localNumber = cleanPhone.substring(3);
    return `+258 ${localNumber.substring(0, 3)} ${localNumber.substring(3, 6)} ${localNumber.substring(6)}`;
  }
  
  // If it's a local number (XXXXXXXXX)
  if (cleanPhone.length === 9) {
    return `+258 ${cleanPhone.substring(0, 3)} ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6)}`;
  }
  
  return phone;
}

// Validate phone number for general use
export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid length
  if (cleanPhone.length < 7 || cleanPhone.length > 15) {
    return false;
  }
  
  // Check if it contains only digits
  return /^\d+$/.test(cleanPhone);
}

// Get phone number error message
export function getPhoneErrorMessage(phone: string): string {
  if (!phone) return 'Número de telefone é obrigatório';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length < 7) {
    return 'Número de telefone muito curto';
  }
  
  if (cleanPhone.length > 15) {
    return 'Número de telefone muito longo';
  }
  
  if (!/^\d+$/.test(cleanPhone)) {
    return 'Número de telefone deve conter apenas dígitos';
  }
  
  // Check Mozambique number format
  if (cleanPhone.startsWith('258')) {
    const localNumber = cleanPhone.substring(3);
    if (!/^[2-7]\d{8}$/.test(localNumber)) {
      return 'Formato de número inválido para Moçambique';
    }
  } else if (cleanPhone.length === 9) {
    if (!/^[2-7]\d{8}$/.test(cleanPhone)) {
      return 'Formato de número inválido para Moçambique';
    }
  }
  
  return '';
}

// Check if phone number is WhatsApp compatible
export function isWhatsAppCompatible(phone: string): boolean {
  return validateWhatsAppNumber(phone);
}

// Get WhatsApp error message
export function getWhatsAppErrorMessage(phone: string): string {
  if (!phone) return 'Número de WhatsApp é obrigatório';
  
  if (!validateWhatsAppNumber(phone)) {
    return 'Número de WhatsApp inválido. Use formato: +258 8X XXX XXX ou 8X XXX XXX';
  }
  
  return '';
}
