# config sourcing
current_script <- "trending_carries.R"
dependent <- TRUE
szn <- 2023
source("config/script_config.R", local = TRUE)

carries_slope <- function(week, carries) {
  if(length(week) < 3) return(NA) # return NA if not more than 3 weeks of data
  fit <- lm(carries ~ week)
  return(coef(fit)[2])
}

trending_carries <- player_stats_2023 %>%
  filter(position == "RB") %>%
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
  summarize(carry_trend = targets_slope(week, carries)) %>%
  filter(carry_trend > 0) %>% # looking at players where carries are increasing
  mutate(carry_trend = round(carry_trend, 2))