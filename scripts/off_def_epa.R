# Install and load required packages
required_packages <- c("dplyr", "ggplot2", "nflplotR", "nflreadr", "aws.signature", "aws.s3", "jsonlite")

# CRAN mirror for aws package download
chooseCRANmirror(graphics = FALSE, ind = 1)

# Install missing packages
install_missing_packages <- required_packages[!(required_packages %in% installed.packages()[,"Package"])]
if (length(install_missing_packages) > 0) {
  install.packages(install_missing_packages)
}

# Load libraries
for (pkg in required_packages) {
  library(pkg, character.only = TRUE)
}

# Define config file path
setwd("C:/Users/Hunter/Documents/projects/fantasy-app")
config_file_path <- file.path("back-end", "config.json")


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
object_key <- "off_def_epa.jpeg"

# Load and process data
pbp <- load_pbp(2023) %>%
  filter(season_type == "REG") %>%
  filter(!is.na(posteam) & (rush == 1 | pass == 1))

# offensive epa
offense <- pbp %>%
  group_by(team = posteam) %>%
  summarise(off_epa = mean(epa, na.rm = TRUE))

# defensive epa
defense <- pbp %>%
  group_by(team = defteam) %>%
  summarise(def_epa = mean(epa, na.rm = TRUE))

# Generate plot
plot_data <- offense %>%
  inner_join(defense, by = "team") %>%
  ggplot(aes(x = off_epa, y = def_epa)) +
  geom_abline(slope = -1.5, intercept = (4:-3) / 10, alpha = .2) +
  geom_mean_lines(aes(x0 = off_epa, y0 = def_epa)) +
  geom_nfl_logos(aes(team_abbr = team), width = 0.07, alpha = 0.7) +
  labs(
    x = "Offense EPA/play",
    y = "Defense EPA/play",
    title = "2023 Offensive and Defensive EPA per Play"
  ) +
  theme_bw() +
  theme(
    plot.title = element_text(size = 12, hjust = 0.5, face = "bold")
  ) +
  scale_y_reverse()

# Convert the plot to binary data
jpeg_binary <- as.raw(ggsave(filename = object_key, plot = plot_data, device = "jpeg", width = 12, height = 7))

# Upload the temporary file to S3
aws.s3::put_object(file = object_key,
                   object = object_key,
                   bucket = bucket_name,
                   content_type = "image/jpeg")