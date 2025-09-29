import subprocess
import sys
import os
import pandas as pd
from io import StringIO
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import random


class PremierLeaguePredictor:
    def __init__(self):
        pass
    
    def _get_chrome_driver(self):
        """Initialize Chrome driver with proper options."""
        opts = Options()
        opts.add_argument("--headless=new")
        opts.add_argument("--no-sandbox")
        opts.add_argument("--disable-dev-shm-usage")
        opts.add_argument("--disable-gpu")
        opts.add_argument("--disable-extensions")
        opts.add_argument("--disable-images")
        opts.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        return webdriver.Chrome(options=opts)
    
    def pull_premier_league_team_passing(self) -> pd.DataFrame:
        """Scrape Premier League passing stats."""
        url = "https://fbref.com/en/comps/9/passing/Premier-League-Stats"
        print("Grabbing passing stats via Chrome...")

        driver = self._get_chrome_driver()
        try:
            driver.get(url)
            time.sleep(random.uniform(3, 5))
            html = driver.page_source
        finally:
            driver.quit()

        # Parse the main stats table
        df = pd.read_html(StringIO(html), match="Squad")[0]

        # Flatten multi-index columns
        df.columns = ["_".join(col).strip() if isinstance(col, tuple) else col
                      for col in df.columns]

        # Rename ugly columns
        rename = {
            "Unnamed: 0_level_0_Squad": "Squad",
            "Unnamed: 1_level_0_# Pl": "Players",
            "Unnamed: 2_level_0_90s": "90s",
            "Unnamed: 17_level_0_Ast": "Ast",
            "Unnamed: 18_level_0_xAG": "xAG",
            "Unnamed: 21_level_0_KP": "KP",
            "Unnamed: 22_level_0_1/3": "1/3",
            "Unnamed: 23_level_0_PPA": "PPA",
            "Unnamed: 24_level_0_CrsPA": "CrsPA",
            "Unnamed: 25_level_0_PrgP": "PrgP"
        }
        return df.rename(columns=rename)

    def scrape_fbref_table(self, url: str, match_keyword: str) -> pd.DataFrame:
        """A generic function to scrape a stats table from a given FBref URL."""
        print(f"Grabbing '{match_keyword}' data via Chrome...")
        driver = self._get_chrome_driver()
        try:
            driver.get(url)
            time.sleep(random.uniform(3, 5))
            html = driver.page_source
        finally:
            driver.quit()

        df = pd.read_html(StringIO(html), match=match_keyword)[0]

        # Robustly flatten multi-level column headers
        def flatten_columns(col):
            if isinstance(col, tuple):
                if 'Unnamed' in col[0]:
                    return col[1]
                return f"{col[0]}_{col[1]}"
            return col
        df.columns = [flatten_columns(col) for col in df.columns]
        return df

    def filter_teams(self, df: pd.DataFrame, teams: list[str]) -> pd.DataFrame:
        """Filter dataframe for specific teams."""
        return df[df["Squad"].isin(teams)]

    def merge_and_filter(self, teams: list[str], *dataframes: pd.DataFrame) -> pd.DataFrame:
        """Merges multiple dataframes on 'Squad' and filters for specified teams."""
        df_merged = dataframes[0]
        for df_next in dataframes[1:]:
            df_merged = pd.merge(df_merged, df_next, on="Squad", how="left", suffixes=('', '_drop'))
            df_merged.drop([col for col in df_merged.columns if 'drop' in col], axis=1, inplace=True)

        return df_merged[df_merged["Squad"].isin(teams)].copy()

    def basic_prediction(self, teams: list[str]):
        """Basic prediction using passing stats."""
        try:
            df = self.pull_premier_league_team_passing()
            df_filt = self.filter_teams(df, teams)
            
            if len(df_filt) < 2:
                return {
                    "success": False,
                    "error": f"Could not find data for both teams: {teams}",
                    "available_teams": df["Squad"].tolist()
                }
            
            # Compare basic stats
            team1_data = df_filt[df_filt["Squad"] == teams[0]].iloc[0]
            team2_data = df_filt[df_filt["Squad"] == teams[1]].iloc[0]
            
            # Simple comparison based on completion percentage and assists
            team1_score = 0
            team2_score = 0
            
            comparisons = []
            
            # Compare completion percentage
            if "Total_Cmp%" in df_filt.columns:
                t1_cmp = pd.to_numeric(team1_data["Total_Cmp%"], errors='coerce')
                t2_cmp = pd.to_numeric(team2_data["Total_Cmp%"], errors='coerce')
                if t1_cmp > t2_cmp:
                    team1_score += 1
                    winner = teams[0]
                elif t2_cmp > t1_cmp:
                    team2_score += 1
                    winner = teams[1]
                else:
                    winner = "Draw"
                
                comparisons.append({
                    "metric": "Pass Completion %",
                    "team1_value": t1_cmp,
                    "team2_value": t2_cmp,
                    "winner": winner
                })
            
            # Compare assists
            if "Ast" in df_filt.columns:
                t1_ast = pd.to_numeric(team1_data["Ast"], errors='coerce')
                t2_ast = pd.to_numeric(team2_data["Ast"], errors='coerce')
                if t1_ast > t2_ast:
                    team1_score += 1
                    winner = teams[0]
                elif t2_ast > t1_ast:
                    team2_score += 1
                    winner = teams[1]
                else:
                    winner = "Draw"
                
                comparisons.append({
                    "metric": "Assists",
                    "team1_value": t1_ast,
                    "team2_value": t2_ast,
                    "winner": winner
                })
            
            if team1_score > team2_score:
                predicted_winner = teams[0]
            elif team2_score > team1_score:
                predicted_winner = teams[1]
            else:
                predicted_winner = "Draw"
            
            return {
                "success": True,
                "prediction_type": "basic",
                "teams": teams,
                "predicted_winner": predicted_winner,
                "team1_score": team1_score,
                "team2_score": team2_score,
                "comparisons": comparisons,
                "stats_summary": df_filt[["Squad", "Total_Cmp", "Total_Att", "Total_Cmp%", "Ast"]].to_dict('records')
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def advanced_prediction(self, teams: list[str]):
        """Advanced prediction using multiple stats tables."""
        try:
            # Scrape multiple tables
            df_passing = self.scrape_fbref_table(
                "https://fbref.com/en/comps/9/passing/Premier-League-Stats", 
                "Squad"
            )
            df_defense = self.scrape_fbref_table(
                "https://fbref.com/en/comps/9/defense/Premier-League-Stats", 
                "Squad"
            )
            df_keepers = self.scrape_fbref_table(
                "https://fbref.com/en/comps/9/keepers/Premier-League-Stats", 
                "Squad"
            )

            # Merge and filter data
            df_merged_filtered = self.merge_and_filter(teams, df_passing, df_defense, df_keepers)
            
            if len(df_merged_filtered) < 2:
                return {
                    "success": False,
                    "error": f"Could not find complete data for both teams: {teams}",
                    "available_teams": df_passing["Squad"].tolist()
                }

            team1_stats = df_merged_filtered[df_merged_filtered["Squad"] == teams[0]].iloc[0]
            team2_stats = df_merged_filtered[df_merged_filtered["Squad"] == teams[1]].iloc[0]

            # Define balanced metrics for offense and defense
            metrics_to_compare = {
                "Ast": "Assists (Goal Creation)",
                "PrgP": "Progressive Passes (Attacking Intent)",
                "Tackles_TklW": "Tackles Won (Ball Winning)",
                "Performance_Saves": "Goalkeeper Saves (Shot Stopping)"
            }

            team1_score, team2_score = 0, 0
            comparisons = []

            for metric, description in metrics_to_compare.items():
                if metric not in df_merged_filtered.columns:
                    continue

                t1_val = pd.to_numeric(team1_stats[metric], errors='coerce')
                t2_val = pd.to_numeric(team2_stats[metric], errors='coerce')

                if pd.isna(t1_val) or pd.isna(t2_val):
                    continue

                if t1_val > t2_val:
                    team1_score += 1
                    winner = teams[0]
                elif t2_val > t1_val:
                    team2_score += 1
                    winner = teams[1]
                else:
                    winner = "Draw"

                comparisons.append({
                    "metric": description,
                    "team1_value": t1_val,
                    "team2_value": t2_val,
                    "winner": winner
                })

            if team1_score > team2_score:
                predicted_winner = teams[0]
            elif team2_score > team1_score:
                predicted_winner = teams[1]
            else:
                predicted_winner = "Draw"

            # Get summary stats
            cols_to_show = ["Squad", "Ast", "PrgP", "Tackles_TklW", "Performance_Saves"]
            cols_to_show = [col for col in cols_to_show if col in df_merged_filtered.columns]
            
            return {
                "success": True,
                "prediction_type": "advanced",
                "teams": teams,
                "predicted_winner": predicted_winner,
                "team1_score": team1_score,
                "team2_score": team2_score,
                "comparisons": comparisons,
                "stats_summary": df_merged_filtered[cols_to_show].to_dict('records'),
                "disclaimer": "This prediction uses key stats but CANNOT account for team form, player fitness, injuries, home/away advantage, or tactical matchups."
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def get_available_teams(self):
        """Get list of available teams."""
        try:
            df = self.pull_premier_league_team_passing()
            return {
                "success": True,
                "teams": sorted(df["Squad"].tolist())
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }