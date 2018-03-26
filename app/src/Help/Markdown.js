const markdown=`
## About

Translate Web-Ext helps you to translate files with the [i18n interface](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/i18n). This is the common API for web extension.

![Translate Web-Ext Example](https://user-images.githubusercontent.com/7831572/37932835-c834faa8-3149-11e8-9946-ef83982963b2.png)

Translate Web-Ext makes the workflow easy:
  - Easy Setup: Fetch the language files over the internet
  - Stay Focus: Get feedback about the translations to do
  - Quick Start: Translate everything from within the browser

## How to translate

### The original field
- The original text written in the application
- Feedback (need previous language file)
  - <span class="box help-normal"></span> Text unchanged
  - <span class="box help-new"></span> New text
  - <span class="box help-diff"></span> Text changed since
- In case of changes in the text, it is written in:
  - <span class="help-text-green"></span> for the changes added (default)
  - <span class="help-text-red"></span> for how it was before (Click on "Old/New" in the arrow button in the id column)

![switch_old_new](https://user-images.githubusercontent.com/7831572/37932791-ad61a014-3149-11e8-89a5-cdb3cfba229d.png)

### The target field
- The translated text
- Feedback (need last translation file)
  - <span class="box help-normal"></span> text unchanged
  - <span class="box help-empty"></span> no tranlation provided (empty)
  - <span class="box help-Cdiff"></span> you have changed the field

### The row
- There are 3 states:
  - <span class="unchanged"></span> The original and target text already existed and have not changed
  - <span class="todo normal"></span> All the other cases
  - <span class="done"></span> A To Do case where you have marked done
- You can filter which row are visible though the 'Visible' menu

### Release the translation
![release](https://user-images.githubusercontent.com/7831572/37932783-a8c37406-3149-11e8-9058-e7bd1fea99d1.png)

- Get the resulting translation file
  1. Click on Release
  2. Download the file on your computer
  3. Send it to the developer
      - Attached to a mail
      - Pull Request with Git
  4. You have done a great job so far ;)

- Notes
  - Empty target field won't be exported
  - All the other fields (descriptions, placeholders...) from the source file are exported
  - The todo/done states are only internal to the application and won't block the exportation

### Tips
 - Tab key will focus
    - Each row after the other one
    - First the target textarea and then the To Do checkbox (if available)

## How to configure

### The different language files
  - The language file to translate
  - The last translation already done (optional: continue your work)
  - The previous language file used for translation (optional: show you the difference)


### How to load a file
  - URL: The file is downloaded and read (Works with Github)
  - Locally: Fetch a file on your disk

### Load from the URL

It is also possible to directly custom all the environment through the URL parameters. Thus, as the extension organizer, you can provide directly a link that points to the previous file translated.

[Example of how to use it for your extension](https://github.com/Morikko/sync-tab-groups#translation).

Try to replace the URLs:
  - Current file to translate:
  <input type="text" id="url-current"
    onblur="generateUrl()" placeholder="URL to the messages.json..."
    value="https://github.com/Morikko/sync-tab-groups/blob/master/extension/_locales/en/messages.json">
  </input>
  - Previous translation:
  <input type="text" id="url-previous"
    onblur="generateUrl()" placeholder="URL to the messages.json..."
    value="https://github.com/Morikko/sync-tab-groups/blob/94bc92b129c3a1e363ddc9fa5a0e91ca4aeed369/_locales/en/messages.json">
  </input>
  - Previous file translated:
  <input type="text" id="url-translated"
    onblur="generateUrl()" placeholder="URL to the messages.json..."
    value="https://github.com/Morikko/sync-tab-groups/blob/94bc92b129c3a1e363ddc9fa5a0e91ca4aeed369/_locales/fr/messages.json">
  </input>

Generated URL: <a href="" id="url-generated"></a>

### About the project
 - You can save a project state (all language files, your translations already done, and the done states) in a JSON
 - You can import it back later to continue your work
 - You can reload the tab, you won't lose your work. However, you will lose it if you close the tab or open the application in another tab.
 - You might work on different translation at the same time in different tabs

### Warning
  - Importing a previously translated file will overwrite the current work
  - The done states are reset each time you import any new file
`;

export default markdown;
