# Maquitesafe website

A modern, dependency-free static rebuild of [maquitesafe.com](https://maquitesafe.com/) for Shri Shaanthini Products.

## Why this implementation

The site uses plain HTML, CSS and JavaScript. It does not require .NET, Node.js, a database, or a server-side runtime, so it remains compatible with basic Plesk Windows hosting and can also be moved to any conventional static host.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to Plesk

1. Back up the current site and its DNS records.
2. In Plesk File Manager, open the domain's document root (commonly `httpdocs`).
3. Remove or archive the old site files.
4. Upload the contents of this folder so that `index.html` is directly inside `httpdocs`.
5. Keep `web.config` in the same folder as `index.html`.
6. Verify the home page, product filters, phone/email links, and enquiry form.
7. Only after testing, update the GoDaddy DNS records if the replacement is hosted on a new server.

## Contact form

The enquiry form validates the visitor's details, formats them into a clear message and opens WhatsApp to `+91 94444 78588`. The visitor can review the prefilled enquiry before sending it. No server-side form service or mailbox verification is required.

## Important files

- `index.html` — page content and search metadata
- `assets/css/site.css` — responsive design system and layout
- `assets/js/site.js` — product catalogue, filters, menu and interactions
- `assets/images/` — preserved Maquitesafe logo and product media
- `web.config` — IIS/Plesk static-file settings and browser security headers

## Before going live

- Confirm that the displayed phone, email, GSTIN and address are still correct.
- Confirm that all product claims and the minimum order quantity are current.
- Test the WhatsApp enquiry flow on both a phone and a desktop browser.
- Replace any product photograph when a newer, higher-resolution source is available.
