



# Meet Fred, the friendly front-end framework

Fred helps jump-start your front-end projects. He's a super flexible little guy with a 
nice grunt-powered CLI.

### How Fred Works

Fred aims to solve a classic front-end problem: sharing and re-using common components between
projects, while allowing each project to retain custom variables and configuration.

You include '_fred.scss' in your project, and customise its behavior in '_fred-theme.scss'. 
When there's an update to Fred, you can update it with a 'bower update' and get all the new
Fred goodness in your project right away, without losing your settings. 


## Getting started

One liner:

```bash
bower install fred && cp bower_components/Fred.scss/dist/lib/fred.scss path-to-sass-folder/lib/_fred.scss && cp bower_components/Fred.scss/dist/_fred-theme.scss path-to-sass-folder/_fred-theme.scss 
```

This should give you the following structure in your sass dir:

```
path-to-sass-folder/
    |--lib/
    |----_fred.scss
    |--_fred-theme.scss
    |--screen.scss (or whatever your main sass file is)
```

Now you can include Fred in your `screen.scss`:
```scss
// screen.scss
@include "lib/fred"

// Your stylesheet can now use Fred! 

.my-selector {
  @extend %antialiased;
}

.my-other-selector {
  @extend .mt-m--q-large;
}

```



---------------------------------------
# Customising Fred

Fred has a very small core, and a number of optional modules. By default, it includes all of them.

To change what's included, you can run `grunt` inside the Fred package that bower downloads for you.

Follow the instructions of your cabin crew and you'll be rocking your custom-built Fred in
no time.

```
> cd Fred.scss/
> grunt 
[?] Do you want to customise Fred's modules? (y/N)
[?] Which modules would you like to include? (Press <space> to select)
 ❯⬡ scss/objects/_arrows.scss
  ⬡ scss/objects/_badge.scss
  ⬡ scss/objects/_block-grid.scss
  ⬡ scss/objects/_blocks.scss
  ⬡ scss/objects/_breadcrumbs.scss
  ⬡ scss/objects/_button-group.scss
  ⬡ scss/objects/_buttons.scss
  ⬡ scss/objects/_caret.scss
  ⬡ scss/objects/_close.scss
  ⬡ scss/objects/_forms.scss
  ⬡ scss/objects/_grid.scss
  ⬡ scss/objects/_headings.scss
  ⬡ scss/objects/_icon-text.scss
  ⬡ scss/objects/_images.scss
  ⬡ scss/objects/_links.scss
  ⬡ scss/objects/_lists.scss
  ⬡ scss/objects/_media.scss
  ⬡ scss/objects/_nav.scss
  ⬡ scss/objects/_pagination.scss
  ⬡ scss/objects/_pills.scss
  ⬡ scss/objects/_radii.scss
  ⬡ scss/objects/_ratio.scss
  ⬡ scss/objects/_spacing.scss
  ⬡ scss/objects/_split.scss
  ⬡ scss/objects/_typography.scss
  ⬡ scss/objects/_visibility.scss
```

That's about all for how to work with Fred. Next, let's look at what it actually gives you.

----

## Core


