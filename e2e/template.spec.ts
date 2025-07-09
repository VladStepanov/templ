import { describe, test, expect } from 'vitest';
import { render } from '../src';

describe('template', () => {
  test('should handle template without interpolation', () => {
    expect(render('foo bar')).string('foo bar');
  });

  test('should render template with vars', () => {
    expect(
      render('{{ var.name }}', { name: 'foo' }),
    ).string('foo');
  });

  test('should render template with upper pipe', () => {
    expect(
      render('{{ var.name | upper }}', { name: 'foo' }),
    ).string('FOO');
  });

  test('should render template with lower pipe', () => {
    expect(
      render('{{ var.name | lower }}', { name: 'FOO' }),
    ).string('foo');
  });

  test('should render template with includes pipe', () => {
    expect(
      render('foo {{ var.name | includes "bar" ? "1" : "2" }}', { name: 'bar' }),
    ).string('foo 1');
  });

  test.for(['"', '\''])('should ignore pipe symbol in literals inside %s quotes', ([quote]) => {
    expect(
      render(`foo {{ ${quote}| test${quote} | upper }}`),
    ).string('foo | TEST');
  });
});
