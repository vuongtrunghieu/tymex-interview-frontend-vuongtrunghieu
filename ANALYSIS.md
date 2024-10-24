# Project analysis

## Key components

1. Functional capabilities
    - UI for Marketplace matched with reference design
    - Load and display data from external API
    - Pagination (or lazy-loading) of data
    - Search & filter
    - Sorting
2. Non-functional requirements
    - Responsive design (desktop, tablet, mobile)
    - Using UI components (Ant Design), animations, general UX touch-ups
    - Testing and code quality
    - Performance
    - Deployment

## System Dependencies

- External data source is used to display the page content
- Images are fetched from external sources, which may bring some disadvantages by assuming:
    + We have no control on image quality
    + Content might or might not be cached depending on the source content caching policy
- We assume there is no important application state to user that needs to be persisted
    + No need to persist state
    + However, we can store search query, filter, sorting state in the URL
    + (Optional) favorite items can be simply saved to local storage or Indexed DB

## Design breakdown

### Hierarchy

- Main layout
    + Header
        - Navigation links
    + Hero Section
        - Feature items
        - Banner
    + Content Section
        - Search input
        - Slider for filtering
        - Dropdown for filtering
        - Scrollable area for cards (with Grid layout)
            + Cards with images
    + Footer
        - Links
        - Misc.

### Components

- ItemCard
  + Avatar
  + Image
  + Rarity Badge
  + Favorite Button
- Slider
- Dropdown
- General Button
- Input
- Icons

## Some ideas for future work if we still have time
- Basic Dark/Light theme
- Localization (from the design, we can see a language switch button in the header)
- Supposed we have a large data set of items, we can add auto-suggestions to search input
- Fancy 3D animations of the card content (frankly, I don't have time for this)
