# optimal_circuitry_project3
crime analysis for south florida


A) An overview of the project and its purpose :

For this project Ruby Ghabboun, Aida Roman, Renato Barbosa collaborated on analyzing the crime data in florida for 2020 - 2023 to analyse crime trends , hotspots, offenders age distribution.
the goal is to understand why crime rates changed over the years and how we can improve these numbers based on their categories and age distribution.

analytical categories:
1. Trend of crime rates and how it changed over the past 3 years ( 2021 to 2023 ) in south florida.
2. Mapping of different crime categories by county and analyzing trends. 
3. Age distribution of offenders in florida.

   

B) References for the data source(s):

1. https://www.fdle.state.fl.us/CJAB/UCR/Annual-Reports/UCR-Arrest-Data (Ruby) * for cleaning
2. https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/downloads#nibrs-downloads (Aida) * for cleaning
3. https://www.fdle.state.fl.us/CJAB/UCR/Annual-Reports/FIBRS (Renato) * for cleaning
4. https://github.com/danielcs88/fl_geo_json/blob/master/fl-state.json (geojson data for mapping)

   

C) Instructions on how to use and interact with the project :

1. Each analytical subject will be found in a separate folder alongside with all the related data sources, files, and code.
2. (crime_by_county) folder --> after pulling, code and html map should run perfectly, the map has multiple ways to interact and filter data such as search buttons, filtered pie charts, a bar chart for theft , and you can hover over the map and select a county to view more details.
3. The other two analytical categories are on a jupyter notebook and the data set for age distribution is a (postgresql) database.



D) References for any code used that is not your own :
https://github.com/danielcs88/fl_geo_json/blob/master/fl-state.json (geojson data for county boundries mapping) 


E) At least one paragraph summarizing efforts for ethical considerations made in the project:

All our resources are from governmental websites, during the data cleaning process we made sure there is no sensitive information regarding names, addresses, and personal data.
we also removed any bias by not analysing ethnicities and only looked at relevant crime data.





