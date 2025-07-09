# slottify 🧩

A minimal and fast JavaScript template engine with pipe-style modifiers.

---

## 📝 Todo
- [ ] Compiler
- [ ] Cache intermediate results between pipes

## ✨ Features

- Easy syntax with `{{ variable | filter }}` support
- Lightweight, no dependencies
- Simple JavaScript object-based rendering

---

## 📍 Example
```js
const template = 'Hello {{ var.foo | upper }}'

render(template, { foo: 'world' })
// Output: Hello WORLD
```

## 🔧 Installation

```bash
npm install slotify
```