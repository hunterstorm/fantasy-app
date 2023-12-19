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

QB_data_2023 <- player_stats_2023 %>%
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

QB_data_2023_json <- jsonlite::toJSON(QB_data_2023, pretty = TRUE)         # convert to JSON
## write(QB_data_2023_json, file = "QB_data_2023.json")                 # write JSON to file in wd

# Summarize QB data #####

QB_leaders_2023 <- QB_data_2023 %>%
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

QB_leaders_2023_json <- jsonlite::toJSON(QB_leaders_2023, pretty = TRUE)  # convert to JSON
## write(QB_leaders_2023_json, file = "QB_leaders_2023.json")                   # write JSON to file in wd


# Collect WR data #####

WR_data_2023 <- player_stats_2023 %>%
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

WR_data_2023_json <- jsonlite::toJSON(WR_data_2023, pretty = TRUE)         # convert to JSON
## write(WR_data_2023_json, file = "WR_data_2023.json")                 # write JSON to file in wd

# Summarize WR data #####

WR_leaders_2023 <- WR_data_2023 %>%
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

WR_leaders_2023_json <- jsonlite::toJSON(WR_leaders_2023, pretty = TRUE)  # convert to JSON
## write(WR_leaders_2023_json, file = "WR_leaders_2023.json")                   # write JSON to file in wd

# Collect RB data #####

RB_data_2023 <- player_stats_2023 %>%
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

RB_data_2023_json <- jsonlite::toJSON(RB_data_2023, pretty = TRUE)         # convert to JSON
## write(RB_data_2023_json, file = "RB_data_2023.json")                 # write JSON to file in wd

# Summarize RB data #####

RB_leaders_2023 <- RB_data_2023 %>%
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

RB_leaders_2023_json <- jsonlite::toJSON(RB_leaders_2023, pretty = TRUE)  # convert to JSON
## write(RB_leaders_2023_json, file = "RB_leaders_2023.json")                   # write JSON to file in wd