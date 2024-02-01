# VARIABLES #####

# define common required packages
common_required_packages <- c(
  "dplyr",
  "ggplot2",
  "ggrepel",
  "nflfastR",
  "nflplotR",
  "nflreadr",
  "tibble",
  "tidyr",
  "tidyverse",
  "jsonlite"
)

# define s3 environment integration-specific packages
s3_required_packages <- c(
  "aws.signature",
  "aws.s3"
)

# define scripts and current script running configuration
epa_script <- "off_def_epa.R"
position_script <- "position_data.R"
kicking_script <- "kicking_data.R"

# define config/s3 bucket from config
config_file_path <- file.path("..", "back-end", "config.json")
config <- jsonlite::fromJSON(config_file_path)
bucket_name <- config$AWS_S3_BUCKET

# define seasons
szns <- 2023
szn_type <- "REG"

# FUNCTIONS #####

# install and load packages
install_and_load_packages <- function(packages) {
  # installing missing packages
  install_missing_packages <-
    packages[!(packages %in% installed.packages()[, "Package"])]
  if (length(install_missing_packages) > 0) {
    install.packages(install_missing_packages)
  }

  # load libraries from package name
  for (pkg in packages) {
    library(pkg, character.only = TRUE)
  }
}

# load data function
load_data <- function(szns, szn_type) {
  # Load player stats for the specified seasons and season type
  player_stats <- load_player_stats(szns) %>%
    filter(season_type == szn_type)

  # Load play-by-play data for the specified seasons and season type
  pbp <- load_pbp(szns) %>%
    filter(season_type == szn_type)

  # Return a list containing the loaded player stats and play-by-play data
  return(list(player_stats = player_stats, pbp = pbp))
}

# AWS S3 environment config
configure_s3_credentials <- function(config) {
  # Extract AWS credentials from the config variable
  aws_access_key_id <- config$S3_ACCESS_KEY_ID
  aws_secret_access_key <- config$AWS_SECRET_ACCESS_KEY
  aws_region <- config$AWS_REGION

  # AWS credentials as environment variables
  Sys.setenv(
    "AWS_ACCESS_KEY_ID" = aws_access_key_id,
    "AWS_SECRET_ACCESS_KEY" = aws_secret_access_key,
    "AWS_DEFAULT_REGION" = aws_region
  )
}

# DATA CONFIGURATION #####

# package installation for library accessability
install_and_load_packages(common_required_packages)

# load & store datasets
loaded_data <- load_data(szns, szn_type)

# define datasets from loaded_data
player_stats_2023 <- loaded_data$player_stats
pbp <- loaded_data$pbp

# EPA SCRIPT DEPENDANCIES #####

if (current_script == epa_script) {
  # pbp additional filtering #
  pbp <- pbp %>%
    filter(!is.na(posteam) & (rush == 1 | pass == 1))

  # install packages for and configure s3 environment
  install_and_load_packages(s3_required_packages)
  configure_s3_credentials(config)
}
