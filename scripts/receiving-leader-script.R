library(tidyverse)
library(ggrepel)
library(nflreadr)
library(nflplotR)
library(dplyr)
library(magrittr)
library(jsonlite)

options(scipen = 9999)

data <- load_player_stats(2023)


receiving_data <- data %>%
  filter(receptions > 0) %>%
  group_by(player_display_name, headshot_url) %>%
  summarise(
    total_receiving_yards = sum(receiving_yards),
    total_receptions = sum(receptions),
    total_targets = sum(targets),
    total_receiving_tds = sum(receiving_tds),
    total_yac = sum(receiving_yards_after_catch),
  ) %>%
  arrange(desc(total_receiving_yards))


json_data <- jsonlite::toJSON(receiving_data, pretty = TRUE)

cat(json_data)