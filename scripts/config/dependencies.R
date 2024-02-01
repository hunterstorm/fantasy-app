# DEPENDENCY FUNCTIONS #####

# epa dependencies
handle_epa_dependencies <-
    function(pbp, s3_required_packages, config) {
        # pbp additional filtering #
        pbp <- pbp %>%
            filter(!is.na(posteam) & (rush == 1 | pass == 1))

        # install packages for and configure s3 environment
        install_and_load_packages(s3_required_packages)
        configure_s3_credentials(config)
    }

# dependency callbacks
if (current_script == epa_script) {
    handle_epa_dependencies(pbp, s3_required_packages, config)
}
