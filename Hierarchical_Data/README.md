# **Checkpoint 2 – Hierarchical Data Visualization**

A data storytelling project exploring **hierarchical visualization techniques** to support strategic business decisions for *Terra Cotta Foods (TCF)*, a global food manufacturer expanding into Asia and Latin America.  
The analysis integrates demographic, economic, and organizational data through **four hierarchical visualizations** — Treemap, Sunburst, Dendrogram, and Multi-View Analysis — to identify optimal expansion routes, market opportunities, and proportional budget allocations.

---

## **Project Overview**

The project demonstrates how **hierarchical data visualization** enables data-driven strategic decisions in complex, multi-dimensional contexts.  
Through the use of demographic and macroeconomic datasets, the analysis addresses key business questions related to **market potential, internal alignment, route validation, and budget optimization**.

### **Core Objectives**
1. Quantify market opportunities based on purchasing power (GDP × Population).  
2. Align internal capabilities with external market structures.  
3. Validate supply and distribution routes across a 5-year time horizon.  
4. Optimize capital allocation between Asia and Latin America using multi-view visualization.

---

## **Repository Structure**

```
Hierarchical_Data/
├── data/
│   └── Demographic.csv                  # Core dataset (population, GDP, income tiers)
├── notebooks/
│   ├── 01_Treemap.ipynb                 # Market Opportunity Quantification
│   ├── 01_sunburst.ipynb                # Internal–External Alignment
│   ├── 01_Dendogram.ipynb               # Strategic Route Validation (2020–2024)
│   └── 01_circular_treemap.ipynb        # Multi-View Market Momentum Analysis
└── Storyboard/
    └── Storyboard.pdf                   # Full visual narrative and executive report
```

---

## **Visualization Descriptions**

### **1. Hierarchical Treemap – Market Opportunity Quantification**
**Business Question:**  
Where is the highest concentration of purchasing capacity (GDP × Population)?  

**What It Shows:**  
A hierarchical view of **Asia and Latin America** segmented by GDP per capita income tiers.  
- Rectangle size = population (consumer base)  
- Color intensity = GDP per capita (purchasing power)

**Key Insight:**  
Asia dominates 75% of total purchasing power, led by **China, India, and Indonesia**.  
Latin America contributes 25%, concentrated in **Brazil** and **Mexico**.  

**Decision Point:**  
Allocate **75% of investment to Asia-Pacific** and **25% to Latin America** for balanced diversification.

---

### **2. Sunburst Diagram – Internal–External Alignment**
**Business Question:**  
How do TCF’s internal resources align with external market hierarchies?  

**What It Shows:**  
A dual-layer perspective combining:  
1. **Internal organization structure** (e.g., Engineering, Sales, R&D).  
2. **External market structure** (Continent → Income Group → Country).  

**Key Insight:**  
Engineering accounts for 50% of internal capacity, aligning with Asia’s *upper-middle income* markets.  
Latin America, with emerging markets, requires **premium-focused products**.  

**Decision Point:**  
Redirect product development to match market maturity levels —  
cost-efficient designs for Asia, premium offerings for Latin America.

---

### **3. Dendrogram – Strategic Route Validation (2020–2024)**
**Business Question:**  
Which countries demonstrate 5-year stability in risk-opportunity profiles?  

**What It Shows:**  
Hierarchical clustering of 2020–2024 indicators identifies **two validated strategic routes**:
- **Viable Route:** Vietnam, Bangladesh, Mexico, Indonesia, Brazil (manufacturing & distribution)
- **Alternative Route:** Colombia, Peru, Turkey, U.S., Singapore (diversification & premium hubs)

**Key Insight:**  
The **Viable Route** offers the lowest operating cost volatility and highest consistency, while the **Alternative Route** ensures geopolitical risk mitigation.  

**Decision Point:**  
Prioritize **70% of investment** in the Viable Route and **30%** in Alternative Route diversification.

---

### **4. Circular Treemap (Multi-View Analysis) – Budget Validation & Market Momentum**
**Business Question:**  
How should TCF allocate its $20M budget according to market opportunity and timing?  

**What It Shows:**  
Four integrated perspectives:
- Budget allocation by department  
- Geographic hierarchy by GDP  
- Animated viability maps (Asia vs. LatAm, 2020–2024)  
- Market segmentation trade-off matrix  

**Key Insights:**
- Product Development ($3.5M, 17.5%) is the largest investment — validates product-led strategy.  
- Brightening bubbles (Vietnam, Bangladesh) reveal **optimal entry windows** for early market presence.  
- Marketing budget should decrease (-2.5%) and Sales increase (+5.5%) to support dual-region execution.  

**Decision Point:**  
Reallocate Sales budget to **18%** and prioritize early market entries in **Vietnam** and **Bangladesh**.

---
## General Findings

- **Influence ≠ Popularity:** Moderate correlation (0.67) between Degree and PageRank confirms popularity is insufficient for true authority.  
- **Strategic Bridges Drive Diffusion:** High Betweenness + High PageRank nodes are key to viral reach.  
- **High Modularity (Q=0.8350):** Strong community segregation demands cross-community bridge targeting.  
- **Deep Trust Dynamics:** Average clustering coefficient (0.6055) implies localized, tight trust networks.  
- **Vulnerability:** Network efficiency relies on a few Super-Connectors — potential risk if deactivated.

