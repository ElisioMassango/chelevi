// Phone number utilities for Chelevi
// WhatsApp phone number validation and formatting

// WhatsApp phone number validation - Supports Mozambique and Portugal
export function validateWhatsAppNumber(phone: string): boolean {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid length (7-15 digits)
  if (cleanPhone.length < 7 || cleanPhone.length > 15) {
    return false;
  }
  
  // Mozambique numbers: +258 or 8X, 2X, 3X, 4X, 5X, 6X, 7X
  if (cleanPhone.startsWith('258')) {
    // International format with Mozambique country code
    const localNumber = cleanPhone.substring(3);
    // Mozambique mobile numbers can start with 2-8 (8 is most common for WhatsApp)
    return /^[2-8]\d{8}$/.test(localNumber);
  } else if (cleanPhone.startsWith('351')) {
    // International format with Portugal country code
    const localNumber = cleanPhone.substring(3);
    // Portugal mobile numbers start with 9 and have 9 digits total
    return /^9\d{8}$/.test(localNumber);
  } else if (cleanPhone.length === 9) {
    // Local format - check if it's Mozambique or Portugal
    // Mozambique: starts with 2-8 (8 is most common for WhatsApp)
    if (/^[2-8]\d{8}$/.test(cleanPhone)) {
      return true;
    }
    // Portugal: starts with 9
    if (/^9\d{8}$/.test(cleanPhone)) {
      return true;
    }
  }
  
  return false;
}

// Format phone number for WhatsApp - Supports Mozambique and Portugal
// API expects: +258XXXXXXXXX (with + and country code)
// This function normalizes all formats to +258XXXXXXXXX for Mozambique
export function formatPhoneForWhatsApp(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '').trim();
  
  // Remove + if present for processing
  let digitsOnly = cleanPhone.replace(/\+/g, '');
  
  // Handle Mozambique numbers (258)
  if (digitsOnly.startsWith('258') && digitsOnly.length === 12) {
    // Already has country code 258, add + prefix
    return `+${digitsOnly}`;
  }
  
  // If it's a local Mozambique number (9 digits starting with 2-8)
  if (digitsOnly.length === 9 && /^[2-8]\d{8}$/.test(digitsOnly)) {
    // Add country code 258 with + prefix
    return `+258${digitsOnly}`;
  }
  
  // If it already has +258, return as is
  if (cleanPhone.startsWith('+258')) {
    return cleanPhone;
  }
  
  // Handle Portugal numbers (351)
  if (digitsOnly.startsWith('351') && digitsOnly.length === 12) {
    // Already has country code 351, add + prefix if not present
    if (cleanPhone.startsWith('+351')) {
      return cleanPhone;
    }
    return `+${digitsOnly}`;
  }
  
  // If it's a local Portugal number (9 digits starting with 9)
  if (digitsOnly.length === 9 && /^9\d{8}$/.test(digitsOnly)) {
    return `+351${digitsOnly}`;
  }
  
  // If it already has +351, return as is
  if (cleanPhone.startsWith('+351')) {
    return cleanPhone;
  }
  
  // If we can't determine the format, try to add +258 for Mozambique (most common)
  // This handles edge cases where the number might be in an unexpected format
  if (digitsOnly.length >= 9 && digitsOnly.length <= 12) {
    // If it looks like a Mozambique number (starts with 2-8 and has 9+ digits)
    if (/^[2-8]/.test(digitsOnly)) {
      // Extract last 9 digits if it's longer
      const localNumber = digitsOnly.slice(-9);
      if (/^[2-8]\d{8}$/.test(localNumber)) {
        return `+258${localNumber}`;
      }
    }
  }
  
  // Return as is if we can't determine the format (fallback)
  return digitsOnly;
}

// Format phone number for display
export function formatPhoneForDisplay(phone: string): string {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  // If it's in international format Mozambique (258XXXXXXXXX)
  if (cleanPhone.startsWith('258') && cleanPhone.length === 12) {
    const localNumber = cleanPhone.substring(3);
    return `+258 ${localNumber.substring(0, 2)} ${localNumber.substring(2, 5)} ${localNumber.substring(5)}`;
  }
  
  // If it's in international format Portugal (351XXXXXXXXX)
  if (cleanPhone.startsWith('351') && cleanPhone.length === 12) {
    const localNumber = cleanPhone.substring(3);
    return `+351 ${localNumber.substring(0, 3)} ${localNumber.substring(3, 6)} ${localNumber.substring(6)}`;
  }
  
  // If it's a local Mozambique number (9 digits starting with 2-8)
  if (cleanPhone.length === 9 && /^[2-8]\d{8}$/.test(cleanPhone)) {
    return `+258 ${cleanPhone.substring(0, 2)} ${cleanPhone.substring(2, 5)} ${cleanPhone.substring(5)}`;
  }
  
  // If it's a local Portugal number (9 digits starting with 9)
  if (cleanPhone.length === 9 && /^9\d{8}$/.test(cleanPhone)) {
    return `+351 ${cleanPhone.substring(0, 3)} ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6)}`;
  }
  
  return phone;
}

