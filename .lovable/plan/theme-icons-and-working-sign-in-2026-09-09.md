# Theme icons and working sign-in

## What will change
- Replace the theme emojis with accessible Moon, Sun, and Laptop icons while keeping dark, light, and system choices.
- Add an OSIGN sign-in page with email/password sign-in, account creation, and Google sign-in.
- Update both desktop and mobile navigation so “Sign In” opens the page, then shows the signed-in user with a sign-out action.
- Keep the current OSIGN glass-and-teal visual style and add page-specific sharing metadata.

## Technical details
- Use the existing Lucide icon set and shared button/input controls.
- Use Lovable Cloud authentication for sessions and account actions; no profile database is needed.
- Handle loading, validation, confirmation, and error states directly on the sign-in page.
- Verify the theme controls, sign-in page layout, navigation links, and authentication UI in the running preview.
