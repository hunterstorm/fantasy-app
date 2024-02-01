# package installation for library accessability
install_and_load_packages(common_required_packages)

# load & store datasets
loaded_nfl_data <- load_nfl_data(szns, szn_type)

# define datasets from loaded_data
player_stats_2023 <- loaded_nfl_data$player_stats
pbp <- loaded_nfl_data$pbp
