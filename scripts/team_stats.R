# config sourcing
current_script <- "off_run_pass.R"
dependent <- TRUE
szn <- 2023
source("config/script_config.R", local = TRUE)

# Calculate team offensive stats using pbp

team_stats <- pbp %>%
  group_by(posteam) %>%
  summarize(
    total_yards = sum(yards_gained, na.rm = TRUE),
    total_run_yards = sum(yards_gained[play_type == "run"], na.rm = TRUE),
    total_pass_yards = sum(yards_gained[play_type == "pass"], na.rm = TRUE),
    total_fg_made = sum(play_type == "field_goal" & field_goal_result == "made", na.rm = TRUE),
    total_fg_missed = sum(play_type == "field_goal" & field_goal_result == "missed", na.rm = TRUE),
    fg_rate = total_fg_made / sum(play_type == "field_goal", na.rm = TRUE)
  )

# Calculate run and pass rate, then join to team_stats

# clean up pbp data to count run and pass plays by team
off_run_pass <- pbp %>%
  filter(play_type == "run" | play_type == "pass") %>%
  select(posteam, play_type) %>%
  group_by(posteam, play_type) %>%
  summarize(count = n())

# calculate total run and pass plays per team
off_total_plays <- off_run_pass %>%
  group_by(posteam) %>%
  summarize(total_plays = sum(count))

# use total_plays to calculate individual run and pass rates per team
off_run_pass_ratio <- off_run_pass %>%
  inner_join(off_total_plays, by = "posteam") %>%
  mutate(ratio = count / total_plays) %>%
  select(posteam, play_type, ratio) %>%
  # flipping the data so run and pass are columns instead of values
  pivot_wider(names_from = play_type, values_from = ratio)

# renaming columns to something more readable
colnames(off_run_pass_ratio) <- c("posteam", "run_rate", "pass_rate")

# join rate data to team_stats
team_stats <- off_run_pass_ratio %>%
  full_join(team_stats, by = "posteam")

# clean up N/A values for posteam
team_stats <- team_stats[complete.cases(team_stats[, "posteam"]), ]

cat(jsonlite::toJSON(team_stats, pretty = FALSE))
