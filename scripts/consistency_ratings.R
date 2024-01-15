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

# Load installed packages

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

consistency_ratings_2023 <- player_stats_2023  %>%
  filter(season_type == "REG") %>%
  group_by(player_id, player_name, player_display_name, headshot_url) %>%
  summarize(
    total_ppr = sum(fantasy_points_ppr),
    ppr_ppg = (total_ppr / n()),
    consistency_rtg = (sd(fantasy_points_ppr) / ppr_ppg)
  ) %>%
  filter(total_ppr > 100) %>%
  arrange(consistency_rtg)

consistency_ratings_2023_json <-
  jsonlite::toJSON(consistency_ratings_2023, pretty = TRUE) # convert to JSON
# write JSON to file in wd
write(consistency_ratings_2023_json,
      file.path(json_folder, "consistency_ratings_2023.json"))