The following are basic instructions for the dev version of the stock module.
Feel free to suggest changes!


Standard setup for Commerce stock:
==================================

1) Download or clone the commerce stock project

2) Enable the following modules
* Commerce Stock API
* Commerce Stock Field
* Commerce Stock Local Storage
* Commerce Stock UI

3)  Commerce >> Configuration >> Stock >> Stock configuration
* Set Default service to "Local stock" (optionally select Local stock only for product
  variations that should be controlled by stock)


4)  Commerce >> Configuration >> Products >> Product variation types
assuming you only have Default Product variation type
a) Manage fields
b) add field
c) Select "Stock Level" under the "General" section and name the field "stock level"
d) Save and continue
e) Set "Allowed number of values" to 1 and "Save field settings"
f) "Save settings"  one last time


Other configuration:
====================
Event handling:
By default the stock system reacts only on "order complete" events - creates a negative
transaction resulting with that stock no longer available.
You can enable 2 more events by going to:
Commerce >> Configuration >> Stock >> Stock configuration
* Automatically return stock on cancel - Creates a positive stock transaction and makes
  the stock available again
* Adjust stock on order updates (after the order was completed) - Allows to modify a placed
  order and any changes to quantities will get reflected in stock levels.

Support multiple stores:
========================
Each store will have a primary location for creating transactions against
Each store will have a list of locations available for fulfilment (this is for checking of
 stock not for creating transactions)

To support multiple stores you must add the following fields to relevant Store types
(we may automate this later on):
*  Available stock locations (field_available_stock_locations) – Entity reference to stock location - unlimited
*  Stock allocation location (field_stock_allocation_location) - Entity reference to stock location - 1

You can then edit each of the stores and set the locations.
