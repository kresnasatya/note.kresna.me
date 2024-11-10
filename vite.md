---
title: Vite
outline: deep
---

# Vite

De facto front-end tooling.

## Alias

I set `alias` in order to resolve directory `assets` and `icons` inside `src` directory. So, I don't need to load with `...` notation.

```js
// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets'),
      '@icons': resolve(__dirname, 'src/assets/icons')
    }
  }
})
```