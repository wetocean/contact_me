import { describe, it, expect } from 'vitest';

describe('Email Validation', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('should accept valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@example.com',
      'user+tag@example.co.uk',
      'user_123@test-domain.com',
    ];

    validEmails.forEach((email) => {
      expect(emailRegex.test(email)).toBe(true);
    });
  });

  it('should reject invalid email addresses', () => {
    const invalidEmails = [
      'invalid',
      '@example.com',
      'user@',
      'user @example.com',
      'user@.com',
      'user@domain',
      '',
    ];

    invalidEmails.forEach((email) => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });
});

describe('Price Validation', () => {
  it('should accept valid positive numbers', () => {
    const validPrices = ['100', '1000', '50000.50', '999999'];

    validPrices.forEach((priceStr) => {
      const price = parseFloat(priceStr);
      expect(isNaN(price)).toBe(false);
      expect(price).toBeGreaterThan(0);
    });
  });

  it('should reject invalid prices', () => {
    const invalidPrices = ['-100', '0', '-50', 'abc', ''];

    invalidPrices.forEach((priceStr) => {
      const price = parseFloat(priceStr);
      expect(isNaN(price) || price <= 0).toBe(true);
    });
  });
});

describe('Required Fields Validation', () => {
  type ContactData = {
    domainName?: string;
    price?: string;
    name?: string;
    email?: string;
  };

  const hasRequiredFields = (data: ContactData): boolean => {
    return !!(data.domainName && data.price && data.name && data.email);
  };

  it('should pass when all required fields are present', () => {
    const validData: ContactData = {
      domainName: 'example.com',
      price: '1000',
      name: 'John Doe',
      email: 'john@example.com',
    };

    expect(hasRequiredFields(validData)).toBe(true);
  });

  it('should fail when any required field is missing', () => {
    const testCases: ContactData[] = [
      { price: '1000', name: 'John', email: 'john@example.com' }, // missing domainName
      { domainName: 'test.com', name: 'John', email: 'john@example.com' }, // missing price
      { domainName: 'test.com', price: '1000', email: 'john@example.com' }, // missing name
      { domainName: 'test.com', price: '1000', name: 'John' }, // missing email
      {}, // all missing
    ];

    testCases.forEach((data) => {
      expect(hasRequiredFields(data)).toBe(false);
    });
  });
});

describe('Domain Name Validation', () => {
  it('should accept valid domain names', () => {
    const validDomains = [
      'example.com',
      'test-domain.com',
      'sub.domain.com',
      'example.co.uk',
      'my-site123.com',
    ];

    validDomains.forEach((domain) => {
      expect(domain.length).toBeGreaterThan(0);
      expect(domain).toMatch(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/);
    });
  });
});

describe('Currency Formatting', () => {
  it('should format prices correctly', () => {
    const testCases = [
      { input: 1000, expected: '1,000.00' },
      { input: 50000, expected: '50,000.00' },
      { input: 999.99, expected: '999.99' },
    ];

    testCases.forEach(({ input, expected }) => {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(input);
      
      // Check that it starts with $ and contains the expected value
      expect(formatted).toMatch(/^\$/);
      expect(formatted).toContain(expected);
    });
  });
});
