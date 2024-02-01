# VARIABLES #####

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

# source configuration components
source("config/packages.R")
source("config/setup_functions.R")
source("config/data_processing.R")
source("config/dependencies.R")
