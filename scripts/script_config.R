# Install required packages

required_packages <- c("dplyr",
                       "ggplot2",
                       "ggrepel",
                       "nflfastR",
                       "nflplotR",
                       "nflreadr",
                       "tibble",
                       "tidyr",
                       "tidyverse",
                       "jsonlite")

# Install missing packages
install_missing_packages <- required_packages[!(required_packages %in% installed.packages()[,"Package"])]
if (length(install_missing_packages) > 0) {
  install.packages(install_missing_packages)
}

# Load packages into library

library(required_packages)

# Create json directory for position data

json_folder <- file.path(getwd(), "json-files", "position-data")

if (!dir.exists(json_folder)) {
  dir.create(json_folder)
}

#Create graphics directory for plots

graphics_folder <- file.path(getwd(), "graphics")

if (!dir.exists(graphics_folder)) {
  dir.create(graphics_folder)
}

# Data config

szns <- 2023
szn_type <- "REG"

# Load Data

player_stats_2023 <- load_player_stats(szns) %>%
  filter(season_type = szn_type)

pbp <- load_pbp(szns) %>%
  filter(season_type == szn_type) %>%
  filter(!is.na(posteam) & (rush == 1 | pass == 1))
