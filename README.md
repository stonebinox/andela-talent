# Andela Pages

Repository for some of Andela's talent signup.

## List of accessible routes

- / : [Talent signup wizard](https://signup.andela.com)

## Key integrations

### Client signup wizard

- Google analytics via DataLayer
- Marketo
- Chili Piper
- Custom A/B tests
- FullStory

### Talent signup wizard

- Google analytics via DataLayer
- Marketo

## Important structures in use

- `colors`: all colors are defined in this file. We do not use statically declared colors directly - everything needs to be imported via `colors`.
- `spacing`: all spacing (margin, padding, width, height, border-radius, border-width, and related) need to be imported via `spacing`. `spacing` already contains the defaults for the most commonly used values (2px, 4px, 8px, 16px, 32px). All of the spacing is converted to `rem`. Any other spacing needs to be passed via `customSpacing()` to convert from px to rem. However, it's important to note that any spacing that's not conformant with our commonly used values (2px, 4px, 8px, 16px, 32px) should be double-checked with the team especially when used for margins, padding, and border-radius. Usually images and custom shapes have different sizes and those are fine.
- `api`: all APIs are placed in this file
- `seo`: any custom scripts (try to avoid) and head information sits in this file

---
