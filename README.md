# Fred

Fred is a collection of common CSS patterns for websites.

## Building Fred
 
To build a custom Fred package from the command line, run:

```
> npm install
> grunt
```

...and follow the directions of your cabin crew.

Grunt will make a `dist/fred.scss`, and compile `dist/fred.css` for your project


## Working with your project

You want to tweak all Fred's variables and make everything pretty for your project.

You also want to keep Fred under some kind of package management, like bower. 

Copy `_fred-variables.scss` into your sass directory before you include `fred.scss`.


```sass
// style.scss

@import "fred-variables";
@import "path/to/fred";

// Rest of your styles here!

```

Now you can tweak away, while still being able to update Fred without nuking all your hard work.