---

## **AI Disclosure Statement**

This section documents the **extent and nature of AI-assisted contributions** in this project, including code generation, visualization design, and documentation drafting.

### **AI Assistance Breakdown**

| Component | Description | Estimated AI Assistance Level | Assistance Classification | Human Role | Link |
|------------|-------------|-------------------------------|----------------------------|-------------|------|
| **01_Treemap.ipynb** | Implements hierarchical market visualization (GDP × Population). | **≈70% (Level 3 – Significant Assistance)** | AI generated visualization scripts (Plotly, Seaborn) and analytical commentary. | Human refined parameters, verified calculations, and narrative accuracy. | [link](https://chat.deepseek.com/share/ov6mk7z5q5ja9n6rwv) |
| **01_sunburst.ipynb** | Builds dual-layer sunburst of internal vs external hierarchies. | **0% (Level 0 – No AI Assistance)** |  Sunburst was based entirely on the version provided by the instructor; no AI-generated code or text was used. | Human adapted layout and integrated existing dataset for alignment. |  |
| **01_Dendogram.ipynb** | Performs hierarchical clustering (Ward linkage, Euclidean distance). | **≈75% (Level 3 – Significant Assistance)** | AI generated analytical code and dendrogram styling. | Human validated cluster interpretations and contextual relevance. | [link](https://gemini.google.com/share/be6471c7444a) [link 2](https://gemini.google.com/share/7309f79ef30f) |
| **01_circular_treemap.ipynb** | Integrates financial and spatial metrics for budget validation. | **≈65% (Level 3 – Significant Assistance)** | AI proposed visual design and dashboard integration logic. | Human refined visual coherence and verified key insights. | [link](https://gemini.google.com/share/1ace67f524a9) |
| **Storyboard.pdf** | Visual storytelling document summarizing findings. | **≈75% (Level 3 – Significant Assistance)** | AI contributed to narrative structure, language editing, and section flow. | Human authored insights, ensured factual consistency, and finalized design. | [link](https://claude.ai/share/15baef99-0afe-472e-a2c3-40f4f0ce89f9) |

## Nature of AI Contributions

**AI tools supported:**
- Code template generation for visualization and network metrics.  
- Drafting interpretive summaries and formatting documentation.  
- Clarifying language, tone, and structural consistency.  

**Human contributions ensured:**
- Empirical validation of all metrics and calculations.  
- Interpretation accuracy and consistency with business questions.  
- Ethical compliance and originality of written analysis.  

---

## Technical Requirements

### **Libraries**
- pandas  
- numpy  
- matplotlib  
- seaborn  
- plotly  
- networkx  
- sklearn *(preprocessing)*  
- scipy *(spatial, cluster.hierarchy)*  

### **Environment**
- Python 3.8+  
- Jupyter Notebook  

---

## Installation

```bash
# Clone repository
git clone <repository-url>
cd Relational_Analysis

# Install dependencies
pip install -r requirements.txt
```

> ⚠️ If a `requirements.txt` file is not present, manually install the listed libraries.

---

## Usage

### 1. Notebook Execution
Open and execute the notebook:
```bash
jupyter notebook relational_portafolio.ipynb
```

### 2. Storyboard Reference
Access the storyboard for narrative visualization explanations:  
`Storyboard/Storyboard_Checkpoint 3.pdf`

---

## Methodology

The notebook applies **Network Analysis** techniques using the **Facebook Combined Network dataset** (sample of 800 nodes).  
Four core centrality measures are calculated to evaluate structural importance:

| **Metric**              | **Interpretation**                                       |
|--------------------------|----------------------------------------------------------|
| Degree Centrality        | Popularity — number of direct connections.               |
| Closeness Centrality     | Proximity — how close a node is to all others.           |
| Betweenness Centrality   | Bridge role — how often a node lies on shortest paths.   |
| PageRank                 | Authority — recursive influence based on quality links.  |

Each visualization answers a key **business question** related to influencer targeting, network efficiency, and budget optimization.

---


## Limitations

- Results depend on the sampled subgraph (800 nodes).  
- Centrality measures are static and may change over time.  
- Visualization scalability decreases for very large graphs.  
- Business implications are theoretical and for educational use only.

---

## Future Work

- Expand to **dynamic network analysis** (temporal evolution).  
- Integrate **sentiment and engagement data** for influencer scoring.  
- Automate influencer segmentation via **clustering models**.  
- Develop an **interactive dashboard** with filtering and simulation.

---

## Contributing

Contributions are welcome for:
- Adding new centrality metrics or visualization layers.  
- Improving storytelling dashboards.  
- Extending to real-world influencer datasets.

---

## **License and Acknowledgments**

This project is for **educational and research purposes** as part of *Checkpoint 2 – Data Visualization* at *Universidad Politécnica de Yucatán (UPY)*.  
Data sourced from public repositories (World Bank, open demographic datasets).  
Visualization libraries used: `pandas`, `plotly`, `matplotlib`, `seaborn`.

---

## Contact

For academic inquiries or collaboration:  
Please open an **issue** in this repository or contact the project author through the **institutional communication channel.**

---

> **Note:**  
> This project is part of an academic visualization practice.  
> All analyses, figures, and interpretations were verified for conceptual validity and ethical standards.


