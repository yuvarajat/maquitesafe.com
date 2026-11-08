# Current-site audit and migration notes

Audit date: 8 November 2026

## What the current site uses

- One long landing page with Bootstrap, jQuery and Isotope filtering.
- Static logo, product photographs and two anion-information graphics.
- An external FormSubmit contact form delivering to `mukilkamal11@gmail.com`.
- Telephone and email links plus the business address and GSTIN.
- No business feature on the public page requires .NET or a database.

## Main issues found

- Scroll-reveal behavior can leave very large blank sections, especially on mobile and full-page rendering.
- The layout has oversized vertical gaps and inconsistent responsive behavior.
- Product information is difficult to scan, and calls to action are visually inconsistent.
- The visible `info@maquitesafe.com` link previously pointed to a different Gmail address.
- Several typographic, grammar and spacing inconsistencies weaken trust.
- Medical-style product claims need client review before publishing.
- The current page has limited social-sharing metadata and no structured business data.

## Content preserved in the rebuild

- The original Maquitesafe logo.
- Shri Shaanthini Products name, 2016 start date, address, GSTIN, phone and public email.
- All 15 catalogue combinations and their sizes.
- Anion, regular, bamboo and herbal product groupings.
- Price-on-request and MOQ 10,000 pieces.
- Pencil-pack sanitary napkins for vending machines.
- Seven-layer anion construction artwork and the existing anion-benefits artwork.
- Bamboo and herbal product descriptions.
- The enquiry fields, now routed to WhatsApp at `+91 94444 78588`.

## Cutover plan for the 10 November 2026 deadline

1. Export a full backup of the current Plesk `httpdocs` folder and save a screenshot/export of all current DNS records.
2. Upload this static build to a temporary subdomain or a separate Plesk folder and test it over HTTPS.
3. Confirm phone, email, GSTIN, address, MOQ and every product claim with the client.
4. Submit a test enquiry and confirm that WhatsApp opens the chat for `+91 94444 78588` with the full message prefilled.
5. Replace the production `httpdocs` contents with this build. No .NET application pool is required.
6. If the hosting server is also changing, update only the required GoDaddy DNS records after copying every existing mail-related record. Avoid changing nameservers unless the complete DNS zone has been recreated at the new provider.
7. Verify the apex domain, `www`, SSL certificate, contact form and mobile layout immediately after cutover.
8. Keep the old hosting backup until the new site has been stable for at least several days.

## Recommended client confirmations

- Whether `info@maquitesafe.com` is an active mailbox.
- Whether `+91 94444 78588` is the client's preferred WhatsApp Business number.
- Whether “MOQ 10,000 pieces” applies to every product.
- Whether the anti-fungal, antibacterial, chemical-free and anion-benefit claims are approved for publication.
- Whether newer, higher-resolution product photographs are available.
