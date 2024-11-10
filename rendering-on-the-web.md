---
title: Rendering on the Web
outline: deep
---

# Rendering on the Web

There are many rendering mode in web development: Server Side Rendering (SSR), Static Site Generator (SSG), Client Side Rendering (CSR), Hydration, Partial Hydration, and Island Architecture.

> This site use Static Site Generator (SSG) rendering mode. For example, Astro convert the markdown and necessary assets into static HTML file.

In this section, I would like to focus on discussing Hydration and Island Architecture.

## Hydration

Dan Abramov, the maintainer of ReactJS give the simple term of Hydration.

> *Hydration is like watering the “dry” HTML with the “water” of interactivity and event handlers.*

## Island Architecture

Jason Miller, the creator of PreactJS gives the term of Island Architecture. In my opinion, The Island Architecture bring the same concept with Hydration: render HTML pages on server then inject placeholders or slots highly dynamic regions. Here's the more detail.

> *The general idea of an “Islands” architecture is deceptively simple: render HTML pages on the server, and inject placeholders or slots around highly dynamic regions. These placeholders/slots contain the server-rendered HTML output from their corresponding widget. They denote regions that can then be "hydrated" on the client into small self-contained widgets, reusing their server-rendered initial HTML.*

> *You can think of this like a static HTML document that contains multiple separate embedded applications.*

![Island Architecture on Web Page](./images/islands-architecture.png)