Deploying `npi-3` to `npi.milandjumic.dev`
=========================================

Context
-------
- Repository: push source code to GitHub (default branch `main`).
- Hosting: cPanel shared hosting, static files only (no Node.js runtime or database).
- Subdomain: `npi.milandjumic.dev`, served from its cPanel document root (e.g. `/home/<user>/public_html/npi`).
- Build: Vite/React; production assets generated in `dist/`.

Checklist & Sequence
--------------------

1. Preparation
   - Confirm GitHub access and cPanel login.
   - Gather deployment credentials: FTP/SFTP hostname, username, password or SSH key, target directory path.
   - Ensure local tooling: Node.js ≥ 20, npm.

2. Local Project Setup
   - `npm install`
   - `npm run build` → verify `dist/` contains production site.
   - Commit and push code to GitHub `main`.

3. Subdomain Configuration (cPanel)
   - Create DNS record for `npi.milandjumic.dev` → point to hosting IP.
   - In cPanel → **Subdomains** → add `npi` → note document root (e.g. `public_html/npi`).
   - Wait for DNS propagation (test by visiting the subdomain; expect default page or directory listing).

4. Manual Smoke Deployment (one-time)
   - Upload contents of `dist/` to the subdomain’s document root via FTP/SFTP.
   - Visit `https://npi.milandjumic.dev` → confirm site renders correctly.

5. Automate Deployment with GitHub Actions
   - In GitHub repo settings → **Secrets and variables → Actions**:
     - `CPANEL_HOST`
     - `CPANEL_USERNAME`
     - `CPANEL_PASSWORD` (or `CPANEL_SSH_KEY`/`CPANEL_SSH_KEY_PASSphrase` for key auth)
     - `CPANEL_TARGET_DIR` (e.g. `/home/<user>/public_html/npi`)
   - Create `.github/workflows/deploy.yml`:
     1. Trigger: pushes to `main`.
     2. Steps: checkout, `setup-node` (v20), `npm ci`, `npm run build`.
     3. Deployment: upload `dist/` to target via FTP/SFTP action (`SamKirkland/FTP-Deploy-Action` or `wlixcc/SFTP-Deploy-Action`).
   - Push workflow → verify Action completes and site updates automatically.

6. Optional: Add CMS (Decap/Netlify CMS)
   - Add `/admin/index.html` + `admin/config.yml`.
   - Configure GitHub OAuth or Netlify Identity for authentication.
   - Editors use `/admin` UI; CMS commits to GitHub `main` → triggers same Action.
   - Protect `/admin` (authentication only; no server-side code required).

7. Ongoing Workflow
   - Development changes: edit locally → `npm run build` (optional check) → push to `main`.
   - Content changes via CMS: edit → CMS commits → Action redeploys.
   - Monitor build logs after dependency updates or structure changes.

Open Questions / TODOs
----------------------
- Confirm actual document root path from cPanel for `npi` subdomain.
- Decide on deployment protocol (FTP password vs. SFTP SSH key).
- Determine whether CMS integration should be part of the first release or later.
- (Optional) Draft the GitHub Action and CMS config files once details above are settled.
