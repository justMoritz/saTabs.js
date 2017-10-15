# tabscroll.js
![TABSCROLL SAMPLE](http://files.moritzzimmer.com/tabscroll.gif)


## ABOUT:

A simple and easy jQuery Plugin to add a simple, bookmarable, browser-history-respecting, **no-JS-fallback-safe** tab content to any website! 


## SETUP:
You need to have two things: 

### 1.) A Navigation of links, with each link wrapped in a parent.

In the collection of links, link the links via #s to the sections. 
For example, you may have two divs, one has the id of `id="one"`, the other `id="two"`
Your links should link to `href="#one"` and `href="#two"`.

Wrap each link in a parent. (This is important for styling, or if you are using a list)

Wrap each parent to a link in another parent, and give it the following attribute
`"data-tabscrollnavcontainer"`.

### It should look something like this:

    <ul data-tabscrollnavcontainer>
        <li>
            <a href="#one">One</a>
        </li>
        <li>
            <a href="#two">Two</a>
        </li>
    </ul>

#### ---- OR ----

    <div data-tabscrollnavcontainer>
        <div>
            <div>   
                <a href="#one">One</a>
            </div>
            <div>   
                <a href="#two">Two</a>
            </div>
        </div>
    </div>

### 2.) A collection of "tabs", the content you want to display as tabs.
I recommend it to look something like this:
    
    <article>
        <section id="one">
            ...
        </section>
        <section id="two">
            ...
        </section>
    </article>

#### ---- OR ----

    <div>
        <div id="one">
            ...
        </div>
        <div id="tow">
            ...
        </div>
    </div>


### 3.) include jQuery. Include tabscroll.js.

    <script src="path/to/your/scripts/jquery-2.1.4.min.js"></script>
    <script src="path/to/your/scripts/tabscroll.js"></script>

### That's it! Have fun. 


## Advanced Setup:

### Transitions

You can control the type of transition between tabs with the `data-tabscrollnavcontainer` attribute. You can set it to:
- `fade`
- `slide`
- or leave blank for no transition at all

### Non-Index Version

You may not want your tabs to be indexed / indexable. Tabscroll keeps track of your tabs via the URL, by adding a fragment (“hash”) to the end of the URL. **But what if you have an application on your page that already does that?**

Now Tabscroll can accomodate, by simply calling the `saTabs.nonID();` method some time *after* you included tabscroll.js. This will not index your tabs, not write to the URL, but still keep the same markup and functionality for your tabs.

## Advantages:

* No cluttered Markup: You just need to add one custom data-attribute.

* When no Javascript is enabled, your page will work perfectly fine!

* You can actually bookmark tabs, and navigate between tabs with your browsers back and forward buttons.

* Notes: (The class for the active tab on the navigation is `.tabscroll_activeNavi`)

