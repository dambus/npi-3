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

6. Upcoming: Supabase CMS Integration (Planned)  
   - Admin experience will be rebuilt on Supabase with row-level security instead of GitHub OAuth.  
   - Keep `src/data/projects.json` as the single source of truth until the Supabase schema is ready; plan a one-time migration from this file.  
   - Outline requirements: Supabase project setup, auth strategy, database schema for projects + media references, and migration tooling.

7. Ongoing Workflow  
   - Development changes: edit locally, optionally run `npm run build`, push to `main`.  
   - Content updates via CMS: edit → CMS commit to `main` → GitHub Action redeploys.  
   - Monitor deployment logs after dependency upgrades or structural changes.

Open Questions / TODOs
----------------------
- [ ] Finalize Supabase architecture (auth model, tables, storage buckets) for the CMS.
- [ ] Plan migration script from `src/data/projects.json` into Supabase tables.
- [ ] Decide on media storage: Supabase storage vs. existing `public/media` assets.
- [ ] (Optional) Add automated backups or version tagging before deploys for easier rollbacks.

Known Issues (2025-10-30)
-------------------------
- Supabase tables contain project rows, but all `projects` queries from the React app still hang on the `Loading projects...` state. No browser console errors are reported; next debugging step is to inspect the network response for the `projects` RPC and confirm whether RLS is filtering results or if the relationship select string needs further adjustment.
