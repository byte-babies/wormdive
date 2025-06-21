import requests


class GitHubScraper:
    session: requests.Session
    
    def __init__(self) -> None:
        self.session = requests.Session()

    def scrape_repositories(self, github_username: str) -> list[str]:
        """
        Takes in the username of a GitHub user and
        returns a list of all emails found.
        """
        repositories = []

        response = self.session.get(f"https://api.github.com/users/{github_username}/repos?per_page=100")
        repositories += response.json()
        while response.links.get('next'):
            response = self.session.get(response.links["next"])
            repositories += response.json()
        
        return [repository['name'] for repository in repositories]
                
if __name__ == "__main__":
    gh_scraper = GitHubScraper()
    print(gh_scraper.scrape_repositories("torvalds"))
