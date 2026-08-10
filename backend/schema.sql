-- Taste of Paradise / T.O.P by HAI relational schema draft

create table establishments (id text primary key, name text not null, short_name text, parent_brand text, tagline text, logo_url text, primary_color text, secondary_color text, accent_color text, location_label text, ncrd_gateway_enabled boolean default true, created_at timestamp default current_timestamp);

create table users (id text primary key, display_name text, email text unique, role text default 'user', loyalty_tier text default 'Newcomer', points integer default 0, created_at timestamp default current_timestamp);

create table recipes (id text primary key, establishment_id text references establishments(id), title text not null, collection text, category text, meal_type text, cuisine_inspiration text, description text, ingredients jsonb, instructions jsonb, prep_time text, cook_time text, difficulty text, servings integer, allergens text[], dietary_tags text[], flavor_tags text[], source_type text, original_creator text, original_source_url text, sponsor_id text, hero_image text, video_url text, stream_clip_url text, reaction_video_url text, status text default 'Draft', visibility text default 'Public', heat_score integer default 0, vote_count integer default 0, flavor_profile jsonb, is_signature_menu boolean default false, is_limited_drop boolean default false, is_sponsor_ready boolean default false, cookbook_volume text, collectible_card_id text, date_added timestamp default current_timestamp, last_tested_date timestamp);

create table live_episodes (id text primary key, establishment_id text references establishments(id), title text not null, selected_recipe_id text references recipes(id), stream_url text, platform text, status text default 'Scheduled', current_stage text, heat_votes integer default 0, caramelization_percent integer default 0, voting_threshold integer default 5000, created_at timestamp default current_timestamp);

create table ingredient_votes (id text primary key, episode_id text references live_episodes(id), recipe_id text references recipes(id), ingredient_name text not null, user_id text references users(id), vote text check (vote in ('IN','OUT')), created_at timestamp default current_timestamp);

create table heat_votes (id text primary key, episode_id text references live_episodes(id), user_id text references users(id), value integer default 1, created_at timestamp default current_timestamp);

create table taste_tester_queue (id text primary key, user_id text references users(id), recipe_id text references recipes(id), status text default 'Waiting', preferred_categories text[], dietary_restrictions text, allergies text, willing_to_be_filmed boolean default false, social_handle text, availability text, reaction_video_url text, points_awarded integer default 0, created_at timestamp default current_timestamp);

create table sponsors (id text primary key, name text not null, logo_url text, website text, contact_email text, product_category text, promo_code text, visibility_level text default 'Public', created_at timestamp default current_timestamp);

create table collectible_cards (id text primary key, recipe_id text references recipes(id), user_id text references users(id), volume text, edition_number integer, rarity text, image_url text, unlocked_at timestamp default current_timestamp);

create table loyalty_events (id text primary key, user_id text references users(id), action text not null, points integer not null, target_id text, created_at timestamp default current_timestamp);
