# AM I COOKED?
### The Rainbow Crisis Calculator

**A1 — Initial Response Rapid Ideation | Digital Media Design**

## Overview

**AM I COOKED?** is a playful, interactive website that turns everyday academic stress and procrastination into an exaggerated fictional **Cooked Score**. It asks seven questions about deadlines, assignment progress, sleep, caffeine, browser tabs, procrastination and unfinished tasks, then assigns one of five classifications from **RAW** to **DEEP FRIED**.

The experience combines absurd internet humour with small, practical suggestions for getting started on work. It is **entertainment, not a psychological or medical assessment**.

## Problem and audience

Students often recognise that they are procrastinating but find it easier to laugh about their situation than confront an overwhelming to-do list. This project is aimed primarily at students and other people balancing deadlines and digital distractions. Its deliberately silly framing creates a low-pressure way to reflect on work habits.

## Experience and features

- Seven-question interactive quiz with Back, Next and Try Again navigation.
- Weighted score (0–100), five verdict levels, personalised roast and practical tips.
- Intro cutscene: three sequential lines on black followed by a rainbow screen transition; optional Skip Intro.
- Custom pixel-art characters in continuously scrolling background parades.
- Always-accessible flashing **PANIC BUTTON**, triggering a pixel-character scene, random emergency messages and three types of particles (💩, ☕, 💀).
- Random-answer button, optional retro sound effects, playful surprises and confetti.
- Achievements and a three-step recovery quest.
- Shareable result text and downloadable PNG result card generated with the Canvas API.

## Technical exploration

The project explores how **HTML, CSS and vanilla JavaScript** can support a complete interactive experience without a backend or a frontend framework. Experiments include CSS keyframe animations and layered layouts, timed intro transitions, dynamic DOM rendering, stateful questionnaire navigation, weighted scoring, procedural particles, browser audio, the Clipboard API and Canvas-based PNG export. The pixel characters are based on custom-drawn assets.

AI tools were used as development assistants: **ChatGPT** helped prototype and iterate the concept, code and visual interactions, and **GPT-3.5 Luna in VS Code** was used to further revise/debug code. The final design choices, custom pixel drawings and project direction were developed and reviewed by the student. AI-generated code should be tested and understood before submission.

## Files and deployment

Expected project structure:

```text
index.html
style.css
script.js
assets/
  pose-arms.png
  pose-run.png
  poop_character.png
README.md
```

The HTML loads `style.css` and `script.js` using relative paths. The JavaScript loads the three PNGs from `assets/`. **All of these files must be uploaded together** to the same repository, preserving their filenames and folders. GitHub Pages can host the project as a static site; set the publishing source to the repository's `main` branch and root folder, or another folder containing `index.html`.

**Live website:** [[AM I COOKED!!!](https://chloe183.github.io/AM-I-COOKED/)]

To test locally, open `index.html` in a modern browser. For a more deployment-like test, serve the folder using a local static server. Verify the intro, all seven questions, score/result screen, background movement, Panic Button, copy/download actions and mobile layout.

## Accessibility and responsible practice

The interface includes visible button labels, focus styles, some status announcements and an option to skip the intro. Sound is optional. The project also uses a reduced-motion CSS media query, although its motion handling and compact-screen layout should be tested further. The scoring is intentionally fictional and should not be interpreted as a validated assessment of wellbeing.

## Limitations and next steps

With more time, I would refine responsive layouts for smaller screens, test all interactions across browsers and devices, improve keyboard and screen-reader accessibility, make the scoring feedback more contextual, and simplify the CSS by consolidating overlapping animation rules. I would also create a true single-file HTML build if the assessment requires all assets and scripts embedded in one document.

## Credits and references

- **Concept, creative direction and original pixel-character drawings:** student project author. The `pose-arms.png`, `pose-run.png`, and `poop_character.png` assets are custom project artwork; verify the final files before publishing.
- **Typography:** `Courier New` with the generic `monospace` fallback, as declared in `style.css`. This is a system-font stack; no third-party font files or hosted font services are loaded.
- **Nyan Cat (2011), Christopher Torres / prguitarman:** visual inspiration for the rainbow, pixel-art and looping internet aesthetic. Reference: https://knowyourmeme.com/memes/nyan-cat . No original Nyan Cat image or soundtrack is embedded in the supplied code.
- **“Emotional Damage” (2021), Steven He:** referenced by the `EMOTIONAL DAMAGE` text in the random Panic Button messages. Reference: https://knowyourmeme.com/memes/emotional-damage . No original audio or video is embedded.
- **Other internet-humour references:** `404: PRODUCTIVITY NOT FOUND`, `BRAIN HAS LEFT THE CHAT`, and the Gordon Ramsay joke are textual references/parodies; these are not credited as copied visual assets.
- **Emoji:** Unicode emoji rendered by the visitor’s operating system/browser, not a separately imported emoji pack.
- **Sound:** retro beeps are synthesized at runtime with the browser Web Audio API; no downloaded audio tracks are used.
- **Development assistance:** OpenAI ChatGPT for initial coding and iteration; GPT-3.5 Luna in VS Code for subsequent code revisions and debugging (as reported by the author).
- **Technology:** HTML, CSS, vanilla JavaScript and browser APIs. No third-party JavaScript framework or hosted library is imported by the supplied source files.

The references above acknowledge creative influences and meme origins; attribution alone does not grant permission to reproduce copyrighted source media. The supplied project uses its own artwork rather than embedding those source images or recordings.
