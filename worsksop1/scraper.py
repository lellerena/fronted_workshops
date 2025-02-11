import sys
from bs4 import BeautifulSoup
import requests

def count_tags(url):
    """
    Scrapes a webpage and counts the occurrences of each HTML tag.

    Args:
        url: The URL of the webpage to scrape.

    Returns:
        A dictionary where keys are tag names and values are their counts,
        or None if there's an error.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.content, 'html.parser')
        tag_counts = {}
        for tag in soup.find_all(True):  # Find all tags
            tag_name = tag.name
            tag_counts[tag_name] = tag_counts.get(tag_name, 0) + 1

        return tag_counts
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scraper.py <URL>")
        sys.exit(1)

    target_url = sys.argv[1]
    tag_counts = count_tags(target_url)
    tags = ["h1", "h2", "h3"]

    if tag_counts:
        print("Tag counts:")
        for tag, count in tag_counts.items():
            if tag in tags:
                print(f"{tag}: {count}")
