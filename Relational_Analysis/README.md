# Relational Data Visualization


## Project Overview

This project investigates  relational data using specialized Python libraries. It will implement four main types of relational visualizations and conduct a comparative analysis of their advantages and limitations. The dataset was:

**facebook_combined.txt** by Stanford 



### Key Research Questions



## Repository Structure

```
/Relational_Analysis 
|
├── /storyboard
|   └── Storyboard_Checkpoint_3.pdf      # Full analysis report & strategic context
|
├── relational_portafolio.ipynb          # Core Python/NetworkX analysis notebook
└── README.md  

```
## AI Disclosure Statement

This disclosure outlines the extent and nature of AI-assisted contributions across all components of the project, including the analytical notebooks, the interactive dashboard, and the accompanying storytelling documentation.

| Component | Description | Estimated AI Assistance Level|	Assistance Classification	|Human Role| Link|
| :--- | :--- |:--- | :--- |:--- |:--- |
|relational_portafolio.ipynb| NetworkX scripting for centrality, correlation matrices, and community detection (Louvain Algorithm).| ≈65% (Level 3 – Significant Assistance)| AI generated statistical functions (e.g., centrality calculations, PageRank), visualization scripts (Seaborn, Matplotlib), and interpretation drafts for network metrics.| Human defined the analytical questions, selected specific network metrics (PageRank, Betweenness), curated parameters (e.g., $k$ for layout, seed=42), and derived all strategic business insights|https://chatgpt.com/share/690815a8-7e48-8011-938b-54bd70560f27
|Storyboard_Checkpoint3| Strategic report summarizing the analysis, key findings, and multi-phase roadmap for performance marketing.|≈75% (Level 3 – Significant Assistance)|AI assisted in structuring the narrative, generating the "Big Idea," refining the strategic roadmap, and translating technical findings into business implications.|Human authored all key insights (e.g., "Optimal Influencer is a Strategic Bridge"), ensured factual accuracy, verified the data points, and finalized the budget allocation strategy.|https://claude.ai/share/779dbc7d-fc06-4724-af89-8caea5e1c251|
|README.md (Relational)| Documentation summarizing methodology, key findings, and strategic investment implications|≈85% (Level 4 – Near Full Automation)|AI generated the full document structure, translated content, synthesized key findings from the notebook output and the storyboard, and formatted the data tables.|Human provided all core input and output data (metrics, correlations, community count), reviewed the synthesis for strategic alignment, and confirmed the accuracy of all technical terms and values.|https://gemini.google.com/share/66e30977b784|
## Installation

### Prerequisites
- Python 3.8+

- Jupyter Notebook/Lab

- NetworkX, Pandas, Matplotlib, Seaborn

- python-louvain library (for community detection)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd VisualizationU2

# Navigate to the Relational_Analysis folder
cd Relational_Analysis

# Install specific dependencies (as per requirements.txt in the root)
pip install -r ../requirements.txt

```
## Usage

1. Run the relational_portafolio.ipynb notebook sequentially to:

2. Load the Facebook network.

3. Calculate four centrality measures (Degree, Closeness, Betweenness, PageRank).

4. Determine correlations between centrality measures.

5. Detect network communities (Louvain Algorithm).

6. Visualize network structure and influencer profiles.


### 2. Data Processing
Run the processing scripts to clean and merge raw data:

```python
# Gnerate the code 
python "Relational-Dashboard/generate_data.py"

