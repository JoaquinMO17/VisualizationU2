import networkx as nx
import json
import numpy as np
from collections import defaultdict
import community.community_louvain as community_louvain

def load_network(filepath):
    """Load the Facebook network from edge list."""
    print("Loading network...")
    G = nx.read_edgelist(filepath, create_using=nx.Graph(), nodetype=int)
    print(f"Network loaded: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")
    return G

def calculate_centralities(G):
    """Calculate all centrality measures."""
    print("Calculating centralities...")
    
    degree_centrality = nx.degree_centrality(G)
    print("  - Degree centrality done")
    
    closeness_centrality = nx.closeness_centrality(G)
    print("  - Closeness centrality done")
    
    betweenness_centrality = nx.betweenness_centrality(G, k=200, seed=42)
    print("  - Betweenness centrality done")
    
    pagerank = nx.pagerank(G, alpha=0.85)
    print("  - PageRank done")
    
    return {
        'degree': degree_centrality,
        'closeness': closeness_centrality,
        'betweenness': betweenness_centrality,
        'pagerank': pagerank
    }

def detect_communities(G):
    """Detect communities using Louvain algorithm."""
    print("Detecting communities...")
    partition = community_louvain.best_partition(G)
    modularity = community_louvain.modularity(partition, G)
    print(f"  - Communities detected with modularity: {modularity:.4f}")
    return partition, modularity

def calculate_clustering(G):
    """Calculate clustering coefficient."""
    print("Calculating clustering coefficient...")
    clustering = nx.clustering(G)
    return clustering

def generate_network_structure(G, centralities, partition, sample_size=800):
    """Generate network structure JSON for hero visualization."""
    print("Generating network structure...")
    
    # Sample nodes for visualization
    all_nodes = list(G.nodes())
    sampled_nodes = np.random.choice(all_nodes, size=min(sample_size, len(all_nodes)), replace=False)
    subgraph = G.subgraph(sampled_nodes)
    
    # Prepare nodes
    nodes = []
    for node in subgraph.nodes():
        nodes.append({
            'id': int(node),
            'community': int(partition[node]),
            'degree': float(centralities['degree'][node]),
            'betweenness': float(centralities['betweenness'][node]),
            'closeness': float(centralities['closeness'][node]),
            'pagerank': float(centralities['pagerank'][node]),
            'size': 3 + centralities['degree'][node] * 30
        })
    
    # Prepare links
    links = []
    for edge in subgraph.edges():
        links.append({
            'source': int(edge[0]),
            'target': int(edge[1])
        })
    
    # Add basic metrics
    network_data = {
        'nodes': int(G.number_of_nodes()),
        'edges': int(G.number_of_edges()),
        'density': float(nx.density(G)),
        'modularity': float(community_louvain.modularity(partition, G)),
        'graph': {
            'nodes': nodes,
            'links': links
        }
    }
    
    return network_data

def generate_top_nodes(centralities, top_n=10):
    """Generate top nodes data."""
    print("Generating top nodes...")
    
    # Get all nodes
    all_nodes = set(centralities['degree'].keys())
    
    # Create combined scores
    node_data = []
    for node in all_nodes:
        node_data.append({
            'id': int(node),
            'degree': float(centralities['degree'][node]),
            'closeness': float(centralities['closeness'][node]),
            'betweenness': float(centralities['betweenness'][node]),
            'pagerank': float(centralities['pagerank'][node])
        })
    
    # Sort by degree
    node_data.sort(key=lambda x: x['degree'], reverse=True)
    
    return {
        'nodes': node_data[:top_n]
    }

def generate_centrality_comparison(centralities, top_n=5):
    """Generate data for radial comparison chart."""
    print("Generating centrality comparison...")
    
    # Get top nodes by degree
    top_nodes = sorted(centralities['degree'].items(), key=lambda x: x[1], reverse=True)[:top_n]
    
    # Normalize values
    max_degree = max(centralities['degree'].values())
    max_closeness = max(centralities['closeness'].values())
    max_betweenness = max(centralities['betweenness'].values())
    max_pagerank = max(centralities['pagerank'].values())
    
    nodes = []
    for node, _ in top_nodes:
        nodes.append({
            'id': int(node),
            'degree': float(centralities['degree'][node] / max_degree),
            'closeness': float(centralities['closeness'][node] / max_closeness),
            'betweenness': float(centralities['betweenness'][node] / max_betweenness),
            'pagerank': float(centralities['pagerank'][node] / max_pagerank)
        })
    
    return {
        'nodes': nodes
    }

def generate_clustering_distribution(clustering, bins=50):
    """Generate clustering coefficient distribution."""
    print("Generating clustering distribution...")
    
    values = list(clustering.values())
    hist, bin_edges = np.histogram(values, bins=bins)
    
    # Create smooth distribution
    distribution = []
    for i in range(len(hist)):
        distribution.append({
            'x': float((bin_edges[i] + bin_edges[i+1]) / 2),
            'y': float(hist[i])
        })
    
    return {
        'values': distribution,
        'mean': float(np.mean(values)),
        'median': float(np.median(values))
    }