### Making browsers behave
Fred includes most of [normalize.css](https://github.com/necolas/normalize.css) v2.1.3. 

You can read the documentation on the normalize site. 

----



### Inline blocks

Inline blocks are handy for everything. We don't often support projects in IE7 and
below, but since it's trivial to hack it in, we've included it here. 

To cut down on rules in your stylesheet, you can extend this placeholder in your code.

```
%inline-block {
    display: inline-block;
    *display: inline;
    *zoom: 1;
}


.my-icon {
    @extend %inline-block;
}

```



### Clearfixing

Table-pseudo element clearfix. It is good.

```scss
.my-floater {
    @extend %clearfix;
}
```

Or, heaven forbid, in your markup:

```html
<div class='clearfix'>
    <div class='left'>
        Hey i'm floating!
    </div>
</div>
```




###Screen reader content

We've found some odd bugs with the -999px textindent hack. 
Clipping is much better since it doesn't require a 999 x [your-line-height]px region to be drawn.

This is borrowed from Bootstrap.

```html
 <a class="sr-only" href="#content">Skip to main content</a>
```




### Fixing Chrome/WebKit type rendering

Since v22, Chrome makes fat sausage horrible web typography. Fix it with
these properties right here:

```html
<div class='my-black-box antialiased'>
    <h1>Knocked out white text!</h1>  
</div>
```

But wait! That screws with everything on Windows Vista Chrome... right?

Yeah, it does. If you're using our [Browser.js](http://springload.github.io/Browser.js),
it'll automatically add `isWindowsChrome` to the documentElement, and we set
the antialiasing back to classic sub-pixel mode:

```scss
.isWindowsChrome %fix-webkit-font-rendering  {
    -webkit-font-smoothing: subpixel-antialiased;
}
```

In your markup:
```html
<html class='isWindowsChrome'>

<!-- some time later -->

<div class='my-black-box antialiased'>
    <h1>Hey i'll look good on Vista!</h1>  
</div>

```


### Magic tricks

Showing and hiding things with a pre-emptive `important`  

```html
<div class='hide'>Shorthand display: none !important;</div>
<div class='show'>Shorthand display: block !important;</div>
<div class='hidden'>Shorthand visibility: hidden !important;</div>
<div class='visible'>Shorthand visibility: visible !important;</div>
```




### Append and Prepend

Place something before or after an element

```html
<p class="prepend" data-prepend="email:">&nbsp;email@gmail.com</p>
<p class="append" data-append="is my email">email@gmail.com&nbsp;</p>
```




That wraps up the core of Fred. Some simple resets, helpers, and alignment classes. 

## Modules

The real power of Fred is in modules. Fred's `grunt` task will let you build out
just the modules you want. Fred generally uses BEM syntax for its modules, with
the aim of keeping specificity low and making things easy to re-use. 

After you've run 'npm install', calling `grunt` will let you roll your own Fred. 

By default, Fred will build and include all the following modules. 




## Arrows

Apply the modifier classes to the parent. For instance, this will put an
arrow in the top left corner of the containing div:

```html
<div class='arrow--left block-xs block--color-3'>
    <p> ... </p>
    <i class='arrow arrow-top'></i>
</div>

<div class='arrow--right block-xs block--color-3'>
    <p> ... </p>
    <i class='arrow arrow-top '></i>
</div>

<div class='arrow--center block-xs block--color-3'>
    <p> ... </p>
    <i class='arrow arrow-bottom '></i>
</div>

<div class='arrow--side block-xs block--color-3'>
    <p> ... </p>
    <i class='arrow arrow-left '></i>
</div>
```




## Badges

```html
<a class="xm">Inbox
    <span class="badge tiny">42</span>
</a>
```



## Generic blocks

```html
<div class='block-xs block--green'>
       ...
</div>
```




## Breadcrumbs

```html
<ol class='list-unstyled breadcrumbs pt-breadrumbs mt-s'>
    <li><a href='#'>Home</a></li>
    <li><a href='#'>Page</a></li>
    <li class='#'>Sub page</li>
</ol>
```




## Button group

Contain buttons in a horizontal group.
----------------------------------------------------------------------------
Borrowed from Twitter Bootstrap and put on a border-radius diet.




## Buttons

### Button variations

```html
<p>
    <a class="btn tp-btn" data-btn-loading-indicator="Thinking...">
        <span class="btn--label">
            Button 1
        </span>
    </a>
    <a class="btn ts-btn">
        Button 2
    </a>
    <a class="btn tt-btn">
        Button 3
    </a>
</p>
```




### Button modifiers

```html
<h3 class="btn tp-btn btn--large btn--bounce">
    Button 1
</h3>
<p>
    <small class="btn tt-btn btn--small btn--bob">
        Button 2
    </small>
</p>
```




### Pill type buttons with (rounded) ends

```html
<a class="btn tp-btn btn--soft">
    Button 1
</a>
<a class="btn ts-btn btn--hard">
    Button 2
</a>
```




### Block buttons stretch to the full width of their parent (handy!)

```html
<p>
    <a class="btn tp-btn btn--block">
        Button 1
    </a>
</p>
<p>
    <a class="btn tp-btn btn--block-mobile">
        Responsinate!
    </a>
</p>
```




### Submit buttons

FireFox doesn't like line-heights on submit buttons. Stick a class on submit
buttons and make sure the padding's the same as your default button :)

```html
<input type='submit' value='Button 3' class='btn btn--submit-small' />
<input type='submit' value='Button' class='btn btn--submit' />
<input type='submit' value='Button 2' class='btn btn--submit-large' />
```




### Buttons with icons

These assume there's an inline-block element with a class of .i inside the button

```html
<p>
    <a class='btn tp-btn btn--icon btn--bounce-icon--left'>
        <i class='i'>&#9834;</i>
        A button with .btn--icon
    </a>
</p>
<p>
    <a class='btn tp-btn btn--icon--rev btn--bounce-icon--bottom'>
        A button with .btn--icon--rev
        <i class='i'>&#9835;</i>
    </a>
</p>
<p>
    <a class='btn ts-btn btn--icon-large btn--bounce-icon--top'>
        <i class='i'>&#9829;</i>
        A button with .btn--icon-large
    </a>
</p>
<p>
    <a class='btn ts-btn btn--icon-large--rev btn--bounce-icon--right'>
        A button with .btn--icon-large--rev
        <i class='i'>&#9733;</i>
    </a>
</p>

<p>
    <a class='btn tt-btn btn--icon-small'>
        <i class='i'>&#163;</i>
        A button with .btn--icon-small
    </a>
</p>
<p>
    <small class='btn tt-btn btn--icon-small'>
        <i class='i'>&#163;</i>
        A small with .btn--icon-small
    </small>
</p>
```

Buttons can also be icons only:

```html
<p>
    <a class='btn tp-btn btn--icon-only--large'>
        <i class='i'>
            &#9829;
        </i>
    </a>
    <a class='btn ts-btn btn--icon-only'>
        <i class='i'>
            &#9829;
        </i>
    </a>
    <a class='btn tt-btn btn--icon-only--small'>
        <i class='i'>
            &#9829;
        </i>
    </a>
    <a class='btn ts-btn btn--icon-only--small btn--soft'>
        <i class='i'>
            &#9733;
        </i>
    </a>
    <a class='btn tp-btn btn--icon-only--small btn--hard'>
        <i class='i'>
            &#9834;
        </i>
    </a>
</p>
```




## Drop-down caret

```html
<p>
    Caret: <span class="caret"></span>
</p>
<p>
    Reversed Caret: <span class="caret caret--rev"></span>
</p>
```





## Close icon

```html
Close icon: <span class="close"></span>
```




## Grids

###  Inline Grid
Sets the child elements to take up full justified width of the parent.
The prefix class is 'col' (although you can change this in the variables file) and the suffix is the fraction you require.

```html
<div class='grid'>
    <div class='grid__item col'>
       <div class='block--color-2 block-s'>
            <p>
                full width
            </p>
        </div>
    </div>
</div>

Example two
<div class='grid'>
    <div class='grid__item col-2-4' >
        <div class='block--color-3 block-s'>
            <p>
                50%
            </p>
        </div>
    </div>
    <div class='grid__item col-2-4'>
        <div class='block--color-3 block-s'>
            <p>
                50%
            </p>
        </div>
    </div>
</div>

Example three
<div class='grid'>
    <div class='grid__item col-1-4'>
        <div class='block--color-1 block-s'>
            <p>
                25%
            </p>
        </div>
    </div>
    <div class='grid__item col-1-4'>
        <div class='block--color-1 block-s'>
            <p>
                25%
            </p>
        </div>
    </div>
    <div class='grid__item col-1-4 '>
        <div class='block--color-1 block-s'>
            <p>
                25%
            </p>
        </div>
    </div>
    <div class='grid__item col-1-4 '>
        <div class='block--color-1 block-s'>
            <p>
                25%
            </p>
        </div>
    </div>
</div>

Example four
<div class='grid'>
    <div class='grid__item col-6-10'>
        <div class='ts-block block-s'>
            <p>
                60%
            </p>
        </div>
    </div>
    <div class='grid__item col-4-10'>
        <div class='ts-block block-s'>
            <p>
                40%
            </p>
        </div>
    </div>
</div>

Example five
<div class='grid'>
    <div class='grid__item col-8-10'>
        <div class='tt-block block-s'>
            <p>
                80%
            </p>
        </div>
    </div>
    <div class='grid__item col-2-10'>
        <div class='tt-block block-s'>
            <p>
                20%
            </p>
        </div>
    </div>
</div>

Vertical align these grid items in the middle
<div class='grid grid--middle'>
    <div class='grid__item col-1-4'>
        <div class='block-xxxl block--color-1 pl-s'>
            <p>
                1/4
            </p>
        </div>
    </div>
    <div class='grid__item col-1-4'>
        <div class='block-xl block--color-1 pl-s'>
            <p>
                1/4
            </p>
        </div>
    </div>
    <div class='grid__item col-1-4'>
        <div class='block-m block--color-1 pl-s'>
            <p>
                1/4
            </p>
        </div>
    </div>
    <div class='grid__item col-1-4'>
       <div class='block-xs block--color-1 pl-s'>
            <p>
                1/4
            </p>
        </div>
    </div>
</div>
```


#### Inline Grid - Responsive

This works exactly the same as what's mentioned above.
You just need to add an extra suffix onto the classes which relates to the breakpoint you want to target.

```html
<div class='grid'>
    <div class='grid__item col col-2-4--q-medium col-1-4--q-large col-4-10--q-xlarge'>
       <div class='block--color-2 block-s'>
            <p>
                1<br />
                <strong>Mobile:</strong> full width<br />
                <strong>Skinny:</strong> 1/2 <br />
                <strong>Desktop:</strong> 1/4 <br />
                <strong>Wide:</strong> 40/60
           </p>
        </div>
    </div>
    <div class='grid__item col col-2-4--q-medium col-1-4--q-large col-6-10--q-xlarge'>
       <div class='block--color-2 block-s'>
            <p>
                2
            </p>
        </div>
    </div>
    <div class='grid__item col col-2-4--q-medium col-1-4--q-large col-4-10--q-xlarge'>
       <div class='block--color-2 block-s'>
            <p>
                3
            </p>
        </div>
    </div>
    <div class='grid__item col col-2-4--q-medium col-1-4--q-large col-6-10--q-xlarge'>
       <div class='block--color-2 block-s'>
            <p>
                4
            </p>
        </div>
    </div>
</div>
```


#### Responsive Grid with pre-defined number of equally sized columns

```html
<div class='grid text-left grid--2-col grid--4-col--q-medium grid--6-col--q-large'>
    <div class='grid__item'>
       <div class='block--color-2 block-s'>
            <p>
                1
           </p>
        </div>
    </div>
    <div class='grid__item'>
       <div class='block--color-1 block-s'>
            <p>
                2
            </p>
        </div>
    </div>
    <div class='grid__item'>
       <div class='block--color-3 block-s'>
            <p>
                3
            </p>
        </div>
    </div>
    <div class='grid__item'>
       <div class='block--color-2 block-s'>
            <p>
                4
            </p>
        </div>
    </div>
    <div class='grid__item'>
       <div class='block--color-1 block-s'>
            <p>
                5
            </p>
        </div>
    </div>
    <div class='grid__item'>
       <div class='block--color-3 block-s'>
            <p>
                6
            </p>
        </div>
    </div>
</div>
```




### Float Grid

Sometimes you don't want an inline block grid, you want a float grid.
Fred doesn't mind what grid you use :).

```html
<div class='grid-float'>
    <div class='col-1-3 '>
        <div class='ts-block'>
            ...
        </div>
    </div>
    <div class='col-1-3 '>
        <div class='ts-block'>
            ...
        </div>
    </div>
    <div class='col-1-3 '>
        <div class='ts-block'>
            ...
        </div>
    </div>
</div>
```




## Icons with text

```html
<p>
    <a class='icon-text ' href='#'>
        <i class='i icon-placeholder'></i>
        A link with an icon
    </a>
</p>

<p class='icon-text--rev' href=''>
    A paragraph with an icon on the other side
    <i class='i icon-placeholder '></i>
</p>
```




## Responsive images

This applies max-width: 100%; and height: auto; to the image so that it scales nicely to the parent element.

```html
<div class='grid'>
    <div class='grid__item col-1-4' >
        <img src='assets/images/fred-logo.png' alt='' class='img--responsive' />
    </div>
    <div class='grid__item col-2-3'>
        <div class='arrow--side block--color-3 block-m'>
            <p>Resize the browser so you can see me shrink </p>
            <i class='arrow arrow-left'></i>
        </div>
    </div>
</div>
```




## Links/Anchors

```html
<p>
    <a href='' class='clean-link'>
        I'm a clean link look at me
    </a>
</p>
<p>
    <a href='' class='is-disabled'>
        I'm a disabled link
    </a>
</p>
<p>
    <a href='' class='is-draggable'>
        I'm a draggable link
    </a>
</p>

<ul class='list-styled clean-link-list'>
    <li>
        <a href=''>
            Clean link in a list
        </a>
    </li>
    <li>
        <a href=''>
            Clean link in a list
        </a>
    </li>
</ul>
```




## Lists

### Un styled list

```html
<ul class='list-unstyled mt-s'>
    <li>
        unstyled list item 1
    </li>
    <li>
        unstyled list item 2
    </li>
</ul>
```

### Styled list

```html
<ul class='list-styled'>
    <li>
        Styled list item 1
    </li>
    <li>
        Styled list item 2
    </li>
</ul>
<hr />
<ul class='list-styled--alpha'>
    <li>
        Styled list item 1
    </li>
    <li>
        Styled list item 2
    </li>
</ul>
<hr />
<ul class='list-styled--dashed'>
    <li>
        Styled list item 1
    </li>
    <li>
        Styled list item 2
    </li>
</ul>
<hr />
<ul class='list-styled--decimal'>
    <li>
        Styled list item 1
    </li>
    <li>
        Styled list item 2
    </li>
</ul>
```

### Inline list

```html
<ul class='list--inline'>
    <li> inline list item 1 </li>
    <li> inline list item 2 </li>
<ul>
```




### Block list

Throws a list into a vertical stack. Handy for things like navigation.





### Definition lists __Fred is stil working on this__

Defaults to being stacked without any of the below styles applied

```html
<dl>
    <dt>Description 1</dt>
    <dd>Info</dd>
    <dt>Description 2</dt>
    <dd>Info</dd>
</dl>
```




### Horizontal descrption list

To make the description list horizontal apply the class 'dl-horizontal' aswell the fraction ...

```html
<dl class='dl-horizontal dl-horizontal--1-4 '>
    <dt>Description 1</dt>
    <dd>Info</dd>
    <dt>Description 2</dt>
    <dd>Info</dd>
</dl>

<hr class='mt-m'/>

<dl class='dl-horizontal dl-horizontal--1-3 '>
    <dt>Description 1</dt>
    <dd>Info</dd>
    <dt>Description 2</dt>
    <dd>Info</dd>
</dl>

<hr class='mt-m'/>

<dl class='dl-horizontal dl-horizontal--1-2 '>
    <dt>Description 1</dt>
    <dd>Info</dd>
    <dt>Description 2</dt>
    <dd>Info</dd>
</dl>
```



## Media blocks

Float an image to the left, with a clearfixed block of content to the right.

```html
<div class='media'>
    <img src='assets/images/green-bird.jpg' class='media__image'>
    <div class='media__body'>
        <p class='mt-0'>
            Uncle Bully was pashing when the pearler packing a sad event occured. Oh no! I'm beached as, this carked it seabed is as stoked as a flat stick kumara. Mean while, in a waka, Rhys Darby and Cardigan Bay were up to no good with a bunch of random milks.
        </p>
    </div>
</div>
<hr class='mt-m' />
<div class='media--rev'>
    <img src='assets/images/green-bird.jpg' class='media__image'>
    <div class='media__body'>
       <p class=''>
        I'd slam that clam, good afterble constanoon. The snarky force of his burning my Vogel's was on par with Hercules Morse, as big as a horse's good as mate.
        </p>
    </div>
</div>
```




## Navigation

Turns a list into a horizontal block of inline-blocks;

```html
<ul class='nav'>
    <li class='active'>
        <a href='#'>
            active list item
        </a>
    </li>
    <li class=''>
        <a href='#'>
            list item
        </a>
    </li>
    <li class=''>
        <a href='#'>
            list item
        </a>
    </li>
    <li class=''>
        <a href='#'>
            list item
        </a>
    </li>
</ul>
```




### Sub navigation

```html
<dl class='sub-nav'>
    <dt>Filter:</dt>
    <dd class='active'><a href='#'>All</a></dd>
    <dd><a href='#'>Active</a></dd>
    <dd><a href='#'>Pending</a></dd>
    <dd><a href='#'>Suspended</a></dd>
</dl>
```




## Pagination

```html
<ul class='pagination'>
    <li class='pagination__first'>
         <a href='#'>
            First
        </a>
    </li>
    <li class='pagination__prev'>
        <a href='#'></a>
    </li>
    <li class='pagination__current'>
        <a href='#'>
            1
        </a>
    </li>
    <li class='pagination__more'>
        <a href='#'></a>
    </li>
    <li>
        <a href="#">
            10
        </a>
    </li>
    <li class='pagination__next'>
        <a href='#'></a>
    </li>
    <li class='pagination__last'>
        <a href='/page/last'>
            Last
        </a>
    </li>
 </ul>
```




## Radii

```html
<div class='block--color-3 block-xs radius-s'>
    Check out my corners
</div>
<div class='block--color-3 block-xs radius'>
    Check out my corners
</div>
<div class='block--color-3 block-xs radius-l'>
    Check out my corners
</div>
<div class='block--color-3 block-xs circle'>
    I'm nearly a circle, wohoo
</div>
```




## Ratio boxes


   * .ratio-4-3
   * .ratio-16-9
   * .ratio-3-4
   * .ratio-2-1


This box will be 16:9

```html
<div class='ratio-16-9 block--color-3'>
    <div class='ratio__content'></div>
</div>
```

This box will be a square

```html
<div class='ratio-square block--color-3'>
    <div class='ratio__content'></div>
</div>
```




## Split

Simple split item for creating two elements floated away from one another

```html
<p class='split'>
    Item
    <span class='split__right'>
        $value
    </span>
</p>
```



## Typography




### Font declarations

```html
<p class="font-primary">This is the primary font</p>
<p class="font-primary--light">This is the primary font in light</p>
<p class="font-primary--bold">This is the primary font in bold</p>
<p class="font-size-xxxxl">Some huge text</p>
<p class="font-size-xxxs">Some tiny text</p>
```



### Header styles

NOTE: These can change per project depending on what font etc you use :)

