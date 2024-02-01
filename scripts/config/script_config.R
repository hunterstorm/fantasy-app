# VARIABLES #####

# define scripts to compare to the variable current_script
# current_script runs on each main script
# used for dependencies (packages, filters, environments, etc)
epa_script <- "off_def_epa.R"
position_script <- "position_data.R"
kicking_script <- "kicking_data.R"

# define config/s3 bucket from config
# json file containing credentials. should be encrypted
config_file_path <- file.path("..", "back-end", "config.json")
config <- jsonlite::fromJSON(config_file_path)
bucket_name <- config$AWS_S3_BUCKET

# define seasons
szns <- 2023
szn_type <- "REG"

# SOURCES #####

# required packages and a function to execute install and load libaries
source("config/packages.R", local = TRUE)

#  functions that load data and set environments
source("config/setup_functions.R", local = TRUE)

# runs the functions sourced from above to load data
source("config/data_processing.R", local = TRUE)

# check if main script contains a dependency
# dependent <- TRUE is written in a dependent script
if (exists("dependent") && dependent) {
    # locates the dependent script and performs a function
    source("config/dependencies.R", local = TRUE)
}
