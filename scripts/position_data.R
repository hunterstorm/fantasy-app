# Load packages #####

library(dplyr)
library(ggplot2)
library(ggrepel)
library(nflfastR)
library(nflplotR)
library(nflreadr)
library(tibble)
library(tidyr)
library(tidyverse)
library(jsonlite)

# Load most recent player stats #####

player_stats_2023 <- load_player_stats(2023)

# Collect QB data #####

qb_data_2023 <- player_stats_2023 %>%
  filter(position == "QB") %>%
  select(
    player_id,
    player_name,
    headshot_url,
    recent_team,
    week,
    passing_yards,
    completions,
    attempts,
    passing_tds,
    interceptions,
    passing_epa,
    carries,
    rushing_yards,
    fantasy_points_ppr
  )

qb_data_2023_json <-
  jsonlite::toJSON(qb_data_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
# write(qb_data_2023_json, file = "qb_data_2023.json")

# Summarize QB data #####

qb_leaders_2023 <- qb_data_2023 %>%
  group_by(player_id, player_name, headshot_url) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr),
    total_pass_yds = sum(passing_yards),
    total_completions = sum(completions),
    total_attempts = sum(attempts),
    comp_rate = (total_completions / total_attempts),
    total_pass_tds = sum(passing_tds),
    total_ints = sum(interceptions),
    td_int_rate = (total_pass_tds / total_ints),
    avg_passing_epa = mean(passing_epa),
    total_carries = sum(carries),
    total_rush_yds = sum(rushing_yards)
  ) %>%
  arrange(desc(total_ppr))

qb_leaders_2023_json <-
  jsonlite::toJSON(qb_leaders_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
# write(qb_leaders_2023_json, file = "qb_leaders_2023.json")


# Collect WR data #####

wr_data_2023 <- player_stats_2023 %>%
  filter(position == "WR") %>%
  select(
    player_id,
    player_name,
    headshot_url,
    recent_team,
    week,
    targets,
    receptions,
    receiving_yards,
    receiving_yards_after_catch,
    receiving_tds,
    target_share,
    receiving_epa,
    fantasy_points_ppr
  )

wr_data_2023_json <-
  jsonlite::toJSON(wr_data_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
# write(wr_data_2023_json, file = "wr_data_2023.json")

# Summarize WR data #####

wr_leaders_2023 <- wr_data_2023 %>%
  group_by(player_id, player_name, headshot_url) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr),
    total_targets = sum(targets),
    avg_target_share = mean(target_share),
    total_rec = sum(receptions),
    total_rec_yards = sum(receiving_yards),
    total_yac = sum(receiving_yards_after_catch),
    total_rec_tds = sum(receiving_tds),
    avg_rec_epa = mean(receiving_epa)
  ) %>%
  arrange(desc(total_ppr))

wr_leaders_2023_json <-
  jsonlite::toJSON(WR_leaders_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
# write(WR_leaders_2023_json, file = "WR_leaders_2023.json")

# Collect RB data #####

rb_data_2023 <- player_stats_2023 %>%
  filter(position == "RB") %>%
  select(
    player_id,
    player_name,
    headshot_url,
    recent_team,
    week,
    carries,
    rushing_yards,
    rushing_tds,
    targets,
    receptions,
    receiving_yards,
    receiving_tds,
    target_share,
    rushing_epa,
    receiving_epa,
    fantasy_points_ppr
  )

rb_data_2023_json <-
  jsonlite::toJSON(rb_data_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
# write(rb_data_2023_json, file = "rb_data_2023.json")

# Summarize RB data #####

rb_leaders_2023 <- rb_data_2023 %>%
  group_by(player_id, player_name, headshot_url) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr),
    total_carries = sum(carries),
    total_rush_yds = sum(rushing_yards),
    total_rush_tds = sum(rushing_tds),
    total_targets = sum(targets),
    total_rec = sum(receptions),
    total_rec_yds = sum(receiving_yards),
    total_rec_tds = sum(receiving_tds),
    total_tds = sum(total_rush_tds + total_rec),
    total_touches = (total_carries + total_rec_tds),
    avg_target_share = mean(target_share),
    avg_rush_epa = mean(rushing_epa),
    avg_rec_epa = mean(receiving_epa)
  ) %>%
  arrange(desc(total_ppr))

rb_leaders_2023_json <-
  jsonlite::toJSON(rb_leaders_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
# write(rb_leaders_2023_json, file = "rb_leaders_2023.json")