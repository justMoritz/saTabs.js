# saTabs.js
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


Then simply include jQuery. Include tabscroll.js. Call the Init Method.

    <script src="path/to/your/scripts/jquery-2.1.4.min.js"></script>
    <script src="path/to/your/scripts/tabscroll.js"></script>
    <script> saTabs.init(); </script>

### That's it! Have fun.

* Advantages: No cluttered Markup: You just need to add one custom data-attribute.

* Notes: (The class for the active tab on the navigation is `.tabscroll_activeNavi`)

