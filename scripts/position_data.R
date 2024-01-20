# Install and load required packages
required_packages <- c("dplyr", "ggplot2", "ggrepel", "nflfastR", "nflplotR", "nflreadr", "tibble", "tidyr", "tidyverse", "jsonlite")

# Install missing packages
install_missing_packages <- required_packages[!(required_packages %in% installed.packages()[,"Package"])]
if (length(install_missing_packages) > 0) {
  install.packages(install_missing_packages)
}

json_folder <- file.path(getwd(), "json-files", "position-data")

if (!dir.exists(json_folder)) {
  dir.create(json_folder)
}

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
    player_display_name,
    position,
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

qb_leaders <- qb_data_2023 %>%
  group_by(player_id, player_name, player_display_name, position, recent_team, headshot_url) %>%
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

# Collect WR data #####

wr_data_2023 <- player_stats_2023 %>%
  filter(position == "WR") %>%
  select(
    player_id,
    player_name,
    player_display_name,
    position,
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

wr_leaders <- wr_data_2023 %>%
  group_by(player_id, player_name, player_display_name, position, recent_team, headshot_url) %>%
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

# Collect RB data #####

rb_data_2023 <- player_stats_2023 %>%
  filter(position == "RB") %>%
  select(
    player_id,
    player_name,
    player_display_name,
    position,
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

rb_leaders <- rb_data_2023 %>%
  group_by(player_id, player_name, player_display_name, position, recent_team, headshot_url) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr),
    total_carries = sum(carries),
    total_rush_yds = sum(rushing_yards),
    total_rush_tds = sum(rushing_tds),
    total_targets = sum(targets),
    total_rec = sum(receptions),
    total_rec_yds = sum(receiving_yards),
    total_rec_tds = sum(receiving_tds),
    total_tds = sum(total_rush_tds + total_rec_tds),
    total_touches = (total_carries + total_rec),
    avg_target_share = mean(target_share),
    avg_rush_epa = mean(rushing_epa),
    avg_rec_epa = mean(receiving_epa)
  ) %>%
  arrange(desc(total_ppr))

# Collect TE data #####

te_data_2023 <- player_stats_2023 %>%
  filter(position == "TE") %>%
  select(
    player_id,
    player_name,
    player_display_name,
    position,
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

te_data_2023_json <-
  jsonlite::toJSON(te_data_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
# write(te_data_2023_json, file = "te_data_2023.json")

# Summarize TE data #####

te_leaders <- te_data_2023 %>%
  group_by(player_id, player_name, player_display_name, position, recent_team, headshot_url) %>%
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

# Convert each record to JSON and print on a new line
cat(
  jsonlite::toJSON(qb_leaders, pretty = FALSE),
  jsonlite::toJSON(wr_leaders, pretty = FALSE),
  jsonlite::toJSON(rb_leaders, pretty = FALSE),
  jsonlite::toJSON(te_leaders, pretty = FALSE)
)