```html
<h1> H1 Heading 1 </h1>
<h1 class='h2'> H1 Heading with a class of H2 </h1>
<h2> H2 Heading </h2>
<h2 class='h4'> H2 Heading with a class of H4 </h2>
<h4 class='h4'> H4 Heading  </h4>
```




### Paragraph styles

```html
<p class="intro">I am an intro paragraph</p>
<p>I am a plain paragraph</p>
<p class="small">I am a small paragraph</p>
<p class="tiny">I am a tiny paragraph</p>
<p class="caption">I am a caption</p>
<p class="pullquote">I am a pullquote</p>

```

Also
* .text-muted
* .text-warning
* .text-success
* .text-danger




### Text helpers

```html
<p class="uppercase">Uppercase</p>
<p class="lowercase">Lowercase</p>
<p class="text--overflow">These heading classes are helpful when you have a heading that is semantically correct but the default size is not what you are after.</p>

```

Also
* .text-left
* .text-right
* .text-center
* .text-nowrap




### Blockquotes

```html
<div class="blockquote">
    <p class="lowercase">
        I'm a quote
    </p>
    <cite class='text-right block-element mt-s'>- Fred</cite>
</div>

```




## Visibility

### Hidden

Try to use these on a limited basis and avoid creating entirely different versions of the same site. Instead, use them to complement each device's presentation.

