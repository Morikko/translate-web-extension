export default class LanguageFiles {

    static Information = {
      "headSourceLanguage": { // Current original language to translate
        title:"Current Source for Translation",
        description:"File written by the developer",
      },
      "baseSourceLanguage": { // Last original language translated
        title:"Last Source used for Translation",
        description:"File written by the developer",
      },
      "baseTargetLanguage": { // Last Translation done
        title:"Last Translated File",
        description:"File written by the developer",
      },
      "headTargetLanguage": { // New translation in progress
        title:"Use another file as translated",
        description:"File written by the developer",
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
        if (window.sessionStorage[name]) {
          return JSON.parse(window.sessionStorage[name]);
        }
        return defaultData;
      } catch(e) {
        console.error("App.loadData: " + e);
        return defaultData;
      }
    }

}
