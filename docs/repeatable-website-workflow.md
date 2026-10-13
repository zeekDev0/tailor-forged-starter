# Repeatable Website Production Workflow

## 1. Start with a profile
The industry demo routes are:
- `/automotive/`
- `/hairdresser/`
- `/hvac/`
- `/retirement-home/`
- `/recording-artist/`
- `/music-producer/`

Each profile is a starting point, not a finished client website. Profile data lives in `src/config/profiles.ts`; the original Tailor Forged homepage remains at `/`.

## 2. Create a client branch
Start from the latest `main` and create a branch such as `client/acme-hvac`. Do not edit `main` directly.

## 3. Configure the client
Copy the closest profile into a dedicated client config when the client needs a distinct permanent site. Replace all sample content, theme tokens, SEO metadata, contact details, and navigation. Avoid adding secrets to source control. Use environment variables for integration keys.

## 4. Build and test
Run:
```bash
npm ci
npm run build
npx playwright test
```
Open a pull request, review the diff, confirm GitHub Actions passes, and merge only after the content and browser checks are complete.

## 5. Preview and approve
Deploy the branch to a preview environment using your hosting provider. Send the client a preview URL and a written list of what is and is not functional. Get written approval before production launch.

## 6. Deploy and maintain
Connect the production branch to a static hosting provider that supports Astro. Configure the build command as `npm run build` and the output directory as `dist`. Attach the client's domain and verify HTTPS through the provider's current dashboard instructions. Keep hosting access and billing under the agreed account owner.

## Current implementation boundaries
- The six routes are static, content-driven demo templates.
- Contact calls to action open an email draft. They do not submit to a CRM.
- Appointment booking, payment, merch checkout, beat licensing checkout, and studio calendars require separate integrations.
- No real customer information, real testimonials, business credentials, prices, or live product inventory should be invented.
- The repository has CI build and Playwright browser checks; production hosting has not been connected by this code change.
