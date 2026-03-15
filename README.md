# QuitoBench

[![Project Page](https://img.shields.io/badge/Project-Page-f59e0b?style=flat-square)](https://hq-bench.github.io/quito)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat-square&logo=github)](https://github.com/alipay/quito-10b)
[![Dataset](https://img.shields.io/badge/HuggingFace-Dataset-ffd21e?style=flat-square&logo=huggingface)](https://huggingface.co/datasets/hq-bench/quitobench)
[![Paper](https://img.shields.io/badge/arXiv-Paper-b31b1b?style=flat-square&logo=arxiv)](https://arxiv.org/)
[![License](https://img.shields.io/badge/License-CC--BY%204.0-green?style=flat-square)](https://creativecommons.org/licenses/by/4.0/)
[![Visitors](https://hits.sh/hq-bench.github.io/quito.svg?view=total&color=f59e0b&labelColor=0d1117&label=Visitors&style=flat-square)](https://hits.sh/hq-bench.github.io/quito)

**A High-Quality Open Time Series Forecasting Benchmark**

Time series forecasting is critical across finance, healthcare, and cloud computing, yet progress is constrained by a fundamental bottleneck: the scarcity of large-scale, high-quality benchmarks. **QuitoBench** is a regime-balanced benchmark for time series forecasting with coverage across **8 trend x seasonality x forecastability (TSF) regimes**, designed to capture forecasting-relevant properties rather than application-defined domain labels.

The benchmark is built upon **Quito**, a billion-scale time series corpus of application traffic from Alipay spanning nine business domains. Benchmarking **10 models** — from deep learning, foundation models, and statistical baselines — across **232,200 evaluation instances**, we report four key findings:

- A **context-length crossover** where deep learning models lead at short context (L=96) but foundation models dominate at long context (L>=576)
- **Forecastability is the dominant difficulty driver**, producing a 3.64x MAE gap across regimes
- Deep learning models **match or surpass foundation models at 59x fewer parameters**
- Both model families benefit from more training data, but **deep learning exhibits substantially stronger data scaling**

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
| 2 | Chronos-2 | Foundation Model | 0.314 |
| 3 | TimesFM-2.5 | Foundation Model | 0.319 |
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
  title     = {QuitoBench: A High-Quality Open Time Series
               Forecasting Benchmark},
  author    = {Alipay Research Team},
  journal   = {arXiv preprint},
  year      = {2025},
  url       = {https://github.com/alipay/quito-10b}
}
```

## License

This project is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).
