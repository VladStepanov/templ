import { TemplateEngine } from '../src';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Integration Tests', () => {
  let engine: TemplateEngine;

  beforeEach(() => {
    engine = new TemplateEngine();
  });

  it('should render template without interpolation', () => {
    expect(engine.render('foo bar')).toEqual('foo bar');
  });

  it('should render template with vars', () => {
    expect(
      engine.render('{{ name }}', { name: 'foo' }),
    ).toEqual('foo');
  });

  it('should render template without spaces', () => {
    expect(
      engine.render('{{name}}', { name: 'foo' }),
    ).toEqual('foo');
  });

  it('should render template with upper pipe', () => {
    expect(
      engine.render('{{ name | upper }}', { name: 'foo' }),
    ).toEqual('FOO');
  });

  it('should render template with lower pipe', () => {
    expect(
      engine.render('{{ name | lower }}', { name: 'FOO' }),
    ).toEqual('foo');
  });

  it('should render template with includes pipe', () => {
    expect(
      engine.render('foo {{ name | includes "bar" ? "1" : "2" }}', { name: 'bar 123' }),
    ).toEqual('foo 1');
  });

  it.for(['"', '\''])('should ignore pipe symbol in literals inside %s quotes', ([quote]) => {
    expect(
      engine.render(`foo {{ ${quote}| test${quote} }}`),
    ).toEqual('foo | test');
  });

  it('should work with complex template with custom filters', () => {
    const template = `
      Welcome {{ name | capitalize }}!
      {{ isAdmin ? 'You have admin privileges' : 'Regular user access' }}
      Last login: {{ lastLogin | formatDate }}
    `.trim();

    // Mock formatDate filter
    engine.addFilter('formatDate', (value: any) => {
      return new Date(value).toISOString();
    });

    engine.addFilter('capitalize', (value: any) => {
      const str = String(value);
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    });

    const context = {
      name: 'john doe',
      isAdmin: true,
      lastLogin: '2023-01-01',
    };

    const result = engine.render(template, context);
    expect(result).toContain('Welcome John doe!');
    expect(result).toContain('You have admin privileges');
    expect(result).toContain('Last login: 2023-01-01T00:00:00.000Z');
  });
});
