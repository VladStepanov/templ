import { beforeEach, describe, expect, it } from 'vitest';
import { TemplateEngine } from './template-engine.ts';

describe('TemplateEngine', () => {
  let engine: TemplateEngine;

  beforeEach(() => {
    engine = new TemplateEngine();
  });

  describe('Basic Rendering', () => {
    it('should render plain text', () => {
      const result = engine.render('Hello World');
      expect(result).toBe('Hello World');
    });

    it('should render variable substitution', () => {
      const result = engine.render('Hello {{ name }}!', { name: 'John' });
      expect(result).toBe('Hello John!');
    });

    it('should handle missing variables', () => {
      const result = engine.render('Hello {{ name }}!');
      expect(result).toBe('Hello !');
    });

    it('should render multiple variables', () => {
      const result = engine.render('{{ greeting }} {{ name }}!', {
        greeting: 'Hello',
        name: 'World',
      });
      expect(result).toBe('Hello World!');
    });
  });

  describe('Filter Rendering', () => {
    it('should apply lower filter', () => {
      const result = engine.render('{{ name | lower }}', { name: 'JOHN' });
      expect(result).toBe('john');
    });

    it('should apply upper filter', () => {
      const result = engine.render('{{ name | upper }}', { name: 'john' });
      expect(result).toBe('JOHN');
    });

    it('should apply includes filter', () => {
      const result = engine.render('{{ name | includes \'oh\' }}', { name: 'john' });
      expect(result).toBe('true');
    });

    it('should chain filters', () => {
      const result = engine.render('{{ name | lower | upper }}', { name: 'John' });
      expect(result).toBe('JOHN');
    });

    it('should apply filter with arguments', () => {
      const result = engine.render('{{ name | includes \'jo\' }}', { name: 'john' });
      expect(result).toBe('true');
    });

    it('should throw error for unknown filter', () => {
      expect(() => {
        engine.render('{{ name | unknown }}', { name: 'john' });
      }).toThrow('Unknown filter: unknown');
    });
  });

  describe('Ternary Rendering', () => {
    it('should render true branch', () => {
      const result = engine.render('{{ condition ? \'yes\' : \'no\' }}', { condition: true });
      expect(result).toBe('yes');
    });

    it('should render false branch', () => {
      const result = engine.render('{{ condition ? \'yes\' : \'no\' }}', { condition: false });
      expect(result).toBe('no');
    });

    it('should handle truthy values', () => {
      const result = engine.render('{{ name ? \'has name\' : \'no name\' }}', { name: 'John' });
      expect(result).toBe('has name');
    });

    it('should handle falsy values', () => {
      const result = engine.render('{{ name ? \'has name\' : \'no name\' }}', { name: '' });
      expect(result).toBe('no name');
    });
  });

  describe('Complex Expressions', () => {
    it('should handle the original example', () => {
      const template = 'Hello {{ name | lower | includes \'peter\' ? \'no peter!\' : name }}!';

      const result1 = engine.render(template, { name: 'Peter' });
      expect(result1).toBe('Hello no peter!!');

      const result2 = engine.render(template, { name: 'John' });
      expect(result2).toBe('Hello John!');
    });

    it('should handle filters in ternary expressions', () => {
      const template = '{{ name | lower ? name | upper : \'empty\' }}';

      const result1 = engine.render(template, { name: 'john' });
      expect(result1).toBe('JOHN');

      const result2 = engine.render(template, { name: '' });
      expect(result2).toBe('empty');
    });
  });

  describe('Custom Filters', () => {
    it('should add custom filter', () => {
      engine.addFilter('capitalize', (value: any) => {
        const str = String(value);
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      });

      const result = engine.render('{{ name | capitalize }}', { name: 'jOHN' });
      expect(result).toBe('John');
    });

    it('should list available filters', () => {
      const filters = engine.getFilters();
      expect(filters).toContain('lower');
      expect(filters).toContain('upper');
      expect(filters).toContain('includes');
    });

    it('should add filter with multiple arguments', () => {
      engine.addFilter('replace', (value: any, search: any, replace: any) => {
        return String(value).replace(String(search), String(replace));
      });

      const result = engine.render('{{ text | replace \'world\' \'universe\' }}', {
        text: 'hello world',
      });
      expect(result).toBe('hello universe');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty templates', () => {
      const result = engine.render('');
      expect(result).toBe('');
    });

    it('should handle templates with only text', () => {
      const result = engine.render('No templates here');
      expect(result).toBe('No templates here');
    });

    it('should handle consecutive templates', () => {
      const result = engine.render('{{ a }}{{ b }}', { a: 'Hello', b: 'World' });
      expect(result).toBe('HelloWorld');
    });

    it('should handle templates at start and end', () => {
      const result = engine.render('{{ start }} middle {{ end }}', {
        start: 'BEGIN',
        end: 'END',
      });
      expect(result).toBe('BEGIN middle END');
    });

    it('should convert non-string values to strings', () => {
      const result = engine.render('{{ number }}', { number: 42 });
      expect(result).toBe('42');
    });
  });
});
