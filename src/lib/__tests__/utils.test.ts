import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('base', 'additional')).toBe('base additional');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', { 'conditional': true })).toBe('base conditional');
    expect(cn('base', { 'conditional': false })).toBe('base');
  });

  it('should handle multiple conditional classes', () => {
    expect(cn('base', { 'cond1': true, 'cond2': false })).toBe('base cond1');
  });

  it('should handle undefined and null values', () => {
    expect(cn('base', undefined, null)).toBe('base');
  });

  it('should handle empty strings', () => {
    expect(cn('base', '')).toBe('base');
  });
}); 