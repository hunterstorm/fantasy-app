# Install and load required packages
required_packages <- c("dplyr", "ggplot2", "nflplotR", "nflreadr")

# Install missing packages
install_missing_packages <- required_packages[!(required_packages %in% installed.packages()[,"Package"])]
if (length(install_missing_packages) > 0) {
  install.packages(install_missing_packages)
}

library(nflreadr)
library(dplyr)
library(ggplot2)
library(nflplotR)

graphics_folder <- file.path(getwd(), "graphics")

existing_file <- file.path(graphics_folder, "off_def_epa.jpeg")
if (file.exists(existing_file)) {
  file.remove(existing_file)
}

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

# plot the data
offense %>%
  inner_join(defense, by = "team") %>%
  ggplot(aes(x = off_epa, y = def_epa)) +
  # tier lines
  geom_abline(slope = -1.5, intercept = (4:-3) / 10, alpha = .2) +
  # nflplotR red mean lines, logos, labels
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

ggsave(
  filename = file.path(graphics_folder, "off_def_epa.jpeg"),
  device = "jpeg",
  width = 12,
  height = 7
)
