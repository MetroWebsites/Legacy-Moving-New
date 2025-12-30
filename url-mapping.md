# URL Mapping Plan

## Existing Pages to Rename/Redirect

| Desired URL | Current Page | Action |
|------------|--------------|--------|
| /residential-moving-services | /services/residential-moving.astro | Create new page with redirect |
| /reviews | /feedback.astro | Create new page with redirect |
| /contact | /contact.astro | No change needed |
| /commercial-moving-services | /services/commercial-moving.astro | Create new page with redirect |
| /storage-services | /services/storage-solutions.astro | Create new page with redirect |
| /request-quote | /get-quote.astro | Create new page with redirect |
| /moving-services | /services.astro | Create new page with redirect |
| /local-moving-services | /services/residential-moving.astro | Create new page with redirect |
| /about | /about-us.astro | Create new page with redirect |
| /long-distance-moving-services | /services/long-distance-moving.astro | Create new page with redirect |
| /packing-services | /services/packing-services.astro | No change needed |
| /labor-only-moving-services | /services/loading-unloading.astro | Create new page with redirect |

## New Pages to Create

| New URL | Base Content From | Notes |
|---------|-------------------|-------|
| /faqs | Create new page | Compile FAQs from existing services pages |
| /packing-prices | /services/packing-services.astro | New page focusing on pricing |
| /service-area | Create new page | Service area information |
| /packing-services5c1c4d99 | /services/packing-services.astro | Duplicate with ID suffix |
| /careers | Create new page | Employment opportunities |
| /moving-tips | Create new page | Moving advice content |
| /same-day-moves | Create new page | New service offering |
| /contact/moving-companies-service-area/Arvada | Create new page | Location-specific page |
| /contact/interstate-move-service-area/Denver | Create new page | Location-specific page |
| /jefferson-county-co | Create new page | Location-specific page |
| /contact/local-movers-service-area/Northglenn | Create new page | Location-specific page |
| /contact/moving-companies-service-area/Henderson | Create new page | Location-specific page |
| /short-term-storage | /services/storage-solutions.astro | Storage variation page |
| /gallery | Create new page | Photo gallery using provided images |

## Implementation Strategy

1. For redirects, we'll create new pages with the desired URLs and use meta refresh tags
2. For new pages, we'll create content based on the existing site style and content
3. For the gallery page, we'll use the provided media assets
4. We'll ensure all links and navigation work properly with the new URLs