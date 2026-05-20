# Vitor Alves Santos — Portfolio

Personal portfolio site, live at [vomelhor.github.io](https://vomelhor.github.io).

## Stack

- **React** (Create React App) + **SCSS**
- **React Router** for client-side navigation
- **EmailJS** for the contact form
- **FontAwesome** icons
- **gh-pages** for deployment

## Pages

| Route | Description |
| --- | --- |
| `/` | Animated intro — name, title, contact button |
| `/about` | Bio + scattered photo mosaic |
| `/projects` | 3 playable mini-games (Snake, Tic-Tac-Toe, Memory Match) |
| `/contact` | Email form with rocket animation |

## Running locally

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## Deploying

```bash
npm run deploy
```

Builds for production and publishes to the `gh-pages` branch.

## Structure

```text
src/
├── assets/          # Fonts and images
├── components/
│   ├── About/       # Bio page + photo mosaic
│   ├── AnimatedLetters/
│   ├── Contact/     # Email form + animation
│   ├── Home/        # Landing page + SVG logo
│   ├── Layout/      # Shell: sidebar + page wrapper
│   ├── Projects/    # Games + disclaimer
│   │   └── games/
│   │       ├── Snake/
│   │       ├── TicTacToe/
│   │       └── MemoryMatch/
│   └── Sidebar/     # Nav + social links
└── App.js
```
