# config sourcing
current_script <- "trending_targets.R"
dependent <- TRUE
szn <- 2023
source("config/script_config.R", local = TRUE)

# create function to calculate slope of targets over weeks
targets_slope <- function(week, targets) {
  if(length(week) < 3) return(NA) # return NA if not more than 3 weeks of data
  fit <- lm(targets ~ week)
  return(coef(fit)[2])
}

# create dataframe with players and their target trends
trending_targets <- player_stats_2023 %>%
  filter(position == "WR" | position == "RB" | position == "TE") %>%
  group_by(
    player_id,
    player_name,
    player_display_name,
    position,
    recent_team,
    headshot_url
  ) %>%
  arrange(desc(week)) %>%
  slice_head(n = 3) %>% # only take last 3 weeks
  summarize(target_trend = targets_slope(week, targets)) %>%
  filter(target_trend > 0) # looking at players where targets are increasing