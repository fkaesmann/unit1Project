# Unit1 Project1

Unit1Project1 is a news aggregation site displaying news.api articles. The application alows searching by key words and saving favorite artlces in Local Storage

### Developer

Fred Kaesmann
Oct. 2019

## URL to site

http://stupendous-bear.surge.sh/

## Mockuup WireFrame

![](https://user-images.githubusercontent.com/35512164/67236571-812ac600-f417-11e9-9ea2-5ddc78ac2988.png)

## Screen Shot

![](https://user-images.githubusercontent.com/35512164/67236624-a15a8500-f417-11e9-8ee3-7d26f436858e.png)

## Features

```
1. Click on articles to display content
2. Click image to flip
3. Enter search criteria in search field and hit enter
4. Double click any text for search 
5. Printable Page
6. Storing a favorite and removing them

```

## Key Technologies

```
1. JavaScript
2. jQuery
3. HTML
4. CSS
5. flexbox
6. localStorage

import none
```

## Key Code Functions

```
* handleData - Loops through the news articles returend from the API, and displays all data in the #articleList <div>

* loadArticle - Loads the first article returned from the API on to the page

* getSelectionText - Gets the double clicked text for the search

* @media print - To print only the article and image

```

## Media Print

```
@media print {
  #parentContainer {
    display: none;
  }
  #hideForPrint {
    display: block;
  }
}
```

## Credits

```
1. w3schools.com https://www.w3schools.com/
2. News API https://newsapi.org/
3. stack overflow https://stackoverflow.com/
4. surge https://surge.sh/
```

## Authors and acknowledgment

The General Assembly instructors were key resouces in developing this site
