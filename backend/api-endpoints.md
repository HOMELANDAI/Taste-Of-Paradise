# API Endpoints Draft

## Establishments
GET /api/establishments/:id
PATCH /api/establishments/:id

## Recipes
GET /api/recipes
GET /api/recipes/:id
POST /api/recipes
PATCH /api/recipes/:id
POST /api/recipes/:id/archive
POST /api/recipes/:id/send-to-vote
POST /api/recipes/:id/approve-for-cookbook

## Live Episodes
GET /api/live-episodes
POST /api/live-episodes
PATCH /api/live-episodes/:id/stage
POST /api/live-episodes/:id/heat-vote
POST /api/live-episodes/:id/ingredient-vote

## Taste Testers
POST /api/taste-testers/apply
GET /api/admin/taste-testers
PATCH /api/admin/taste-testers/:id/status

## Sponsors
GET /api/sponsors
POST /api/sponsors
PATCH /api/sponsors/:id

## Collectibles
GET /api/cards
POST /api/cards/unlock
GET /api/users/:id/cards

## NCRD Gateway
GET /api/ncrd-gateway
PATCH /api/admin/ncrd-gateway
