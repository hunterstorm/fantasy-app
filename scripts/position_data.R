current_script <- "position_data.R"
source("config/script_config.R", local = TRUE)

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

# Summarize QB data #####

qb_leaders <- qb_data_2023 %>%
  group_by(
    player_id,
    player_name,
    player_display_name,
    position,
    recent_team,
    headshot_url
  ) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr, na.rm = TRUE),
    total_pass_yds = sum(passing_yards, na.rm = TRUE),
    total_completions = sum(completions, na.rm = TRUE),
    total_attempts = sum(attempts, na.rm = TRUE),
    comp_rate = (total_completions / total_attempts),
    total_pass_tds = sum(passing_tds, na.rm = TRUE),
    total_ints = sum(interceptions, na.rm = TRUE),
    td_int_rate = (total_pass_tds / total_ints),
    avg_passing_epa = mean(passing_epa, na.rm = TRUE),
    total_carries = sum(carries, na.rm = TRUE),
    total_rush_yds = sum(rushing_yards, na.rm = TRUE)
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

# Summarize WR data #####

wr_leaders <- wr_data_2023 %>%
  group_by(
    player_id,
    player_name,
    player_display_name,
    position,
    recent_team,
    headshot_url
  ) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr, na.rm = TRUE),
    total_targets = sum(targets, na.rm = TRUE),
    avg_target_share = mean(target_share, na.rm = TRUE),
    total_rec = sum(receptions, na.rm = TRUE),
    total_rec_yards = sum(receiving_yards, na.rm = TRUE),
    total_yac = sum(receiving_yards_after_catch, na.rm = TRUE),
    total_rec_tds = sum(receiving_tds, na.rm = TRUE),
    avg_rec_epa = mean(receiving_epa, na.rm = TRUE)
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


# Summarize RB data #####

rb_leaders <- rb_data_2023 %>%
  group_by(
    player_id,
    player_name,
    player_display_name,
    position,
    recent_team,
    headshot_url
  ) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr, na.rm = TRUE),
    total_carries = sum(carries, na.rm = TRUE),
    total_rush_yds = sum(rushing_yards, na.rm = TRUE),
    total_rush_tds = sum(rushing_tds, na.rm = TRUE),
    total_targets = sum(targets, na.rm = TRUE),
    total_rec = sum(receptions, na.rm = TRUE),
    total_rec_yds = sum(receiving_yards, na.rm = TRUE),
    total_rec_tds = sum(receiving_tds, na.rm = TRUE),
    total_tds = sum(total_rush_tds + total_rec_tds),
    total_touches = (total_carries + total_rec),
    avg_target_share = mean(target_share, na.rm = TRUE),
    avg_rush_epa = mean(rushing_epa, na.rm = TRUE),
    avg_rec_epa = mean(receiving_epa, na.rm = TRUE)
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

# Summarize TE data #####

te_leaders <- te_data_2023 %>%
  group_by(
    player_id,
    player_name,
    player_display_name,
    position,
    recent_team,
    headshot_url
  ) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr, na.rm = TRUE),
    total_targets = sum(targets, na.rm = TRUE),
    avg_target_share = mean(target_share, na.rm = TRUE),
    total_rec = sum(receptions, na.rm = TRUE),
    total_rec_yards = sum(receiving_yards, na.rm = TRUE),
    total_yac = sum(receiving_yards_after_catch, na.rm = TRUE),
    total_rec_tds = sum(receiving_tds, na.rm = TRUE),
    avg_rec_epa = mean(receiving_epa, na.rm = TRUE)
  ) %>%
  arrange(desc(total_ppr))

# Convert each record to JSON and print on a new line
cat(
  jsonlite::toJSON(qb_leaders, pretty = FALSE),
  jsonlite::toJSON(wr_leaders, pretty = FALSE),
  jsonlite::toJSON(rb_leaders, pretty = FALSE),
  jsonlite::toJSON(te_leaders, pretty = FALSE)
)
