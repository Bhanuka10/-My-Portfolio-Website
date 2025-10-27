# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment on Vercel

If you see a Vercel build error like "sh: line 1: vite: command not found", Vercel likely skipped installing devDependencies and so the vite binary isn't available during the build. There are a few ways to fix this; this project includes a recommended approach below.

Recommended (already configured in this repo):
- We added a `vercel.json` which sets the install command to `npm ci --include=dev` and the build command to `npm run build`. This tells Vercel to install devDependencies (so `vite` is installed) before running the build.

Alternative options:
- Move `vite` from `devDependencies` to `dependencies` in `package.json` so it's installed in production installs (simple but increases installed packages).
- Manually set the Vercel Project > Settings > Install Command to `npm ci --include=dev`.

After deploying, make sure the project `VITE_BASE_PATH` (if used) is set in Vercel Environment Variables or match the `base` in `vite.config.js` if you host the site at a subpath.