def generate_communities_data(G, partition):
    """Generate communities data for circle packing."""
    print("Generating communities data...")
    
    # Count nodes per community
    community_counts = defaultdict(list)
    for node, comm in partition.items():
        community_counts[comm].append(node)
    
    # Get centralities for top nodes
    degree_cent = nx.degree_centrality(G)
    
    communities = []
    for comm_id, nodes in community_counts.items():
        # Get top 3 nodes by degree in this community
        top_nodes = sorted(nodes, key=lambda x: degree_cent[x], reverse=True)[:3]
        
        communities.append({
            'id': int(comm_id),
            'size': len(nodes),
            'topNodes': [int(n) for n in top_nodes]
        })
    
    return {
        'communities': communities
    }

def generate_influence_flow(centralities, top_n=5):
    """Generate influence flow data (Sankey-style)."""
    print("Generating influence flow...")
    
    # Get top nodes for each metric
    top_degree = sorted(centralities['degree'].items(), key=lambda x: x[1], reverse=True)[:top_n]
    top_betweenness = sorted(centralities['betweenness'].items(), key=lambda x: x[1], reverse=True)[:top_n]
    top_pagerank = sorted(centralities['pagerank'].items(), key=lambda x: x[1], reverse=True)[:top_n]
    
    # Create nodes
    nodes = []
    node_map = {}
    idx = 0
    
    # Stage 1: High Degree
    for node, value in top_degree:
        nodes.append({
            'id': idx,
            'name': f'Node {node}',
            'stage': 0,
            'value': float(value)
        })
        node_map[(node, 0)] = idx
        idx += 1
    
    # Stage 2: High Betweenness
    for node, value in top_betweenness:
        nodes.append({
            'id': idx,
            'name': f'Node {node}',
            'stage': 1,
            'value': float(value)
        })
        node_map[(node, 1)] = idx
        idx += 1
    
    # Stage 3: High PageRank
    for node, value in top_pagerank:
        nodes.append({
            'id': idx,
            'name': f'Node {node}',
            'stage': 2,
            'value': float(value)
        })
        node_map[(node, 2)] = idx
        idx += 1
    
    # Create links
    links = []
    
    # Links from degree to betweenness
    degree_nodes = set([n for n, _ in top_degree])
    betweenness_nodes = set([n for n, _ in top_betweenness])
    common_1_2 = degree_nodes.intersection(betweenness_nodes)
    
    for node in common_1_2:
        if (node, 0) in node_map and (node, 1) in node_map:
            links.append({
                'source': node_map[(node, 0)],
                'target': node_map[(node, 1)],
                'value': float(centralities['degree'][node] + centralities['betweenness'][node]) / 2
            })
    
    # Links from betweenness to pagerank
    pagerank_nodes = set([n for n, _ in top_pagerank])
    common_2_3 = betweenness_nodes.intersection(pagerank_nodes)
    
    for node in common_2_3:
        if (node, 1) in node_map and (node, 2) in node_map:
            links.append({
                'source': node_map[(node, 1)],
                'target': node_map[(node, 2)],
                'value': float(centralities['betweenness'][node] + centralities['pagerank'][node]) / 2
            })
    
    return {
        'nodes': nodes,
        'links': links
    }

def main():
    # File paths
    input_file = 'assets/data/raw/facebook_combined.txt'
    output_dir = 'assets/data/'
    
    # Load network
    G = load_network(input_file)
    
    # Calculate all metrics
    centralities = calculate_centralities(G)
    partition, modularity = detect_communities(G)
    clustering = calculate_clustering(G)
    
    # Generate all JSON files
    print("\nGenerating JSON files...")
    
    # 1. Network structure (includes basic metrics)
    network_data = generate_network_structure(G, centralities, partition)
    with open(output_dir + 'network_structure.json', 'w') as f:
        json.dump(network_data, f, indent=2)
    print("  ✓ network_structure.json created")
    
    # 2. Top nodes
    top_nodes = generate_top_nodes(centralities)
    with open(output_dir + 'top_nodes.json', 'w') as f:
        json.dump(top_nodes, f, indent=2)
    print("  ✓ top_nodes.json created")
    
    # 3. Centrality comparison
    centrality_comparison = generate_centrality_comparison(centralities)
    with open(output_dir + 'centrality_comparison.json', 'w') as f:
        json.dump(centrality_comparison, f, indent=2)
    print("  ✓ centrality_comparison.json created")
    
    # 4. Clustering distribution
    clustering_dist = generate_clustering_distribution(clustering)
    with open(output_dir + 'clustering_distribution.json', 'w') as f:
        json.dump(clustering_dist, f, indent=2)
    print("  ✓ clustering_distribution.json created")
    
    # 5. Communities
    communities = generate_communities_data(G, partition)
    with open(output_dir + 'communities.json', 'w') as f:
        json.dump(communities, f, indent=2)
    print("  ✓ communities.json created")
    
    # 6. Influence flow
    influence = generate_influence_flow(centralities)
    with open(output_dir + 'influence_paths.json', 'w') as f:
        json.dump(influence, f, indent=2)
    print("  ✓ influence_paths.json created")
    
    print("\n✓ All data files generated successfully!")
    print(f"\nNetwork Summary:")
    print(f"  - Nodes: {G.number_of_nodes()}")
    print(f"  - Edges: {G.number_of_edges()}")
    print(f"  - Density: {nx.density(G):.6f}")
    print(f"  - Modularity: {modularity:.4f}")
    print(f"  - Communities: {len(set(partition.values()))}")

if __name__ == "__main__":
    main()