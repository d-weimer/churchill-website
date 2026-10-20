# Thomas E. Churchill III Portfolio Website

A responsive mobile-first web application capturing the navigation, layout, and scrolling experience of the A24 website. Features an immersive landing stage with stepped background video switching, idle auto-advancing, dynamic page routing, modular content sections, and a fullscreen menu overlay. Built with React, Vite, and React Router.

## Features

- **A24-Style Stepped Hero Navigation**: An immersive fullscreen landing stage where wheel or touch inputs step sequentially through navigation items (Writing, Voice, Film, Music, Gallery), instantly swapping the active background video.
- **Background Video Pipeline (`MainBackground`)**: Dynamic video loading and playback orchestration tied to active navigation states, utilizing muted, looping, playsinline HTML5 video with a responsive darkening overlay.
- **Idle Auto-Advance Loop**: A reactive timer that automatically cycles through the navigation steps when the user is idle, pausing instantly upon any manual scroll or click interaction.
- **Seamless Page Flow & Content Reveal (`Main`)**: Intercepts scroll and wheel events to lock the user through the navigation items, unlocking standard browser scrolling once "Gallery" is reached to reveal the modular posts section below.
- **Persistent Global Header & Mobile Menu Overlay**: Global header featuring a top logo, active mobile menu toggle (`isMenuOpen`), and a fullscreen slide-over `MenuOverlay` with locked body scroll behavior (`body--menu-open`), centered navigation links, and a full-width bottom social ribbon.
- **Modular Content Architecture**: Cleanly separated component structure (`ContentSection`, `ContentCard`, `FeaturedWorks`, `MostRecent`) designed for future dynamic feed integration.
- **Responsive Social & Streaming Integration**: Social ribbon featuring customized icon scaling compensation (Bandcamp, SoundCloud, Spotify, YouTube, Instagram) and negative margin border handling.

## Component Structure

- **`App`**: Global root component managing menu state (`isMenuOpen`), routing configuration via React Router, the persistent header, social ribbon, and footer.
- **`HeaderNavigation`**: Top navigation bar coordinating mobile menu triggers and page routing.
- **`MenuOverlay`**: Fullscreen slide-over navigation container featuring centered typography, close actions, and a full-width bottom social ribbon.
- **`Main`**: Primary homepage coordinator managing the active navigation index, throttled wheel-event listeners, idle timer intervals, and post-section layout flow.
- **`MainBackground`**: Dedicated video rendering component managing source mapping, loading states, and smooth playback transitions based on active navigation steps.
- **`MainNavigation`**: Floating interactive navigation list handling active link highlighting, click selection, and animated scroll indicators.
- **`ContentSection`**: Reusable structural wrapper providing section titles and responsive grid layouts.
- **`ContentCard`**: Individual content card component rendering media placeholders, titles, descriptions, and external links.
- **`FeaturedWorks`**: Curated section container for highlighted creative projects.
- **`MostRecent`**: Dynamic stream section container for recent releases and updates.
- **`Footer`**: Persistent site footer featuring developer attribution and links.

## Tech Stack

- **Frontend**: React, HTML5, CSS3
- **Build Tooling**: Vite
- **Routing**: React Router DOM
- **Media**: HTML5 Video (`object-fit: cover`)
- **Icons & Assets**: Custom SVG icons with proportional scale compensation
