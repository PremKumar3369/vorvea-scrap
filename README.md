# VORVEA static website

This site uses plain HTML, CSS, and vanilla JavaScript. It has no build step or package dependencies.

## Run locally

Open `index.html` in a modern browser. Images are local WebP files in `assets/images/`. Lenis smooth scrolling loads from a CDN and needs an internet connection; native scrolling remains as a fallback.

## Deploy to Vercel

1. Push this project folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Set **Framework Preset** to **Other** and **Root Directory** to the folder containing `index.html`.
4. Leave **Build Command** blank and set **Output Directory** to `.`.
5. Deploy. Vercel serves this static HTML/CSS/JS project as-is; there is no install command or build process.

Vercel's current instructions for static HTML sites are documented at https://vercel.com/docs/builds.

## Edit business details

Edit the `VORVEA_CONFIG` object at the top of `script.js` to change the phone, WhatsApp number, pre-filled WhatsApp message, service area, or optional map embed.

## Replace images

Put replacement WebP images in `assets/images/` and update their paths in `index.html` or `style.css`. `VORVEA_logo.png` remains PNG; the other supplied PNGs were removed after conversion to WebP.

## Notes

- The enquiry form is frontend-only and does not store or deliver submissions.
- Material acceptance and collection depend on assessment and agreed terms.
- WhatsApp opens a pre-filled message for the visitor to review and send. The call button uses a `tel:` link.
