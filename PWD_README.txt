PWD iStudio-based modified template

What I changed:
- Rebranded title and header to PWD — Pearl White Design Studio
- Added EcoPod™ section with 30-day, low-VOC, Factory QA and Builder Packs tiles
- Added CSS refinements for hero, badges, and beige icon tiles in css/style.css
- Added php-backend/contact_smtp.php which logs leads to php-backend/leads.txt

How to test locally:
1. Extract this ZIP and open index.html for visual check.
2. To test forms, run a PHP server in the site root:
   php -S localhost:8000 -t .
   Submit the form — leads will append to php-backend/leads.txt

Next recommended steps I can do:
- Replace images with your supplied high-res photos / mockups
- Make navbar transparent-to-solid on scroll JS behavior (currently template may have)
- Convert pricing & services into product cards with per-sqft calculator
