import type { DownloadProduct, TeamContent } from "@/lib/site-content";

type ProductTranslation = Pick<
  DownloadProduct,
  "title" | "shortTitle" | "description" | "updateNote" | "filters" | "tableMeta" | "details"
> & {
  references?: Record<
    string,
    Partial<Pick<NonNullable<DownloadProduct["references"]>[number], "title" | "note" | "citationGb" | "citationApa6">>
  >;
};

export const productTranslationsEn: Record<string, ProductTranslation> = {
  "global-cmip6-pm25-calibrated": {
    title: "Global 1° CMIP6 PM2.5 Data (Annually Calibrated Data)",
    shortTitle: "Global CMIP6 Annually Calibrated PM2.5 Data",
    description:
      "CMIP6 scenario-based PM2.5 concentration data at a global 1° spatial resolution for future air-pollution exposure assessment, health-risk assessment, and scenario comparison.",
    updateNote: " ",
    filters: {
      years: Array.from({ length: 40 }, (_, index) => String(2015 + index)),
      provinces: ["Global"],
      scenarios: ["SSP1", "SSP2", "SSP3", "SSP5"],
      models: ["As specified in the application"],
      formats: ["GeoTIFF"],
    },
    tableMeta: {
      yearRange: "2015-2054",
      dataFormat: "GeoTIFF",
      spatialResolution: "Global",
      temporalResolution: "Annual",
      dimensions: "PM2.5 concentration, year, SSP scenario, CMIP6 model",
      releaseDate: "Provided upon application",
    },
    details: [
      {
        label: "About the Data",
        value:
          "This dataset provides CMIP6 scenario-based PM2.5 concentrations at a global 1° spatial resolution for future air-pollution exposure assessment, health-risk assessment, and scenario comparison. It primarily contains calibrated raster data by model, scenario, and year, mainly in GeoTIFF (.tif) format.",
      },
      { label: "Time Range", value: "2015-2054" },
      { label: "Spatial Coverage", value: "Global, 1° spatial resolution" },
      { label: "Selection Dimensions", value: "Year, SSP scenario, and CMIP6 model" },
      {
        label: "Additional Notes",
        value:
          "Example file name: adjcon_model_ssp_year.tif. The baseline concentration is the three-year moving-average concentration for 2015.",
      },
    ],
  },
  "global-cmip6-pm25-statistics": {
    title: "Global 1° CMIP6 PM2.5 Data (Multi-model Statistical Data)",
    shortTitle: "Global CMIP6 Multi-model Statistical PM2.5 Data",
    description:
      "Multi-model PM2.5 statistics compiled from CMIP6 model outputs for different SSP scenarios and selected years.",
    updateNote: "Apply by year, SSP scenario, and statistical measure through the Wenjuanxing form.",
    filters: {
      years: ["2015", "2020", "2025", "2030", "2035", "2040", "2045", "2050"],
      provinces: ["Global"],
      scenarios: ["SSP1", "SSP2", "SSP3", "SSP5"],
      models: ["Multi-model mean", "Median", "Minimum", "Maximum", "Standard deviation"],
      formats: ["GeoTIFF"],
    },
    tableMeta: {
      yearRange: "2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050",
      dataFormat: "GeoTIFF",
      spatialResolution: "Global",
      temporalResolution: "5 years",
      dimensions: "PM2.5 concentration, year, SSP scenario, statistical measure",
      releaseDate: "Provided upon application",
    },
    details: [
      {
        label: "About the Data",
        value:
          "This dataset contains multi-model PM2.5 statistics compiled from multiple CMIP6 model outputs for different SSP scenarios and selected years. Measures include the multi-model mean, median, minimum, maximum, and standard deviation. Files are mainly provided in GeoTIFF (.tif) format.",
      },
      { label: "Time Range", value: "2015, 2020, 2025, 2030, 2035, 2040, 2045, and 2050" },
      { label: "Spatial Coverage", value: "Global, 1° spatial resolution" },
      { label: "Selection Dimensions", value: "Year, SSP scenario, and statistical measure" },
      { label: "Additional Notes", value: "Example file name: statistic_adjcon_ssp_year.tif." },
    ],
  },
  "global-pm25-deaths-2015-2050": {
    title: "Global Deaths Attributable to PM2.5 Pollution under Multiple Scenarios and Models, 2015-2050",
    shortTitle: "Global PM2.5-attributable Mortality Data",
    description:
      "Changes in PM2.5-attributable mortality under different global scenarios and models for health-impact assessment and future policy analysis.",
    updateNote: "Apply by country or region, SSP scenario, year, and result type through the Wenjuanxing form.",
    filters: {
      years: ["2000", "2015", "2030", "2050"],
      provinces: ["Global", "Country", "Region"],
      scenarios: ["SSP1", "SSP2", "SSP3", "SSP5"],
      models: ["Country- and region-specific deaths", "Driver decomposition", "Gridded deaths"],
      formats: ["Excel", "GeoTIFF"],
    },
    tableMeta: {
      yearRange: "2000, 2015, 2030, 2050",
      dataFormat: "Excel, GeoTIFF",
      spatialResolution: "Global / Regional",
      temporalResolution: "15/20 years",
      dimensions:
        "Country/region, SSP scenario, year, PM2.5-attributable deaths, gridded deaths, drivers, projection uncertainty",
      releaseDate: "Provided upon application",
    },
    details: [
      {
        label: "About the Data",
        value:
          "This dataset describes changes in PM2.5-attributable mortality under different global scenarios and models. It supports air-pollution health-impact assessment, research related to SDG 3.9, and future-scenario policy analysis. Files include country- and region-level mortality results, driver-decomposition results, and gridded mortality data.",
      },
      { label: "Time Range", value: "2000, 2015, 2030, and 2050" },
      { label: "Spatial Coverage", value: "Global / Regional" },
      {
        label: "Selection Dimensions",
        value: "Country/region, ISO code, SSP scenario, year, driver, and projection uncertainty",
      },
      {
        label: "Additional Notes",
        value:
          "Countryandregionspecificdeaths.xlsx contains country- and region-level PM2.5-attributable mortality results; Decomposition.xlsx contains decomposition results for mortality changes; Griddeddeaths.rar contains gridded mortality data.",
      },
    ],
  },
  "china-health-impact-model-comparison": {
    title: "Health Impact Data for China Assessed Using Multiple Models",
    shortTitle: "Multi-model Health Impact Data for China",
    description:
      "Health impact estimates for China compiled using multiple exposure-response models to compare differences among model-based estimates.",
    updateNote: "Apply by region, exposure-response function, year, disease, and age group through the Wenjuanxing form.",
    filters: {
      years: Array.from({ length: 21 }, (_, index) => String(2000 + index)),
      provinces: ["China", "Provincial level", "Prefecture-level city"],
      diseases: ["IHD", "STROKE", "COPD", "LC", "LRI", "DM2"],
      models: ["GEMM", "IER2015", "IER2016", "IER2017", "MR-BRT-2019", "MR-BRT-2021", "MR-BRT-2023"],
      formats: ["CSV"],
    },
    tableMeta: {
      yearRange: "2000-2020",
      dataFormat: "CSV",
      spatialResolution: "China / Province / Prefecture-level city",
      temporalResolution: "Annual",
      dimensions: "PM2.5-attributable deaths, region, exposure-response function, year, disease, age group",
      releaseDate: "Provided upon application",
    },
    details: [
      {
        label: "About the Data",
        value:
          "This dataset compiles health impact estimates for China using multiple exposure-response models. It covers 2000-2020 at the provincial and prefecture-level city scales and records results by year, disease, age group, and exposure-response function, enabling comparisons of estimates derived from different models.",
      },
      { label: "Time Range", value: "2000-2020" },
      { label: "Spatial Coverage", value: "China, including provincial and prefecture-level city scales" },
      { label: "Selection Dimensions", value: "Region, exposure-response function, year, disease, and age group" },
      {
        label: "Additional Notes",
        value:
          "Exposure-response functions include GEMM, IER2015, IER2016, IER2017, MR-BRT-2019, MR-BRT-2021, and MR-BRT-2023.",
      },
    ],
    references: {
      "china-health-impact-model-comparison-paper-in-preparation": {
        title: "Paper in preparation.",
        note: "Paper in preparation.",
      },
    },
  },
  "pm25-health-risk-tool-v3": {
    title: "PM2.5 Pollution Health Risk Assessment Tool V3.0",
    shortTitle: "PM2.5 Health Risk Assessment Tool",
    description:
      "An ArcGIS-based tool for assessing the health risks of PM2.5 and O3 pollution and estimating spatially explicit attributable deaths.",
    updateNote: "Complete the Wenjuanxing application form to obtain the software.",
    filters: { formats: ["ArcGIS toolbox"] },
    tableMeta: {
      yearRange: "V3.0",
      dataFormat: "ArcGIS toolbox",
      spatialResolution: "PM2.5 and O3 health risk assessment; spatial estimation of attributable deaths",
      temporalResolution: "Actively maintained",
      dimensions: "Spatial DAPP calculation, exposure-response selection, confidence intervals, result output",
      releaseDate: " ",
    },
    details: [
      {
        label: "About the Software",
        value:
          "PM2.5 Pollution Health Risk Assessment Tool V3.0 is an ArcGIS plug-in. In addition to assessing PM2.5-related health risks, it updates the available PM2.5 exposure-response functions and adds O3 health risk assessment. It can estimate deaths attributable to PM2.5 and O3 pollution using spatial raster data.",
      },
      {
        label: "Applications",
        value:
          "PM2.5 and O3 health risk assessment; regional or gridded calculations of attributable deaths; environmental risk assessment; public health impact analysis; spatial health burden mapping; and decision support for environmental policy.",
      },
      {
        label: "System Requirements",
        value:
          "Developed for ArcGIS 10.x. No separate installation is required: add the toolbox in ArcToolbox or open the plug-in directly from the ArcGIS catalog.",
      },
      {
        label: "Input Data",
        value:
          "PM2.5 or O3 concentration rasters, population rasters, vector boundaries, age-structure tables, disease-mortality tables, and exposure-response function files.",
      },
      {
        label: "Outputs",
        value:
          "Total attributable deaths for the study area; results by pollutant, exposure-response function, confidence interval, disease, and age group; and optional intermediate model files.",
      },
      {
        label: "Additional Notes",
        value:
          "The software follows a comparative risk-assessment framework. The PM2.5 module supports IER (2015, 2016, and 2017), GEMM (NoCN and YesCN), and MR-BRT (2019, 2021, and 2023) exposure-response functions. It covers ischemic heart disease, stroke, chronic obstructive pulmonary disease, lung cancer, lower respiratory infections, type 2 diabetes, Alzheimer's disease and other dementias, and other non-communicable diseases. The O3 module uses the O3-COPD-MR-BRT-2021 function to estimate COPD deaths attributable to O3 exposure. Middle, LowerCI, and UpperCI estimates and optional intermediate files are supported.",
      },
    ],
  },
  "air-pollution-health-impact-analysis-v2": {
    title: "Air Pollution Health Impact Analysis Software V2.0",
    shortTitle: "Air Pollution Health Impact Analysis Software",
    description:
      "Two modules for air pollution health impact assessment and target concentration setting, supporting quantitative health risk assessment, driver decomposition, and target setting.",
    updateNote: "Complete the Wenjuanxing application form to obtain the software.",
    filters: { formats: ["Windows executable"] },
    tableMeta: {
      yearRange: "V2.0",
      dataFormat: "Windows executable",
      spatialResolution: "PM2.5 and O3 health impact assessment, driver decomposition, target concentration setting",
      temporalResolution: "Actively maintained",
      dimensions:
        "Quantitative health-risk assessment, driver decomposition, target back-calculation, uncertainty intervals, multi-region batch processing",
      releaseDate: "2026-05-26",
    },
    details: [
      {
        label: "About the Software",
        value:
          "Air Pollution Health Impact Analysis Software V2.0 contains two main modules: an air pollution health impact assessment tool and a target concentration setting tool. It quantifies the potential public health impacts of PM2.5 or O3 exposure, identifies the key drivers of changes in health risk, and recommends target concentrations to support environmental policymaking.",
      },
      { label: "System Requirements", value: "Run the Air Pollution Health Impact Analysis Software V2.0 executable file." },
      {
        label: "Input Data",
        value:
          "Population tables, age-structure tables, disease-mortality tables, and PM2.5 or O3 exposure-concentration tables. The target-setting module can use built-in country/region and Chinese prefecture-level city data or imported custom scenarios.",
      },
      {
        label: "Outputs",
        value:
          "Health impact estimates, driver-decomposition charts and tables, recommended target concentrations with uncertainty ranges, and optional intermediate files.",
      },
      {
        label: "Additional Notes",
        value:
          "For PM2.5, the software supports IER (2015, 2016, and 2017), GEMM (YesCN and NoCN), and MR-BRT (2019, 2021, and 2023) exposure-response functions. For O3, it uses MR-BRT-2021.",
      },
    ],
    references: {
      "air-pollution-health-impact-analysis-v2-registration": {
        title: "Air Pollution Health Impact Analysis Software V2.0",
        citationGb: "Yue H. Air Pollution Health Impact Analysis Software V2.0: 2026SR0621781[CP]. 2026-05-26.",
        citationApa6:
          "Yue, H. (2026). Air Pollution Health Impact Analysis Software V2.0 (Registration No. 2026SR0621781) [Computer software].",
      },
    },
  },
};

