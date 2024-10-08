# config sourcing
current_script <- "off_def_epa.R"
dependent <- TRUE
szn <- 2023
source("config/script_config.R", local = TRUE)

# CRAN mirror for aws package download
chooseCRANmirror(graphics = FALSE, ind = 1)

object_key <- "off_def_epa.jpeg"

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
jpeg_binary <-
  as.raw(ggsave(
    filename = object_key,
    plot = plot_data,
    device = "jpeg",
    width = 12,
    height = 7
  ))

# Upload the temporary file to S3
aws.s3::put_object(
  file = object_key,
  object = object_key,
  bucket = bucket_name,
  content_type = "image/jpeg"
)

file.remove(object_key)
