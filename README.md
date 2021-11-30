
# [GloboBikes](https://www.heroku.com/)
## Globo-Gym
### Purpose and Functionality
Globobikes is a navigation application that relies on user feedback for safe routing on bikes in cities, suburban areas, and any other crowded place. Users can report and confirm blockages and hazards to create better routes and build a stronger biking community in their area. 

### Instructions to Run Locally:
In command line:
```console
$ npm install
$ npm run serve
```
In a separate shell:
```console
$ npm start
```
then you will find the application at `localhost:3000` in the browser

### Authorship:
* **Andrei Dumitrescu**:
  * src
    * componenents
      * MapContainer.js
      * MapContainer.css
      * HazardsMap.js
    * pages:
      * HazardsPage.js
      * HomePage.js
      * RoutePage.js
  * App.js
* **Garrett Gordon**:
  * routes:
    * reports.js
    * routes.js
  * models:
    * Location.js
    * Report.js
    * Reports.js
    * Route.js
    * Routes.js
  * reports_test.py
  * routes_test.py
  * app.js
* **Noah Faro**:
  * src
    * componenents
      * MapContainer.js
      * MapContainer.css
      * HazardsMap.js
      * Addressbar.js
      * Navbar.css
      * Navbar.js
      * Sidebar.css
      * Sidebar.js
    * pages
      * HazardsPage.js
      * ReportsPage.js
      * RoutePage.js
      * ProfilePage.js
      * HomePage.js
    * App.css
* **Reginald Best**:
  * src
    * componenents
      * Addressbar.js
      * Navbar.css
      * Navbar.js
      * Sidebar.css
      * Sidebar.js
      * SidebarData.js
      * NavbarData.js
    * pages
      * HazardsPage.js
      * ReportsPage.js
      * RoutePage.js
      * ProfilePage.js
      * HomePage.js
    * App.js
    * App.css
  * Boilerplate react code (src/, package.json, etc.)
