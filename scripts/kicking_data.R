current_script <- "kicking_data.R"
source("config/script_config.R", local = TRUE)

k_data_2023 <- calculate_player_stats_kicking(pbp, weekly = TRUE) %>%
  filter(season_type == "REG") %>%
  select(
    player_id,
    player_name,
    player_display_name,
    position,
    headshot_url,
    team,
    week,
    fg_made,
    fg_missed,
    fg_long,
    fg_pct,
    fg_made_0_19,
    fg_made_20_29,
    fg_made_30_39,
    fg_made_40_49,
    fg_made_50_59,
    fg_made_60_,
    fg_made_distance,
    fg_missed_distance,
    pat_made,
    pat_missed,
    pat_pct
  )

k_leaders <- k_data_2023 %>%
  group_by(
    player_id,
    player_name,
    player_display_name,
    position,
    team,
    headshot_url
  ) %>%
  summarize(
    total_ppr = (
      (sum(fg_made_0_19, na.rm = TRUE)
      + sum(fg_made_20_29, na.rm = TRUE)
        + sum(fg_made_30_39, na.rm = TRUE)
      ) * 3
        + sum(fg_made_40_49, na.rm = TRUE) * 4
        + (
          sum(fg_made_50_59, na.rm = TRUE)
          + sum(fg_made_60_, na.rm = TRUE)
        ) * 5
        + sum(pat_made, na.rm = TRUE)
        - sum(fg_missed, na.rm = TRUE)
    ),
    total_fg_att = sum(fg_made, na.rm = TRUE) + sum(fg_missed, na.rm = TRUE),
    total_fg_made = sum(fg_made, na.rm = TRUE),
    total_fg_missed = sum(fg_missed, na.rm = TRUE),
    fg_pct = (total_fg_made / total_fg_att) * 100,
    avg_make_yds = sum(fg_made_distance, na.rm = TRUE) / total_fg_made,
    avg_miss_yds = sum(fg_missed_distance, na.rm = TRUE) / total_fg_missed,
    total_pat_att = sum(pat_made, na.rm = TRUE) + sum(pat_missed, na.rm = TRUE),
    total_pat_missed = sum(pat_missed, na.rm = TRUE)
  ) %>%
  arrange(desc(total_ppr))

cat(jsonlite::toJSON(k_leaders, pretty = FALSE))
