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
                       "jsonlite",
                       "aws.signature",
                       "aws.s3")

# Install missing packages
install_missing_packages <- required_packages[!(required_packages %in% installed.packages()[,"Package"])]
if (length(install_missing_packages) > 0) {
  install.packages(install_missing_packages)
}

# Load packages into library
for (pkg in required_packages) {
  library(pkg, character.only = TRUE)
}

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

#AWS Config #####

# Define config file path relative to the working directory
config_file_path <- file.path("..", "back-end", "config.json")

# Read JSON configuration
config <- jsonlite::fromJSON(config_file_path)

# Extract AWS credentials from the list
aws_access_key_id <- config$S3_ACCESS_KEY_ID
aws_secret_access_key <- config$AWS_SECRET_ACCESS_KEY
aws_region <- config$AWS_REGION

# Set AWS credentials as environment variables
Sys.setenv("AWS_ACCESS_KEY_ID" = aws_access_key_id,
           "AWS_SECRET_ACCESS_KEY" = aws_secret_access_key,
           "AWS_DEFAULT_REGION" = aws_region)

# Set s3 bucket details
bucket_name <- config$AWS_S3_BUCKET

# Data config

szns <- 2023
szn_type <- "REG"

# Load Data

player_stats_2023 <- load_player_stats(szns) %>%
  filter(season_type = szn_type)

pbp <- load_pbp(szns) %>%
  filter(season_type == szn_type) %>%
  filter(!is.na(posteam) & (rush == 1 | pass == 1))
