## project3 UNIVERSITY OF MIAMI COURSE
crime analysis for south florida


## A) An overview of the project and its purpose :

For this project Ruby Ghabboun, Aida Roman, Renato Barbosa collaborated on analyzing the crime data in florida for 2020 - 2023 to analyse crime trends , hotspots, offenders age distribution.
the goal is to understand why crime rates changed over the years and how we can improve these numbers based on their categories and age distribution.

analytical categories:
1. Trend of crime rates and how it changed over the past 3 years ( 2021 to 2023 ) in south florida.
2. Mapping of different crime categories by county and analyzing trends. 
3. Age distribution of offenders in florida.

   

## B) References for the data source(s):

1. https://www.fdle.state.fl.us/CJAB/UCR/Annual-Reports/UCR-Arrest-Data (Ruby) * for cleaning
2. https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/downloads#nibrs-downloads (Aida) * for cleaning
3. https://www.fdle.state.fl.us/CJAB/UCR/Annual-Reports/FIBRS (Renato) * for cleaning
4. https://github.com/danielcs88/fl_geo_json/blob/master/fl-state.json (geojson data for mapping)

   

## C) Instructions on how to use and interact with the project :

1. Each analytical subject will be found in a separate folder alongside with all the related data sources, files, and code.
2. (crime_by_county) folder --> after pulling, code and html map should run perfectly, the map has multiple ways to interact and filter data such as search buttons, filtered pie charts, a bar chart for theft , and you can hover over the map and select a county to view more details.
3. (offenders_distribution) folder 
   -Ensure you have Python and PostgreSQL installed on your system.
   -The analysis requires a specific dataset named 'offenders_data.csv' located in a folder named 'Resources'. -    Ensure this file is in the correct location before running the notebook.
   -To load into postgres, use ‘createdb’ to create a database and then run the following to setup the basic     database structure and load the common code lookup tables:
   •	psql your_db_name < postgres_create.sql
        You then can run the following command in the NIBRS annual zipfile downloaded to load that data into your database:
   •	psql your_db_name < postgres_load.sql

4. The other analytical category is on a jupyter notebook 

## folders :
crime_by_county done by Ruby

offenders_distribution done by Aida

year_over_year_analysis done by Renato


## D) References for any code used that is not your own :
https://github.com/danielcs88/fl_geo_json/blob/master/fl-state.json (geojson data for county boundries mapping) 


## E) At least one paragraph summarizing efforts for ethical considerations made in the project:

All our resources are from governmental websites, during the data cleaning process we made sure there is no sensitive information regarding names, addresses, and personal data.
we also removed any bias by not analysing ethnicities and only looked at relevant crime data.

## F) final analysis 

In reviewing the data scrutinized for this project, our primary focus was on the year 2020, coinciding with the onset of the COVID-19 pandemic. We specifically examined counties with the highest total arrests, with Miami-Dade County leading at 45,285 total arrests, followed by Hillsborough County (32,519) and Broward County (29,685). To discern patterns and evaluate the possibility of outliers, our analysis extended to 2021. Unexpectedly, Duval County took the lead in crime with 7,996 reported incidents, trailed by Pinellas with 6,718 incidents, while Miami-Dade reported 2,344 incidents. Suspecting 2021 as potentially anomalous, we further explored 2022, revealing a surge in violent crime in Miami-Dade County (11,453 incidents), accompanied by a decline in Duval County to 8,110 reported crimes.
Upon deeper examination of the 2022 data, it was uncovered that 68.6% of offenders were male, while 30.4% were female. Additionally, crimes exhibited a relatively even distribution between white and African American populations. City-specific analysis underscored Jacksonville and the Miami-Fort Lauderdale-Pompano Beach area as leaders in this context. In light of this comprehensive data, we recommend the implementation of the following strategies to mitigate crime rates: Community Engagement Programs, Youth Programs and Education, Targeted Law Enforcement Strategies, Drug Prevention and Rehabilitation, Regional Collaboration, and Data-Driven Policing.

