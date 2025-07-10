import { render } from '../src';

describe('template', () => {
  test('should render template without interpolation', () => {
    expect(render('foo bar')).string('foo bar');
  });

  test('should render template with vars', () => {
    expect(
      render('{{ var.name }}', { name: 'foo' }),
    ).toEqual('foo');
  });

  test('should render template with upper pipe', () => {
    expect(
      render('{{ var.name | upper }}', { name: 'foo' }),
    ).toEqual('FOO');
  });

  test('should render template with lower pipe', () => {
    expect(
      render('{{ var.name | lower }}', { name: 'FOO' }),
    ).toEqual('foo');
  });

  test('should render template with includes pipe', () => {
    expect(
      render('foo {{ var.name | includes "bar" ? "1" : "2" }}', { name: 'bar 123' }),
    ).toEqual('foo 1');
  });

  test.for(['"', '\''])('should ignore pipe symbol in literals inside %s quotes', ([quote]) => {
    expect(
      render(`foo {{ ${quote}| test${quote} | upper }}`),
    ).toEqual('foo | TEST');
  });

  test('should handle fallbacks with vars', () => {
    expect(
      render('foo {{ var.foo ?? var.foo2 }}', { foo2: 'foo2' }),
    ).toEqual('foo foo2');
  });

  test('should handle mixed fallbacks', () => {
    expect(
      render(`foo {{ var.foo ?? var.foo2 ?? 'default' }}`),
    ).toEqual('foo default');
  });

  test('should handle if fallbacks returns nothing', () => {
    expect(
      render(`foo{{ var.foo ?? var.foo2 }}`),
    ).toEqual('foo');
  });

  test('should handle pipes and fallbacks mixed', () => {
    expect(
      render(`foo{{ var.foo ?? var.foo2 | upper }}`, { foo2: 'foo2' }),
    ).toEqual('fooFOO2');
  });
});