```html
<div class='block-s block--color-2 hidden--q-small'>
    hide this block on mobile
</div>
<div class='block-s block--color-1 hidden--q-medium'>
    hide this block on skinny
</div>
<div class='block-s tp-block hidden--q-medium-down'>
    hide this block skinny down
</div>
<div class='block-s block--color-3 hidden--q-medium-up'>
    hide this block on a medium screen, large screen and xlarge screen
</div>
<div class='block-s block--color-2 hidden--q-large'>
    hide this block on desktop
</div>
<div class='block-s ts-block hidden--q-large-up'>
    hide this block desktop up
</div>
<div class='block-s tt-block hidden--q-xlarge'>
    hide this block on wide
</div>
```

### Visibile

Try to use these on a limited basis and avoid creating entirely different versions of the same site. Instead, use them to complement each device's presentation.

```html
<div class='block-s block--color-2 visible--q-small'>
    show this block on small screen
</div>
<div class='block-s block--color-3 visible--q-medium'>
    show this block on a medium screen
</div>
<div class='block-s block--color-3 visible--q-medium-down'>
    Show this block on a medium screen and small screen
</div>
<div class='block-s block--color-2 visible--q-medium-up'>
    Show this block on a medium screen, large screen and xlarge screen
</div>
<div class='block-s tt-block visible--q-large'>
    Show this block on a large screen
</div>
<div class='block-s block--color-3 visible--q-large-up'>
    Show this block on a large and xlarge screen
</div>
<div class='block-s block--color-1 visible--q-xlarge'>
    show this block on a xlarge screen
</div>
```

