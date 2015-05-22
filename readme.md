#### WIP
This repo has a scraping feature for basic html tags. It also scrapes for address data and creates a google map.

##### Basic HTML scraper
###### see what a google spider bot sees
To run this scraper in your development environment, clone the url in your dev console:
```
$ git clone https://github.com/mrdougwright/webscraper.git
$ cd webscraper
$ rails console
```

You can then run the `MakeFile` command to scrape a webpage for basic meta, title, h1 and p tag content.
```
url = "http://commitchange.com/"
MakeFile.with_url(url, "filename")
```

You should see your file added to your directory.

##### Address Scrape to Google Maps
The address scraper is a bit too site specific at the moment. WIP...