// Validate phone number for general use - Supports Mozambique and Portugal
export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid length
  if (cleanPhone.length < 7 || cleanPhone.length > 15) {
    return false;
  }
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cleanPhone)) {
    return false;
  }
  
  // Validate Mozambique numbers
  if (cleanPhone.startsWith('258')) {
    const localNumber = cleanPhone.substring(3);
    // Mozambique mobile numbers can start with 2-8 (8 is most common for WhatsApp)
    return /^[2-8]\d{8}$/.test(localNumber);
  }
  
  // Validate Portugal numbers
  if (cleanPhone.startsWith('351')) {
    const localNumber = cleanPhone.substring(3);
    return /^9\d{8}$/.test(localNumber);
  }
  
  // Validate local format (9 digits)
  if (cleanPhone.length === 9) {
    // Mozambique: starts with 2-8 (8 is most common for WhatsApp)
    if (/^[2-8]\d{8}$/.test(cleanPhone)) {
      return true;
    }
    // Portugal: starts with 9
    if (/^9\d{8}$/.test(cleanPhone)) {
      return true;
    }
  }
  
  // Accept other international formats (7-15 digits)
  return cleanPhone.length >= 7 && cleanPhone.length <= 15;
}

// Get phone number error message - Supports Mozambique and Portugal
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
    // Mozambique mobile numbers can start with 2-8 (8 is most common for WhatsApp)
    if (!/^[2-8]\d{8}$/.test(localNumber)) {
      return 'Formato de número inválido para Moçambique';
    }
  }
  
  // Check Portugal number format
  if (cleanPhone.startsWith('351')) {
    const localNumber = cleanPhone.substring(3);
    if (!/^9\d{8}$/.test(localNumber)) {
      return 'Formato de número inválido para Portugal';
    }
  }
  
  // Check local format (9 digits)
  if (cleanPhone.length === 9) {
    // Mozambique: starts with 2-8 (8 is most common for WhatsApp)
    // Portugal: starts with 9
    if (!/^[2-8]\d{8}$/.test(cleanPhone) && !/^9\d{8}$/.test(cleanPhone)) {
      return 'Formato inválido. Use: Moçambique (+258 8X XXX XXX) ou Portugal (+351 9XX XXX XXX)';
    }
  }
  
  return '';
}

// Check if phone number is WhatsApp compatible
export function isWhatsAppCompatible(phone: string): boolean {
  return validateWhatsAppNumber(phone);
}

// Validate M-Pesa phone number (Mozambique only, format: 8X XXXXXXX)
export function validateMpesaNumber(phone: string): boolean {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Must be exactly 9 digits
  if (cleanPhone.length !== 9) {
    return false;
  }
  
  // Must start with 8 (M-Pesa numbers in Mozambique)
  if (!cleanPhone.startsWith('8')) {
    return false;
  }
  
  // Second digit should be 2-7 (84, 85, 86, 87, etc.)
  const secondDigit = parseInt(cleanPhone[1]);
  if (secondDigit < 2 || secondDigit > 7) {
    return false;
  }
  
  return true;
}

// Get M-Pesa phone number error message
export function getMpesaErrorMessage(phone: string): string {
  if (!phone) return 'Número M-Pesa é obrigatório';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 0) {
    return 'Digite o número M-Pesa';
  }
  
  if (cleanPhone.length < 9) {
    return 'Número M-Pesa deve ter 9 dígitos';
  }
  
  if (cleanPhone.length > 9) {
    return 'Número M-Pesa deve ter exatamente 9 dígitos';
  }
  
  if (!cleanPhone.startsWith('8')) {
    return 'Número M-Pesa deve começar com 8';
  }
  
  const secondDigit = parseInt(cleanPhone[1]);
  if (secondDigit < 2 || secondDigit > 7) {
    return 'Formato inválido. Use: 8X XXXXXXX (ex: 84 123 4567)';
  }
  
  return '';
}

// Format M-Pesa number for display (8X XXXXXXX)
export function formatMpesaNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Limit to 9 digits
  const limited = cleanPhone.substring(0, 9);
  
  // Format: 8X XXXXXXX
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.substring(0, 2)} ${limited.substring(2)}`;
  } else {
    return `${limited.substring(0, 2)} ${limited.substring(2, 5)} ${limited.substring(5)}`;
  }
}

// Get WhatsApp error message - Supports Mozambique and Portugal
export function getWhatsAppErrorMessage(phone: string): string {
  if (!phone) return 'Número de WhatsApp é obrigatório';
  
  if (!validateWhatsAppNumber(phone)) {
    return 'Número de WhatsApp inválido. Use: Moçambique (+258 8X XXX XXX) ou Portugal (+351 9XX XXX XXX)';
  }
  
  return '';
}
