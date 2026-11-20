# 3D WebGL Visual Design & Aesthetics Guide
*A comprehensive breakdown of modern interactive 3D web experiences, curated from Atmos (Leeroy), Robin Payot, Panasonic DSR, and Savic Motorcycles.*

---

## Executive Overview: The 4 Paradigms of Modern 3D Web Design

| Website | Aesthetic Paradigm | Primary Metaphor | Signature Tech / Shaders |
| :--- | :--- | :--- | :--- |
| **[Atmos (Leeroy)](https://atmos.leeroy.ca)** | Surrealist Claymorphism | Weightless aerial flight | Three.js, diffuse clay materials, film grain post-processing, procedural volumetric clouds |
| **[Robin Payot](https://robinpayot.com)** | Avant-Garde Spatial Brutalism | 3D spline roller-coaster & particle galaxy | Custom WebGL, halftone dot shaders, stipple dithering, extruded 3D typography, dual-camera system |
| **[Panasonic DSR](https://www2.panasonic.biz/jp/dsr/index/)** | Tactile Skeuomorphism & Architectural Depth | Physical 3D index-card container | Multi-canvas WebGL + CSS 3D matrix transforms, Z-depth card stacking, real-time photometric lighting simulation |
| **[Savic Motorcycles](https://www.savicmotorcycles.com/pages/brochure)** | Photorealistic Industrial Retro-Futurism | Virtual showroom & interactive configurator | Real-time PBR shaders, dynamic camera orbit, augmented reality (AR) projection, auto-generated tailored brochure |

---

## 1. ATMOS by Leeroy
**URL**: [atmos.leeroy.ca](https://atmos.leeroy.ca)  
**Style**: *Surrealist Flight Experiment / Soft Tactile Dreamscape*

### Visual Language & Tone
* **Vibe**: High-fashion, serene, weightless, and contemplative.
* **Palette**:
  * Sky Blue / Ultramarine: `#1B3BFF` to `#547BFF` (primary atmospheric gradient)
  * Lavender / Cloud Mist: `#C5CEF8` to `#EBEFFF`
  * Pure Cloud White: `#FFFFFF`
  * Organic full-screen film grain / noise overlay giving an analog, non-digital texture.
* **Typography & UI Overlay**:
  * High-contrast Didone / modern editorial serif for the hero title (`ATMOS`).
  * Micro-typography: lightweight geometric sans-serif with wide letter-spacing (`Scroll to begin the journey`).
  * Circular rotating badges and subtle sound visualizer toggles pinned cleanly to viewport edges.

### 3D & WebGL Architecture
* **Engine**: Three.js (r141) on a full-screen `<canvas>`.
* **3D Geometry & Materials**:
  * Stylized claymorphic aircraft with a sweeping procedural smoke contrail.
  * Soft procedural volumetric cloud clusters rendered with matte diffuse shading (resembling porcelain or soft resin rather than shiny plastic).
* **Interactivity & Camera Motion**:
  * **Scroll-driven flight timeline**: Scrolling moves the camera along a vertical flight trajectory through clouds, punctuated by seamless whiteout/fog transitions between narrative chapters.
  * Interactive mouse parallax and ambient soundscape integration.

---

## 2. Robin Payot — Creative Developer Portfolio
**URL**: [robinpayot.com](https://robinpayot.com)  
**Style**: *Spatial Creative Brutalism / Generative Dither & Spline*

### Visual Language & Tone
* **Vibe**: Minimalist French creative developer showcase, spatial gallery, experimental yet highly refined.
* **Palette**:
  * Soft icy sky blue gradient: `#A6C6F7` fading to warm off-white `#F5F7FA`
  * Contrast accents: Peach/Coral `#FFB088` and Periwinkle `#7A9EFF`
  * Structural monochrome: Deep charcoal `#111111` and neutral grey `#666666`
* **Typography & UI Overlay**:
  * Clean, uppercase grotesque sans-serif with wide tracking (`ROBIN PAYOT`, `SENIOR CREATIVE DEVELOPER`).
  * Heads-Up Display (HUD) anchored at the 4 screen corners (`PROJECTS`, `ROAD`, `OVERVIEW`, `LIST`).

### 3D & WebGL Architecture
* **Engine**: Custom WebGL / Three.js pipeline (`scene__canvas`).
* **Shaders & Graphical Elements**:
  * Monumental 3D extruded lettering (`PROJECTS`) rendered in world space with real-time halftone dot mapping and dynamic wave ripples.
  * Floating procedural spheres with stippled dither noise shaders, marble textures, and chrome reflections.
  * Ground particle grid receding into infinite horizon.
* **Camera Paradigm**:
  * **ROAD Mode**: First-person camera following a continuous 3D mathematical spline curve, swooping through the space as the user scrolls.
  * **OVERVIEW Mode**: Seamless transition into an orthographic top-down schematic map showing the entire winding spline track and particle galaxies.

---

## 3. Panasonic Electrical Equipment Digital Showroom (電気設備BOX)
**URL**: [www2.panasonic.biz/jp/dsr/index/](https://www2.panasonic.biz/jp/dsr/index/)  
**Style**: *Tactile Skeuomorphism & Architectural Editorial*

### Visual Language & Tone
* **Vibe**: Warm, orderly Japanese modern architecture; human-centered and tactile.
* **Palette**:
  * Linen / Off-White: `#F4F3EE`
  * Slate Blue: `#4D759F`
  * Terracotta / Warm Clay: `#A36A3E`
  * Crisp Charcoal Line-art: `#222222`
* **Typography & UI Overlay**:
  * Japanese Modern Gothic & Mincho serif headers with vertical reading cues (`SCROLL →`).
  * Minimal geometric Latin labels, clean dividers, and isometric preloader cubes.

### 3D & WebGL Architecture
* **Engine**: Hybrid WebGL multi-canvas + CSS 3D transforms.
* **The "Index Card Box" Metaphor**:
  * Replaces standard vertical scrolling with a physical 3D box of stacked catalog cards.
  * Scrolling slides cards along the Z-axis, dropping them into depth with natural perspective foreshortening and realistic soft shadows.
* **Architectural Simulation Showroom**:
  * Features an interactive lighting simulator allowing users to visualize photometric light dispersion, indirect cove lighting, and downlight variations across modern living spaces.

---

## 4. Savic Motorcycles (Interactive 3D Brochure)
**URL**: [savicmotorcycles.com/pages/brochure](https://www.savicmotorcycles.com/pages/brochure)  
**Style**: *High-Performance Industrial Retro-Futurism / Real-Time PBR Configurator*

### Visual Language & Tone
* **Vibe**: Raw mechanical honesty of 1970s café racers fused with clean electric vehicle engineering; high-end luxury studio atmosphere.
* **Palette**:
  * Monochromatic base: Deep pitch black `#000000`, matte graphite `#1A1A1A`, and stark white `#FFFFFF`.
  * Metallic finishes: Radiate Aluminum, polished chrome, and brushed gunmetal.
  * Natural warmth: Cognac/tan vegan-leather seat accents and warm rim lighting.
* **Typography & UI Overlay**:
  * Heavyweight geometric sans-serif for confident product titles, mirroring the muscular stance of the electric powertrain.
  * Technical monospaced body type for torque, battery capacity, range, and pricing specs.

### 3D & WebGL Architecture
* **Engine**: High-fidelity WebGL real-time 3D showroom (developed with Future Perfect Digital).
* **Physically Based Rendering (PBR)**:
  * Accurate micro-roughness, specular reflections, cast aluminum textures, and anisotropic highlights on wheels and battery casing.
* **Functional Configurator Pipeline**:
  * Real-time 360° camera orbit and inspect controls.
  * Instant customization of finishes, battery tiers, and suspension packages.
  * **Augmented Reality (AR)**: WebAR projection allowing potential buyers to view the 1:1 scale motorcycle model in their own space.
  * **Dynamic Brochure Generation**: Generates a tailored digital brochure with custom renders from the exact camera view and selected options.

---

## Key Design Principles to Apply to Your Projects

1. **The Scroll-as-Timeline Pattern**:
   Instead of traditional page scrolling, treat scroll distance as an interpolation factor $t \in [0, 1]$ driving a 3D camera along a Catmull-Rom or Bezier spline path.
2. **Textural Shaders vs. Generic Gloss**:
   Add texture shaders (halftone dot screens, stippled dithering, subtle noise, or clay diffuse shaders) to avoid the generic "video game" or "CAD" look.
3. **The Minimalist HUD**:
   Anchor UI controls to the four viewport corners (branding top-left, menu top-right, audio bottom-left, pagination/scroll status bottom-right), leaving the center completely unobstructed for the 3D scene.
4. **Interactive Utility**:
   Combine visual spectacle with practical utility (such as Savic's real-time color/part configurator or Panasonic's lighting simulator).