export const teamContentEn: TeamContent = {
  intro: {
    title: "About the Group",
    paragraphs: [
      "The Atmospheric Environmental Policy Research Group focuses on setting urban atmospheric environmental policy targets, evaluating health benefits, and managing environmental risks. We integrate geographic data analysis, policy evaluation, epidemiological models, and other methods to conduct interdisciplinary research on environmental policy and public health.",
    ],
  },
  members: [
    {
      name: "Huanbi Yue",
      institution: "Ocean University of China",
      role: "Associate Professor",
      photoUrl: "/team/yuehuanbi.jpg",
      description:
        "Huanbi Yue is a male associate professor from Qingyang, Gansu Province. Using interdisciplinary methods including geographic data analysis, policy evaluation, and epidemiological modeling, he studies the setting of urban atmospheric environmental policy targets and the associated health benefits. He has published more than ten papers and undertaken projects funded by the National Natural Science Foundation of China and the Natural Science Foundation of Shandong Province. As team leader, he was selected for the Outstanding Youth Innovation Team Program for Higher Education Institutions in Shandong Province (Atmospheric Environmental Risk Management Innovation Team). He serves as a member of the Professional Committee for Sustainable Use of Resources and Disaster Reduction of the China Society of Natural Resources and the Professional Committee for Pollution and Carbon Reduction of the Chinese Society for Environmental Sciences. He is an editorial board member of Humanities and Social Sciences Communications, Regional Sustainability, and Eco-Environment & Health (SCI Q1). As of July 2026, his publications had received more than 1,300 citations; his most-cited paper had received more than 400 citations; and his h-index was 12.",
      links: [
        { label: "ORCID:", text: "0000-0003-3214-815X", href: "https://orcid.org/0000-0003-3214-815X" },
        {
          label: "Google Scholar:",
          text: "https://scholar.google.com/citations?hl=en&user=6XywYHgAAAAJ",
          href: "https://scholar.google.com/citations?hl=en&user=6XywYHgAAAAJ",
        },
        {
          label: "ResearchGate:",
          text: "https://www.researchgate.net/profile/Huanbi_Yue2",
          href: "https://www.researchgate.net/profile/Huanbi_Yue2",
        },
        {
          label: "Institutional Profile:",
          text: "https://siapa.ouc.edu.cn/2021/0827/c18283a345080/page.htm",
          href: "https://siapa.ouc.edu.cn/2021/0827/c18283a345080/page.htm",
        },
      ],
    },
    {
      name: "Xin Xiong",
      institution: "Master's Student, 2024 Cohort, Ocean University of China",
      photoUrl: "/team/xiongxin.jpg",
      description:
        "Xin Xiong is a female member of the Communist Party of China from Nanchang, Jiangxi Province, and a master's student in Land Resource Management at the School of International Affairs and Public Administration, Ocean University of China. Her research focuses on assessing the health impacts of air pollution and the atmospheric environmental effects of urban spatial expansion, particularly the estimation of deaths attributable to PM2.5 pollution and the environmental effects and regulation of two- and three-dimensional urban expansion. She has received third prize in the Shandong Provincial College Student Geography Innovation Competition, national third prize in the Boyuan Cup National College Student Land Conditions Survey Competition, second prize in the Jiangxi Challenge Cup College Student Extracurricular Academic Science and Technology Competition, and second prize in the Jiangxi Tianlu Cup College Student Real Estate Valuation Skills Competition. She has also been named an Outstanding Student, Outstanding Student Leader, and Outstanding Graduate at the university level.",
    },
    {
      name: "Tailong Wang",
      institution: "Master's Student, 2025 Cohort, Ocean University of China",
      photoUrl: "/team/wangtailong.jpg",
      description:
        "Tailong Wang is a male member of the Communist Party of China from Qingdao, Shandong Province, and a master's student in Land Resource Management at the School of International Affairs and Public Administration, Ocean University of China. His research focuses on assessing the health impacts of air pollution and quantifying the health benefits of environmental policies, with particular interests in urban expansion, the spatiotemporal evolution of PM2.5, and population exposure. He has skills in spatial data processing and policy scenario analysis. As first author, he has published one paper in a Chinese Science and Technology Core Journal and completed a provincial college student innovation and entrepreneurship training project as project leader. He has received first prize in the National College Student Land Consolidation and Ecological Restoration Engineering Innovation Design Competition and second prize in the Shanxi Provincial Outstanding Territorial Spatial Planning Awards. He has also received the National Scholarship and been named an Outstanding Graduate, Outstanding Student, and Outstanding Communist Youth League Member at the university level.",
    },
    {
      name: "Xialei Qu",
      institution: "Master's Student, 2026 Cohort, Ocean University of China",
      photoUrl: "/team/quxialei.jpg",
      description:
        "Xialei Qu is a female member of the Communist Party of China from Qingdao, Shandong Province, and a master's student in Land Resource Management at the School of International Affairs and Public Administration, Ocean University of China. Her research focuses on the public health impacts of air pollution under climate change scenarios, environmental policy, and sustainable governance. She is particularly interested in global disparities in PM2.5 exposure, health risk mechanisms, and policy effectiveness. She has skills in geographic spatiotemporal modeling, quantitative health risk analysis, and multidimensional GIS analysis. She participated in China's First National Comprehensive Natural Disaster Risk Survey and led one provincial college student innovation project and one undergraduate research fund project. She received national third prizes in the National College Student Energy Economics Academic Creativity Competition and the National College Student Energy Conservation and Emission Reduction Social Practice and Science and Technology Competition, as well as first prize in the Shandong Provincial College Student Geography Innovation Competition. She received provincial- or university-level scholarships for three consecutive years and was named an Outstanding Student, Outstanding Student Leader, Outstanding Communist Youth League Member, and Outstanding Graduate at the university level.",
    },
    {
      name: "Yichi Zhang",
      institution: "Master's Student, 2026 Cohort, Ocean University of China",
      photoUrl: "/team/zhangyichi.jpg",
      description:
        "Yichi Zhang is a female member of the Communist Party of China from Jincheng, Shanxi Province, and a master's student in Land Resource Management at the School of International Affairs and Public Administration, Ocean University of China. Her research focuses on assessing the health impacts of air pollution and quantifying the health benefits of environmental policies, particularly deaths attributable to PM2.5 pollution, health impact estimation, and policy scenario simulation. She has skills in geospatial analysis, model development, and policy evaluation. She has published one SCI-indexed paper as first author and participated as a core member in a national college student innovation and entrepreneurship training project. She received the grand prize in the National College Student Land Consolidation and Ecological Restoration Engineering Innovation Design Competition, national second prize in the Guojian Cup National College Student Rural Territorial Spatial Value Enhancement Planning and Design Competition, and second prize in the Beijing Challenge Cup College Student Extracurricular Academic Science and Technology Competition. She has also been named a university-level Outstanding Student, Outstanding Student Leader, and Outstanding Communist Youth League Cadre, as well as an Outstanding Graduate of Beijing.",
    },
    {
      name: "Xiangwen Zhang",
      institution: "Undergraduate Student, 2023 Cohort, Ocean University of China",
      photoUrl: "/team/zhangxiangwen.jpg",
      description:
        "Xiangwen Zhang is a female probationary member of the Communist Party of China from Liaocheng, Shandong Province, and an undergraduate student in Public Administration at the School of International Affairs and Public Administration, Ocean University of China. Her research focuses on the degree of coordination between pollution- and carbon-reduction policy targets and target attainment in Chinese cities, together with the associated influencing factors. She is particularly interested in the coupling coordination between PM2.5 concentrations and CO2 intensity and in the socioeconomic factors affecting pollution and carbon reduction. She has skills in geospatial analysis, model development, and policy evaluation. She received second prize in the 7th National College Student Urban Management Competition, second prize in the 3rd National College Student Ecological and Environmental Management Research Innovation Competition, third prize in the Shandong Provincial College Student Geography Innovation Competition, and third prize in the 14th A·Dream Cup Academic Ability Competition.",
    },
  ],
};
