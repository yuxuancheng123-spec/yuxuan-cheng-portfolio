# Floating Portfolio Resume Design

Goal: Redesign the standalone portfolio homepage as a centered floating widget cluster inspired by the user's reference screenshot, add a resume entry point, and update the resume PDF under the name Kenny Cheng.

Design direction: Use a soft, spacious, translucent desktop-widget composition. All cards cluster around the center with large quiet margins, not a full-width card grid. Visual language should feel personal and polished while staying relevant to AI governance, face identity, synthetic media, and digital assets.

Homepage requirements:
- Use the public display name Kenny Cheng.
- Keep card text short and avoid paragraph-heavy presentation.
- Include a left navigation widget with Recent work, Projects, Resume, About, and Contact.
- Include a center greeting widget and surrounding clock, date/calendar, latest work, project, resume, and theme widgets.
- Add micro-interactions: hover scale, deeper shadow, and smooth transitions.
- Add a project card scatter/collect interaction for portfolio items.
- Add smooth panel switching without page reload.
- Link the main compliance demo and GitHub repo.
- Link a downloadable updated resume PDF.

Resume requirements:
- Preserve the original resume's compact academic CV style: centered name/contact, uppercase section headers, strong institution lines, italic role/degree lines, right-aligned location/date.
- Change displayed name to Kenny Cheng.
- Add FaceMarket Researcher experience in English, focused on research about face identity, likeness, digital assets, AI-generated actors, and synthetic media markets.
- Keep it as a polished two-page PDF when feasible.

Verification:
- Run JS syntax check.
- Confirm links point to existing local files where applicable.
- Render the updated PDF to PNG and visually inspect layout.
- Browser-check desktop and mobile for no horizontal overflow and no obvious text overlap.
