import { Sports } from '@mui/icons-material';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

export default function getPositionSections(player, rankings) {
    const sections = {
        wr: [
            {
                title: 'Overall',
                stats: [
                    { label: 'Total PPR', value: player?.total_ppr, icon: <SportsFootballIcon />, rank: rankings?.total_ppr },
                ],
            },
            {
                title: 'Receiving',
                stats: [
                    { label: 'Total Rec Yards', value: player?.total_rec_yards, icon: <SportsFootballIcon />, rank: rankings?.total_rec_yards },
                    { label: 'Total Receptions', value: player?.total_rec, icon: <SportsFootballIcon />, rank: rankings?.total_rec },
                    { label: 'Total Targets', value: player?.total_targets, icon: <SportsFootballIcon />, rank: rankings?.total_targets },
                    { label: 'Total Rec TD', value: player?.total_rec_tds, icon: <SportsFootballIcon />, rank: rankings?.total_rec_tds },
                    { label: 'Total YAC', value: player?.total_yac, icon: <SportsFootballIcon />, rank: rankings?.total_yac },
                    { label: 'Avg Target Share', value: `${(player?.avg_target_share * 100).toFixed(0)}%`, icon: <SportsFootballIcon />, rank: rankings?.avg_target_share },
                    { label: 'Avg Rec EPA', value: player?.avg_rec_epa, icon: <SportsFootballIcon />, rank: rankings?.avg_rec_epa },
                ],
            }
        ],
        rb: [
            {
                title: 'Overall',
                stats: [
                    { label: 'Total PPR', value: player?.total_ppr, icon: <SportsFootballIcon />, rank: rankings?.total_ppr },
                    { label: 'Total TD', value: player?.total_tds, icon: <SportsFootballIcon />, rank: rankings?.total_tds },
                    { label: 'Total Touches', value: player?.total_touches, icon: <SportsFootballIcon />, rank: rankings?.total_touches },
                ],
            },
            {
                title: 'Rushing',
                stats: [
                    { label: 'Total Carries', value: player?.total_carries, icon: <SportsFootballIcon />, rank: rankings?.total_carries },
                    { label: 'Total Rushing Yards', value: player?.total_rush_yds, icon: <SportsFootballIcon />, rank: rankings?.total_rush_yds },
                    { label: 'Total Rushing TD', value: player?.total_rush_tds, icon: <SportsFootballIcon />, rank: rankings?.total_rush_tds },
                    { label: 'Avg Rush EPA', value: player?.avg_rush_epa, icon: <SportsFootballIcon />, rank: rankings?.avg_rush_epa },
                ],
            },
            {
                title: 'Receiving',
                stats: [
                    { label: 'Total Receptions', value: player?.total_rec, icon: <SportsFootballIcon />, rank: rankings?.total_rec  },
                    { label: 'Total Rec TD', value: player?.total_rec_tds, icon: <SportsFootballIcon />, rank: rankings?.total_rec_tds  },
                    { label: 'Total Rec Yards', value: player?.total_rec_yds, icon: <SportsFootballIcon />, rank: rankings?.total_rec_yds },
                    { label: 'Avg Target Share', value: `${(player?.avg_target_share * 100).toFixed(0)}%`, icon: <SportsFootballIcon />, rank: rankings?.avg_target_share },
                    { label: 'Avg Rec EPA', value: player?.avg_rec_epa, icon: <SportsFootballIcon />, rank: rankings?.avg_rec_epa },
                    { label: 'Total Targets', value: player?.total_targets, icon: <SportsFootballIcon />, rank: rankings?.total_targets },
                ],
            },
        ],
        qb: [
            {
                title: 'Overall',
                stats: [
                    { label: 'Total PPR', value: player?.total_ppr, icon: <SportsFootballIcon />, rank: rankings?.total_ppr}
                ]
            },
            {
                title: "Passing",
                stats: [
                    { label: "Total Pass Yards", value:player?.total_pass_yds, icon: <SportsFootballIcon />, rank: rankings?.total_pass_yds },
                    { label: "Total Completions", value: player?.total_completions, icon: <SportsFootballIcon />, rank: rankings?.total_completions },
                    { label: "Completion Rate", value: `${(player?.comp_rate * 100).toFixed(0)}%`, icon: <SportsFootballIcon />, rank: rankings?.comp_rate },
                    { label: "Total Attempts", value: player?.total_attempts, icon: <SportsFootballIcon />, rank: rankings?.total_attempts },
                    { label: "Total Pass TD",  value: player?.total_pass_tds, icon: <SportsFootballIcon />, rank: rankings?.total_pass_tds },
                    { label: "Total INT", value: player?.total_ints, icon: <SportsFootballIcon />, rank: rankings?.total_ints },
                    { label: "TD / INT Rate", value: `${player?.td_int_rate?.toFixed(2)}`, icon: <SportsFootballIcon />, rank: rankings?.td_int_rate },
                    { label: "Avg Pass EPA", value: player?.avg_passing_epa?.toFixed(2), icon: <SportsFootballIcon />, rank: rankings?.avg_passing_epa}
                ]
            },
            {
                title: "Rushing",
                stats: [
                    {label: "Total Carries", value: player?.total_carries, icon: <SportsFootballIcon />, rank: rankings?.total_carries},
                    {label: "Total Rush Yards", value: player?.total_rush_yds, icon: <SportsFootballIcon />, rank: rankings?.total_rush_yds}
                ]
            }
        ]
    };
    return sections
}
