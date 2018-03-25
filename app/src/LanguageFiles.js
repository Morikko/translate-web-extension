export default class LanguageFiles {

    static Information = {
      "headSourceLanguage": { // Current original language to translate
        title:"Current Source for Translation",
        description:[
          "This file is mandatory."
        ],
      },
      "baseSourceLanguage": { // Last original language translated
        title:"Last Source used for Translation",
        description:[
          "This file is optional.",
          "It will provide information to highlight changes and thus facilitate translation."
        ],
      },
      "baseTargetLanguage": { // Last Translation done
        title:"Last Translated File",
        description:[
          "This file is optional.",
          "It will initialize the translated fields.",
          "You can use the file in used in the application or any file you have already work on.",
          "A reference is kept on the inital content to always indicate you the changes done so far."
        ],
      },
      "headTargetLanguage": { // New translation in progress
        title:"Use another file as translated",
        description: undefined,
      },
    }

    static ids = Object.keys(LanguageFiles.Information)

    static languageFileFactory() {
      return {
        source:'',
        content: {},
      };
    }

    static loadData(name, defaultData) {
      try {
        if ( window.sessionStorage && window.sessionStorage[name]) {
          return JSON.parse(window.sessionStorage[name]);
        }
        return defaultData;
      } catch(e) {
        console.error("App.loadData: " + e);
        return defaultData;
      }
    }

    static loadUrl(url, callback, onError=undefined) {
      if ( url.endsWith(".json")) {

        if(url.startsWith("https://github.com")) {
          url = url
                .replace("https://github.com", "https://raw.githubusercontent.com")
                .replace("blob/", "");
        }

        fetch(url,{ method: 'GET', mode: 'cors'})
          .then((response)=>{
            return response.json()
            })
          .then((content)=>{
            callback(content);
          })
          .catch((error)=>{
            if (onError) {
              onError(error.toString());
            }
          });
      } else {
        if (onError) {
          onError("Not a Json File");
        }
      }
    }

}
