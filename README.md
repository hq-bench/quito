# QuitoBench

[![Project Page](https://img.shields.io/badge/Project-Page-f59e0b?style=flat-square)](https://hq-bench.github.io/quito)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat-square&logo=github)](https://github.com/alipay/quito-10b)
[![Paper](https://img.shields.io/badge/arXiv-Paper-b31b1b?style=flat-square&logo=arxiv)](https://arxiv.org/)
[![License](https://img.shields.io/badge/License-CC--BY%204.0-green?style=flat-square)](https://creativecommons.org/licenses/by/4.0/)
[![Visitors](https://hits.sh/hq-bench.github.io/quito.svg?view=total&color=f59e0b&labelColor=0d1117&label=Visitors&style=flat-square)](https://hits.sh/hq-bench.github.io/quito)

**A High-Quality, Billion-Scale CloudOps Time Series Forecasting Benchmark**

QuitoBench is a comprehensive benchmark for evaluating time series forecasting models on real-world CloudOps data from Alipay production systems. It evaluates **10 models** — spanning deep learning, foundation models, and statistical baselines — across **232,200 evaluation instances** organized into **8 balanced TSF regimes**.

## Key Statistics

| Metric | Value |
|--------|-------|
| Total Tokens | 1.6 Billion |
| Models Evaluated | 10 |
| Evaluation Instances | 232,200 |
| TSF Regimes | 8 |

## Benchmark Analyses

QuitoBench provides eight structured analyses:

1. **Overall Leaderboard** — Aggregate ranking across all configurations
2. **Context-Length Crossover** — DL vs. FM performance across context lengths (L=96, 576, 1024)
3. **TSF-Regime Specialization** — Model strengths across trend/seasonality/forecastability combinations
4. **Forecasting Mode** — Multivariate vs. univariate preference by model family
5. **Forecast-Horizon Robustness** — Performance degradation from H=48 to H=512
6. **Parameter Efficiency** — Return on investment: DL achieves comparable results with 59x fewer parameters
7. **Forecastability as Difficulty Factor** — Forecastability dominates prediction difficulty (3.64x effect)
8. **Cross-Benchmark Consistency** — Spearman correlation of 0.865 with Timer benchmark rankings

## Website

The project website is a static site hosted via GitHub Pages. Source files are located in the `website/` directory.

### Structure

```
website/
├── index.html              # Main page with leaderboard and analyses
├── assets/
│   ├── css/
│   │   └── style.css       # Styling
│   └── js/
│       └── main.js         # Interactivity (sorting, filtering, tabs)
└── .nojekyll               # GitHub Pages configuration
```

### Local Development

Open `website/index.html` directly in a browser, or serve it locally:

```bash
cd website
python -m http.server 8000
```

## Models Evaluated

| Rank | Model | Category | Overall MAE |
|------|-------|----------|-------------|
| 1 | CrossFormer | Deep Learning | 0.279 |
| 2 | Chronos | Foundation Model | 0.314 |
| 3 | TimesFM | Foundation Model | 0.319 |
| 4 | PatchTST | Deep Learning | 0.299 |
| 5 | TiRex | Foundation Model | 0.322 |
| 6 | iTransformer | Deep Learning | 0.301 |
| 7 | TSMixer | Deep Learning | 0.311 |
| 8 | DLinear | Deep Learning | 0.369 |
| 9 | ES | Baseline | 0.695 |
| 10 | SNaive | Baseline | 0.675 |

## Citation

If you use QuitoBench in your research, please cite:

```bibtex
@article{quitobench2025,
  title     = {QuitoBench: A High-Quality Billion-Scale CloudOps
               Time Series Benchmark},
  author    = {Alipay Research Team},
  journal   = {arXiv preprint},
  year      = {2025},
  url       = {https://github.com/alipay/quito-10b}
}
```

## License

This project is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).
