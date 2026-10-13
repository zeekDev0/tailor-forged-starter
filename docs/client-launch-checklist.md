# Tailor Forged Marketing: Client Launch Checklist

Use this checklist for every client website. Do not publish demo content as if it were verified business information.

## Intake and scope
- [ ] Confirm business name, primary contact, location/service area, hours, phone, email, and domain owner.
- [ ] Agree on target customers, primary conversion, required pages, services, and project scope in writing.
- [ ] Collect approved logo, brand assets, licensed photography, copy, testimonials, and social links.
- [ ] Identify integrations needed: scheduling, contact forms, payments, ecommerce, audio players, analytics, or CRM.
- [ ] Confirm who owns and pays for the domain, hosting, subscriptions, and third-party accounts.

## Configure
- [ ] Select the closest industry profile in `src/config/profiles.ts`.
- [ ] Replace sample brand, copy, services, colors, email, SEO title, and SEO description.
- [ ] Replace all demo addresses and sample names with client-approved information.
- [ ] Verify all navigation and calls to action lead somewhere intentional.
- [ ] Add real booking, payment, store, streaming, or inquiry integrations only after client access and requirements are confirmed.
- [ ] Verify image rights, alt text, privacy notices, cookie/analytics settings, and form consent where applicable.

## Quality assurance
- [ ] Run `npm ci`.
- [ ] Run `npm run build`.
- [ ] Run `npx playwright test`.
- [ ] Review each page at desktop and mobile widths.
- [ ] Check spelling, links, page titles, meta descriptions, contact details, and keyboard focus.
- [ ] Submit each form or booking flow in its test mode and confirm the intended recipient or destination.
- [ ] Confirm accessibility basics: heading order, contrast, visible focus, labels, and useful link text.
- [ ] Obtain client approval for the final content and preview.

## Launch and handoff
- [ ] Connect the client's hosting project and domain using the chosen provider's current instructions.
- [ ] Confirm HTTPS, canonical domain, redirects, and production environment variables if any.
- [ ] Run a final smoke test on the live domain.
- [ ] Provide the client with domain/hosting ownership details, update instructions, support scope, and response expectations.
- [ ] Record launch date, renewal dates, credentials owner, backup/rollback plan, and any known limitations.
- [ ] Schedule a post-launch check after 7 days.

## Industry-specific reminders
- **Automotive/HVAC:** verify service areas, hours, licensing claims, warranties, emergency availability, and any price claims.
- **Hairdresser:** verify service names, starting prices, cancellation policy, booking link, and photo permissions.
- **Senior living:** verify all living/care options, licensing, fees, accessibility details, privacy practices, and family contact process. Do not make unsubstantiated medical or safety claims.
- **Recording artist:** verify bio, credits, release dates, music links, cover-art rights, merch availability, shipping, and booking contact.
- **Producer/studio:** verify beat licensing terms, usage rights, pricing, revision limits, file delivery formats, session availability, deposit and cancellation rules.
