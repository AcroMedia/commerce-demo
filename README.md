# Urban Hipster - Commerce 2 & Drupal 8 Demo

This is a full __Commerce 2__ demo website built on __Drupal 8__. It has been built for 3 reasons:

1. So that people can view, interact and login to an actual working demo site.
2. So that developers can install, trial and review code and configuration.
3. So that the community can see and discuss what Drupal Commerce includes basically out of-the-box.

__NOTE:__ This is __NOT__ intended to be a base for building a new project, for that we recommend generating your own composer files or use the [Commerce Kickstart](https://www.commercekickstart.com).

## Welcome!

The Urban Hipster demo site has been designed, built and maintained by [__Acro Media Inc.__](https://www.acromedia.com) in order to showcase a working demo of Commerce 2 on Drupal 8. Our goal is to provide an enterprise level example of what can be done out-of-the-box with general software configuration and theming. 

__Please understand that while we strive to keep the site and its components updated to the latest versions, there may be times where we lag behind a bit.__

If you notice any bugs, please submit an issue. We’ll do our best to keep on top of things.

## Where to start?

### View the demo site

If you still haven’t seen the demo site, [check it out!](https://commerce.acromedia.com).

Click around, take the interactive guided tours, go through the checkout flow, whatever. This site is made so that you can truly experience what Commerce 2 and Drupal 8 offer as a standard.

### Get a personalized tour

If you’d like to have one of our experts go through the site with you and discuss how things work, use the demo site chat or [send us a message](https://www.acromedia.com/contact-us). We’ll set something up that works around your schedule. You can contact us through are website [here](https://www.acromedia.com/contact-us).

### Developer access

If you’d like to setup a copy of the demo yourself, follow these instructions.

#### Lando
__Requirements__
* [Lando](https://docs.lando.dev/)
* General knowledge on how to use this tool

__To setup the demo__
1. Clone or download the files.
1. Cd into the cloned repo and run `inv setup`
1. View the site!
1. Login with username and password as `demoadmin`.
    - NOTE: demoadmin does have some restrictions. If you'd prefer to login as a full admin, use Drush from the `/web` root to get a one-time admin login. Drush 9 is included in the vendor dir, so run `../vendor/drush/drush/drush uli`.
1. Go to `yoursite.com/admin/config/search/search-api` and edit the server named `Solr`.
1. Change `Solr host` to `solr` and save. 
1. Reindex the Product and POS indexes.
1. Update site and store email addresses entered in the following locations:
    - Site: `yoursite.com/admin/config/system/site-information`
    - Stores (each store): `yoursite.com/admin/commerce/config/stores`
    - Order types (each type): `yoursite.com/admin/commerce/config/order-types`
    - Webforms (each form): `yoursite.com/admin/structure/webform`
1. If you wish to switch to a different sample site, run 'inv update sitename' the 3 options are `demo`, `demoplus` and `pos`

#### Update a saved database

1. `inv savedb` - this will default to demoplus, if you want to save a different db just pass it as a parameter `inv savedb demo`

## Issues

### Bugs

If you notice any bugs, please [submit an issue](https://github.com/AcroMedia/commerce-demo/issues). We’ll do our best to keep on top of things. Any bugs found for specific modules should be directed to that modules issue queue on Drupal.org.

### Troubleshooting

Please note, our team is busy completing service work for clients, and thus, we will not be able to help you with setting up the demo on your own. If you’re having trouble, some things that could cause your issue are:

* Is your site running on PHP 7.1 or higher?
* Are your Drupal file & folder permissions correct?
* Flush caches (i.e. through Drupal UI or run `../vendor/drush/drush/drush cr` from within `/web`)
* Update entities (i.e. run `../vendor/drush/drush/drush entup` from within `/web`)
* Update database (i.e. run `../vendor/drush/drush/drush updb` from within `/web`)
* Solr server can be reached and indexes have been rebuilt?
* Have you consulted the software/tool documentation?

If those don’t help, Google the issue or submit an issue to our issue queue. Google will probably be your best friend :)

### Let us set it up for you (and other stuff)

If you’re a business and interested in having Acro Media setup the demo for you, or if you’d like to talk to us about something else, [contact us!](https://www.acromedia.com/contact-us)

## Photo Credits

The photos used in this website have been provided by the generous community of photographers at [Unsplash](https://unsplash.com) ([view license](https://unsplash.com/license)).
