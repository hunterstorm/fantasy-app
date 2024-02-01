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
