# load nflfastR pbp and player_stats datasets
load_nfl_data <- function(szns, szn_type) {
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
