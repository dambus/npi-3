Deploying `npi-3` to `npi.milandjumic.dev`
=========================================

Context
-------
- Repository: `dambus/npi-3` (default branch `main`).
- Hosting: cPanel shared hosting, static files only (no Node.js runtime or database).
- Subdomain: `npi.milandjumic.dev`, document root resolves to `/home/dambusns/public_html/npi`.
- Build: Vite/React; production assets generated in `dist/`.

Checklist & Sequence
--------------------

1. Preparation (Done)  
   - Confirm GitHub access and cPanel login.  
   - Gather deployment credentials: FTP hostname, username, password, and target directory path.  
   - Ensure local tooling: Node.js ≥ 20 and npm.

2. Local Project Setup (Done)  
   - `npm install`  
   - `npm run build` and confirm `dist/` contains the production site.  
   - Commit and push code to GitHub `main`.

3. Subdomain Configuration (cPanel) (Done)  
   - DNS: create record for `npi.milandjumic.dev` pointing to hosting IP.  
   - In cPanel **Subdomains** create `npi`, confirm document root.  
   - Wait for DNS propagation (visit subdomain to verify).

4. Manual Smoke Deployment (completed once) (Done)  
   - Upload the contents of `dist/` to the document root via FTP.  
   - Visit `https://npi.milandjumic.dev` and confirm the site renders.

5. Automated Deployment with GitHub Actions (Done)  
   - Repository secrets (Settings → Secrets and variables → Actions → *New repository secret*):
     - `CPANEL_HOST` = `ftp.dambusns.mycpanel.rs`
     - `CPANEL_PORT` = `21`
     - `CPANEL_USERNAME` = `cms@npi.milandjumic.dev`
     - `CPANEL_PASSWORD` = FTP password
     - `CPANEL_TARGET_DIR` = `./` (FTP account already points to `/home/dambusns/public_html/npi`)
   - Workflow `.github/workflows/deploy.yml`:
     1. Trigger: pushes to `main`.
     2. Steps: checkout, `setup-node@v4` (Node 20), `npm ci`, `npm run build`.
     3. Deployment: `SamKirkland/FTP-Deploy-Action@v4.3.4` uploads `dist/` to the target directory.
   - First run confirmed successful upload to the correct directory.

6. Optional: Decap (Netlify) CMS Integration (In progress)  
   - Static admin UI:
     - `public/admin/index.html` loads Decap CMS.
     - `public/admin/config.yml` defines the content model and Git backend.
   - Backend authentication:
     - Configure a GitHub OAuth application (Settings → Developer settings → OAuth Apps).  
       Use `https://npi.milandjumic.dev/admin/` for both Homepage and Authorization callback.  
     - Deploy a Decap CMS GitHub OAuth proxy (e.g., Render, Vercel, Fly.io).  
       Update `base_url` + `auth_endpoint` in `config.yml` to point to that proxy.  
       The proxy keeps the GitHub OAuth client secret server-side.
   - Content model:
     - Projects stored in `src/data/projects.json` under the `projects` array.  
     - Fields exposed: name, slug, client, category, year, descriptions, hero image, gallery, related slugs, metadata (status, priority, tags).
     - Media uploads: `media_folder: public/media`, `public_folder: /media` (matches existing assets).  
   - Workflow: editors log into `/admin`, edits commit to `main`, which triggers the existing deploy action.

7. Ongoing Workflow  
   - Development changes: edit locally, optionally run `npm run build`, push to `main`.  
   - Content updates via CMS: edit → CMS commit to `main` → GitHub Action redeploys.  
   - Monitor deployment logs after dependency upgrades or structural changes.

Open Questions / TODOs
----------------------
- [ ] Stand up and configure the GitHub OAuth proxy for Decap CMS (`base_url` + `auth_endpoint`).
- [ ] Create GitHub OAuth app and record credentials for the proxy.
- [ ] Decide whether to enable editorial workflow (`publish_mode: editorial_workflow`) once multiple editors join.
- [ ] (Optional) Add automated backups or version tagging before deploys for easier rollbacks.
