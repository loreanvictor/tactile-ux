# Tactile UX
Some interactive JSX components, plus some rules for design of interactive stuff in a tactile manner.

## Design Rules

The core principle for Tactile UX is uniform, clear and consistent communication of various levels of interactivity of different content elements. These are the levels of interactivity for each content element:

- **Non interactive** \
  these elements are meant to be just viewed and cannot be interacted with in any way.

  💡example: text, image.


- **Disabled interaction** \
  these elements might have been interactive with a change in program state, but aren't right now.
  
  💡example: button disabled due to invalid form.


- **Not currently interactive** \
  these elements can become interactive (without a change in program state), but aren't right now.
  
  💡example: input element that is not focused.


- **Interactive** \
  these elements can be interacted with right away.
  
  💡example: focused input elements, buttons.


- **Hinting interactivity** \
  the user is encouraged to interact with these elements right away.
  
  💡example: hovered button, required input that the user have missed.


These different levels of interactivity **MUST** be communicated by _clear_ and _consistent_ visual cues. This _clarity_ and _consistency_ should be prioritized over aesthetics.

<br>

### Practical Examples

The following practicual guidelines can be deduced from the rules outline above. The words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED** and **NOT RECOMMENDED** are used according to [this RFC](https://tools.ietf.org/html/rfc2119).

👉 Inputs **MUST** be displayed in **Not currently interactive** state unless focused.
  - When focused, they **MUST** be displayed in **Interactive** state.
  - Inputs can also hint interactivity by being displayed in **Hinting interactivity** state.
  - The visual cues for these states **MUST** be consistent for those used for other interactive elements (e.g. buttons).

👉 Interactive elements can have visual cues for signaling other properties (e.g. importance, safety). However these cues should not clutter the baseline visual cues signaling interactivity state.

👉 Buttons, while clicked/pressed/touched, **MUST** be displayed in **Not currently interactive** state, as they have no further possible interaction.
  - The same applies to buttons when waiting on a triggered action (e.g. _saving ..._)

👉 For choosing a particular value out of a multitude of possible values, a multitude of buttons might be used (i.e. toggle buttons, tab bars, etc). In this case, the button representing the _current selected value_ **MUST** be displayed in either **Not currently interactive** or **Disabled interaction** states, depending on whether the associated value is part of program state or visual state.

👉 Marking inputs with bottom borders is **NOT RECOMMENDED**.
  - It is not clearly distinct from content separators.
  - It is not consistent with interactivity cues for buttons.
  
👉 Empty space for marking buttons is **NOT RECOMMENDED**.
  - In most designs where this practice is used, more important buttons are marked with more explicit visual signals. Since the spacing typically pales in comparison with these additional visual cues, this is effectively violating consistency.
  
<br>

### A Note on Consistency

The degree of consistency for visual cues used for communicating interactivity state is up to designers. With higher consistency the interface becomes more learnable / memorable, but it also becomes more monotone. Overly uniform interactivity cues might require additional visual signals for dinstinguishing different types of interactive elements, which might in turn lead to visual clutter. On the other hand, low consistency can also lead to visual clutter and increased difficulty in learnability / memorability, as users would be required to learn and remember the meanings of more visual signals. Designs that are already familiar to users can help bridge this gap: for example check boxes might have interactivity cues inconsistent with buttons and inputs, but since users are typically familiar with the design, this might not be a problem.

Another complexity around the problem of consistency is visual context. Designers typically face different constraints in different visual contexts: for example input helper elements (e.g. onscreen keyboard on smartphones) differ in terms of design constraints compared to main content elements. As such, it might be unreasonable to try to find a uniform set of visual cues for signaling various states of interactivity in these contexts. Inconsistencies in visual cues utilized for different visual contexts is ok, if:

- These visual contexts are separated explicitly, i.e. users can easily tell when they are looking at a different context.
- The user mind-set / use-case for these contexts is also aptly disntiguished. For example users do not typically intent to read on-screen keyboards, so readability and dinstinction between interactive and non-interactive elements gets a lower priority.

<br>

### A Solution Template

It is recommended to use two independent visual properties for visual signaling of interactivity state: `baseline` and `extent`:
- `baseline` should be at least have two easily distinguishable states: `on` and `off`
- `extent` should be at least four easily distingushable states: `none`, `low`, `medium` and `high`

`extent` values should have a _natural ordering_, e.g. opacity values, elevation, magnification, etc. Interactivity states should be displayed as follows:

`baseline`/`extent` | `none`              | `low`                         | `medium`        | `high`
------------------- | :-----------------: | :---------------------------: | :-------------: | :----:
`off`               | **Non interactive** | **Disabled interaction**      | ❌              | ❌
`on`                | ❌                  | **Not currently interactive** | **Interactive** | **Hinting interactivity**
