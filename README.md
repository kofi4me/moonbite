# MoonBite Menu

Static, responsive restaurant payment simulation for KryptNet cybersecurity awareness training.

Live URL: https://kofi4me.github.io/moonbite/

All payment accounts are demonstration examples. No gateways, financial data collection, analytics, or transactions. The Zelle address uses the reserved .invalid domain. Card details are preset display text only. Supplied mobile numbers must never be used to send money.

## Preview
Run `python -m http.server 8080` and open http://localhost:8080.

## Webinar scenarios
- Expected checkout: https://kofi4me.github.io/moonbite/?scenario=trusted
- Replaced QR simulation: https://kofi4me.github.io/moonbite/?scenario=redirected

Encode either URL in a QR code for a smartphone demonstration. The redirected scenario remains on this site and displays a clearly labeled fictional unauthorized recipient. All four payment buttons open a separate checkout page with merchant details, fictional participant inputs, and a confirmation screen.

## Deployment
Push to main triggers the included GitHub Pages Actions workflow. Repository Settings > Pages must use GitHub Actions if automatic enablement is unavailable. All assets are local and require no build step or external dependencies.

## Participant demo entry
Each payment button opens checkout.html with the selected method and QR scenario. Participants enter a fictional nickname, choose a table, use a preset fictional account, and acknowledge the simulation. Form data is handled only in page memory, never sent or persisted. No financial credentials or card details are requested.


