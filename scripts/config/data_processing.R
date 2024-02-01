# package installation for library accessability
install_and_load_packages(common_required_packages)

# load & store datasets
loaded_data <- load_data(szns, szn_type)

# define datasets from loaded_data
player_stats_2023 <- loaded_data$player_stats
pbp <- loaded_data$pbp
