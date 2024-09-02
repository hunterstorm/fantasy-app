# config sourcing
current_script <- "off_run_pass.R"
dependent <- TRUE
szn <- 2023
source("config/script_config.R", local = TRUE)

# clean up pbp data to count run and pass plays by team
off_run_pass <- pbp %>%
  filter(play_type == "run" | play_type == "pass") %>%
  select(posteam, play_type) %>%
  group_by(posteam, play_type) %>%
  summarise(count = n())

# calculate total run and pass plays per team
off_total_plays <- off_run_pass %>%
  group_by(posteam) %>%
  summarise(total_plays = sum(count))

# use total_plays to calculate individual run and pass rates per team
off_run_pass_ratio <- off_run_pass %>%
  inner_join(off_total_plays, by = "posteam") %>%
  mutate(ratio = count / total_plays) %>%
  select(posteam, play_type, ratio) %>%
  # flipping the data so run and pass are columns instead of values
  pivot_wider(names_from = play_type, values_from = ratio)

# renaming columns to something more readable
colnames(off_run_pass_ratio) <- c("posteam","run_rate","pass_rate")
