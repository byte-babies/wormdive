from .naminter import stream_naminter
from .sherlock import stream_sherlock
import json

# Global storage for results
global_results_store = {}

async def combined_stream(username: str):
    # Clear previous results for this username
    global_results_store[username] = []
    
    # Hashmap to track seen site names and avoid duplicates
    seen_sites = {}
    
    # Interleave two async generators
    it1 = stream_naminter(username).__aiter__()
    it2 = stream_sherlock(username).__aiter__()
    streams = [it1, it2]
    while streams:
        for it in streams.copy():
            try:
                chunk = await it.__anext__()
                # Store the result in global store (checking for duplicates)
                try:
                    parsed_chunk = json.loads(chunk)
                    site_name = parsed_chunk.get("name", "").lower()
                    
                    # Check if we've already seen this site
                    if site_name not in seen_sites:
                        seen_sites[site_name] = parsed_chunk["url"]
                        global_results_store[username].append(parsed_chunk)
                    else:
                        # If we have a duplicate, keep the one with the better URL or source
                        existing_url = seen_sites[site_name]
                        new_url = parsed_chunk["url"]
                        
                        # Prefer URLs that look more complete/secure
                        if (new_url.startswith("https://") and not existing_url.startswith("https://")) or \
                           (len(new_url) > len(existing_url)):
                            # Replace the existing entry
                            seen_sites[site_name] = new_url
                            # Remove the old entry and add the new one
                            global_results_store[username] = [
                                result for result in global_results_store[username] 
                                if result.get("name", "").lower() != site_name
                            ]
                            global_results_store[username].append(parsed_chunk)
                        
                except json.JSONDecodeError:
                    pass
                yield chunk
            except StopAsyncIteration:
                streams.remove(it)

async def get_all_results(username: str):
    """Get results from global store instead of scraping again"""
    if username in global_results_store:
        return global_results_store[username]
    else:
        # If no results in store, return empty list
        return []

def clear_results(username: str | None = None):
    """Clear results from global store"""
    if username:
        if username in global_results_store:
            del global_results_store[username]
    else:
        global_results_store.clear()