```

### 3. Analysis Notebook

The notebook usage techniques to understand the structure of a real-world friendship network, using the facebook_combined.txt dataset from SNAP. Centrality metrics were calculated and compared, the network was visualized, and communities were identified to extract knowledge about influence and social connectivity.

| Metric | Value |
| :--- | :--- |
|Nodes	|4039 (Users)|
|Edges	|88234 (Friendship relations)|
|Density	|0.010820 (The network is very sparse but efficiently organized).
|Average Clustering Coefficient (Global)	|0.6055||Modularity (Louvain Algorithm)	|0.8350 (High value, indicating a strong community structure).|
|Detected Communities	|16|

## Methodology

The project's analytical framework is centered on Social Network Analysis (SNA) using the Facebook friendship network dataset. The methodology is structured in three core steps to move from raw network data to actionable marketing insights:

1. Network Initialization & Core Metrics
This phase established the foundational understanding of the network's topology.

Data Source: facebook_combined.txt (SNAP dataset).

Initialization: The graph was loaded into the NetworkX library as an undirected graph.

Core Metrics:

Density: Calculated to determine the overall sparsity and connectivity efficiency of the network.

Clustering Coefficient: Calculated to quantify the "small-world" nature and the tendency for nodes to form dense cliques.

2. Centrality and Influence Quantification
Four key centrality measures were computed to define distinct types of influence within the network.

Degree Centrality: Measures local popularity (number of direct connections).

Closeness Centrality: Measures global efficiency (how quickly a node can reach all others).

Betweenness Centrality: Measures strategic position (bridging capacity/control over information flow).

PageRank: Measures network authority and overall influence in information diffusion.

3. Structural Analysis & Strategic Targeting
This phase integrated the metrics to derive marketing-focused strategic insights.

Community Detection: The Louvain Algorithm was applied to find the best partition of the network, quantifying Modularity (Q=0.8350) to measure network segregation.

Correlation Analysis: A heatmap was generated to measure the Pearson correlation between the four centrality metrics. This step was crucial for defining the Optimal Influencer Profile (identifying the strong link between PageRank and Betweenness).

Targeting Visualization: Scatter plots (e.g., Betweenness vs. PageRank) were used as a tactical dashboard to segment high-value influencers (Super-Connectors) for tiered budget allocation.

## Investment Implications

The analysis of the network's structure, where influence is driven by strategic bridging (Betweenness) within highly segregated groups (Modularity $\approx 0.8350$), leads to the following strategic recommendations for optimizing the influencer marketing budget:
1. Refine the Influencer Selection Model
The primary action is to shift the selection criteria away from simple popularity (Degree) toward strategic position and authority.
- Prioritization Metric: The selection model must heavily weigh PageRank (Authority) and Betweenness (Bridging Capacity) over basic Degree or Closeness.
- Targeting Thresholds: The goal is to target candidates who exceed specific strategic thresholds (e.g., PR > 0.8 and Betweenness > 0.6) to ensure high diffusion capability.
- Finding the Super-Connectors: Focus on the "Super-Connectors" (top-right quadrant of the Betweenness vs. PageRank plot) as they possess maximum authority and bridging capacity, guaranteeing exceptional ROI in diffusion.


2. Implement a Tiered Budget Allocation Strategy
Budget allocation must be optimized based on the influencer's functional role in the network (Conversion vs. Reach).

| Segment | Network Profile |Campaign Goal	|Budget Allocation|
| :--- | :--- |  :--- | :--- |
|Premium Segment (Tier 1)	|High PageRank / High Betweenness	Conversion & Brand Lift	|Largest budget share, leveraging authority and strategic reach| |Reach Segment (Tier 2)|	High Betweenness / Low PageRank|	Reach & Awareness|	Low-cost complement used to ensure coverage across all 16 communities.|


3. Mitigate Network Risk and Ensure Diffusion
Given the network's vulnerability, diversification and specialized messaging are essential for success.

- Risk Diversification: Distribute the reach/awareness budget across a minimum of 5–7 bridge-influencers to mitigate the risk of network fragmentation caused by relying on a single structural node.

- Messaging Strategy: Implement a "Deep Trust" Messaging strategy that uses personal testimonials and social proof to penetrate the tightly-knit, high-clustering circles (cliques) observed in the network.

- Long-Term Monitoring: Track the Modularity Change Rate over time. A successful campaign should result in a slight decrease in modularity, indicating that the bridge-influencers are effectively creating new, lasting links between previously segregated communities.

### Strategy Recommendations
The strategic roadmap is divided into two phases: Tactical Optimization (Selection) and Execution & Monitoring (Messaging and Risk).

Phase 1: Tactical Influencer Selection (Optimization)

| Segment | Network Profile |Campaign Goal	|
| :--- | :--- |  :--- | 
|Build a Strategic Influencer Index (SII)	| Prioritize partners using a weighted index where PageRank (Authority) and Betweenness (Bridging) carry more weight than basic Degree (Popularity).|Index Score Benchmarks: Target all new candidates with specific thresholds (e.g., PR > 0.8 and Betweenness > 0.6).|
|Diversify Bridge Allocation|Distribute the reach/awareness budget across a minimum of 5-7 bridge-influencers to mitigate the risk of relying on a single structural node.|Risk Mitigation Score: Track campaign coverage across the 16 identified communities.|
|Implement Tiered Budget Assignment	|Allocate the highest budget to Tier 1 (Premium) "Super-Connectors" (High PageRank / High Betweenness) to drive conversion.|Conversion Rate (CR): Evaluate performance from these tiered partners.|

Phase 2: Messaging and Monitoring (Execution)

| Segment | Network Profile |Campaign Goal	|
| :--- | :--- |  :--- | 
|Implement "Deep Trust" Messaging|Develop creative concepts relying heavily on personal testimonial, social proof, and high perceived relevance, aligning with the high local clustering (cliques) observed.|Engagement Rate (ER): Measure effectiveness within the influencers' local community.|
|Launch Pilot Campaign & Benchmark|Use the newly developed Strategic Influencer Index (SII) to validate the entire strategy.|Cost Per Acquisition (CPA): Main success metric achieved via SII-selected partners.|
|Monitor Network Change|Track the Modularity Change Rate over time; a successful campaign should show a slight decrease in modularity, indicating new links are created between segregated communities.|Modularity Score and Network Density: Assessed 6 months post-campaign.|

## Limitations
The effectiveness and generalization of the findings are subject to the following limitations inherent in the methodology and the dataset:


- Static Dataset Limitation: The analysis is based on a static snapshot of the network (facebook_combined.txt). Social networks are highly dynamic, meaning the identified Super-Connectors and Modularity structure may shift over time, potentially degrading the long-term accuracy of the Strategic Influencer Index (SII).




- Correlation vs. Causation: The strong correlation between Betweenness and PageRank (0.76)  identifies an ideal profile but does not guarantee that this position is the direct cause of conversion. Campaign success ultimately depends on content relevance ("Deep Trust") and external factors.



- Vulnerability Risk: Relying heavily on a few high-betweenness nodes (Super-Connectors) creates a significant single point of failure (risk of fragmentation). If these key bridges are removed or fail to perform, the campaign's cross-community reach will be severely limited.



- Data Scope: The analysis is limited to the friendship network data provided and does not integrate behavioral metrics (e.g., actual engagement, purchase history, or sentiment), which are crucial for a full performance marketing evaluation.


- Targeting Complexity: The goal is to target 16 distinct communities. Successfully distributing the budget and tailoring messaging to multiple "bridge-influencers" across all these groups introduces complexity in execution and monitoring.


## Future Work

This project established a strong foundation for influencer marketing strategy by identifying key structural influencers within a static network snapshot. Future work should focus on integrating dynamic data, expanding the analysis scope, and developing predictive models for network performance.

1. Integrate Dynamic and Behavioral Data
The current model relies on structural position. Future steps must incorporate metrics that reflect real-time interaction and user behavior.

- Network Evolution: Transition the analysis to a dynamic model (e.g., using temporal graphs) to track the Modularity Change Rate and observe how the network structure and the roles of bridge nodes shift over time.

- Behavioral Metrics: Integrate Social Media Sentiment Analysis and Engagement Data (likes, shares, comments) to enrich the influencer profiles. This will help distinguish between mere structural influence and actual emotional resonance (authority).

- External Factors: Incorporate external data streams (e.g., seasonal trends, competitor campaign periods, or macroeconomic factors) to provide context for network changes and campaign effectiveness.

2. Expand Scope and Develop Predictive Tools
The analysis should be expanded to validate findings across different network types and transition to a predictive application.

- Comparative Analysis: Apply the Strategic Influencer Index (SII) methodology to other social network datasets (e.g., Instagram, Twitter) to test the generalizability of the findings regarding the PageRank/Betweenness correlation.

- Predictive Modeling: Develop machine learning models that use the calculated centrality metrics (especially PageRank and Betweenness) to forecast key performance indicators (KPIs) like Cost Per Acquisition (CPA) or Viral Reach before campaign launch.

- Real-Time Dashboarding: Create an interactive, real-time platform to monitor the performance of SII-selected influencers, tracking metrics like the Engagement Rate (ER) within their local communities and the overall Risk Mitigation Score.

3. Deepen Granularity of Structural Insights
- Altcoin Preference Patterns (Conceptual Link): While this project is about social networks, a future layer could examine how specific messaging styles perform differently across the 16 detected communities (analogous to the "Altcoin Preference Patterns" in geographic regions). This validates the need for tailored "Deep Trust" content.

- Structural Vulnerability Testing: Run simulations to specifically test the network's resilience by modeling the removal or underperformance of the identified Super-Connectors and quantifying the resultant fragmentation risk.

## Contributing

The ontributions to enhance the depth and applicability of this Social Network Analysis project. Please feel free to submit pull requests or open issues for:

- New Datasets: Integration of other social network graphs (e.g., Twitter, Instagram) for comparative analysis of the SII methodology.

- Methodological Improvements: Suggestions for advanced temporal analysis (e.g., dynamic graph metrics) or more refined community detection algorithms.

- Enhanced Visualizations: Improvements to the existing charts (heatmap, scatter plots) or the development of new, insightful structural visualizations.

- Predictive Model Integration: Development of machine learning scripts to forecast marketing KPIs based on the SII metrics.

- Bug Fixes or Documentation Improvements.


## License

This project is available for educational and research purposes.

## Acknowledgments

- **Data Sources:**
  - Stanford Network (search interest data)
- **Libraries:** pandas, statsmodels, plotly, matplotlib, seaborn

## Contact

For questions or collaboration inquiries, please open an issue in this repository.

---

**Note:** This analysis is for educational purposes only and should not be construed as financial advice. Cryptocurrency investments carry significant risk.
