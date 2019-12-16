# Step for updating Acro Media's Urban Hipster demo site

## Updating PLUS and BASE  
The following steps are used to update the demo sites, both **PLUS** and **BASE**.  

 1. Do any updates locally and commit  
 2. Merge updates to *UAT* branch and push. Test changes  
 3. **Update PLUS** - Don’t merge into master and push just yet. Do below first.  
    - Put PLUS site into maintenance mode  
    - `ssh drupalcommerce@cloud4.acromedia.com`  
    - `cd www/demoplus/web`  
    - To make sure you start with a clean, untampered database, import the database used to reset the site each night. 
    `drush sql-drop -y; drush sql-cli < ../database.sql`  
    - Move the database into a backup directory.  
    `Mv ../database.sql ../db_backups/database_YYYY-MM-DD.sql`  
    - Importing the database will take the site out of maintenance mode, so turn maintenance mode back on  
    - Merge *UAT* into *master* and push (deployment is automatic)  
    - Test changes  
    - Update [change log page](https://commerceplus.acromedia.com/change-log) as needed (PLUS only)  
    - Clear recent log messages  
    - Take site out of maintenance mode  
    - Export the new nightly refresh database.  
    `drush sql-dump > ../database.sql`  
 4. **Update BASE**  
     - Repeat septs 3a - 3l for BASE site, but note the following:  
       - Site dir is `www/demo` (not `www/demoplus`)  
       - Deployment is manual  
       - Ignore 3i, there is no change log page for BASE  
     - In the repo, update *database.tag.gz* in the dumps directory with a copy of the newly dumped database.  
     - Commit and push  

## Updating Performance Enhanced PLUS 
The performance_update branch contains the new version of PLUS with varnish and all that performance enhancement goodness. This branch should be treated separately and the deployment for it is tied to this branch., The process for updating is still the same as the regular PLUS site, but note the following:  

 - `ssh acro@commerceplus-new.acromedia.com`  
 - Site is in `www/cpback`
